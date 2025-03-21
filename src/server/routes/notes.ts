
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateJWT } from '../index';
import { mockNotes } from '../db/mockData';
import { extractContentFromNotes } from '../services/aiService';

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only pdf, doc, docx files
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
  }
});

// Upload notes
router.post('/upload', authenticateJWT, upload.single('notes'), async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can upload notes' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    
    const { subject, chapter, description } = req.body;
    
    // In a real app, process the file and extract content
    // Here we'll just use the file path and mock the extraction
    const filePath = req.file.path;
    
    // Extract content from notes using AI (mocked in this example)
    const content = await extractContentFromNotes(filePath);
    
    // Save notes (in a real app, save to database)
    const notes = {
      id: Date.now().toString(),
      teacherId: req.user.id,
      subject,
      chapter,
      description,
      filePath,
      content,
      uploadedAt: new Date().toISOString()
    };
    
    mockNotes.push(notes);
    
    res.status(201).json({
      message: 'Notes uploaded successfully',
      notes: {
        id: notes.id,
        subject: notes.subject,
        chapter: notes.chapter,
        description: notes.description,
        uploadedAt: notes.uploadedAt
      }
    });
  } catch (error) {
    console.error('Notes upload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get teacher's notes
router.get('/teacher', authenticateJWT, (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can access this endpoint' });
    }
    
    // Find notes uploaded by this teacher
    const notes = mockNotes.filter(n => n.teacherId === req.user.id);
    
    res.json({
      notes: notes.map(note => ({
        id: note.id,
        subject: note.subject,
        chapter: note.chapter,
        description: note.description,
        uploadedAt: note.uploadedAt
      }))
    });
  } catch (error) {
    console.error('Get teacher notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notes for students
router.get('/student/:subject', authenticateJWT, (req, res) => {
  try {
    const { subject } = req.params;
    
    // Find notes for this subject
    const notes = mockNotes.filter(n => n.subject === subject);
    
    res.json({
      notes: notes.map(note => ({
        id: note.id,
        chapter: note.chapter,
        description: note.description,
        teacherName: 'Teacher Name', // In a real app, get from user data
        uploadedAt: note.uploadedAt
      }))
    });
  } catch (error) {
    console.error('Get student notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific notes
router.get('/:noteId', authenticateJWT, (req, res) => {
  try {
    const { noteId } = req.params;
    
    // Find notes
    const note = mockNotes.find(n => n.id === noteId);
    
    if (!note) {
      return res.status(404).json({ message: 'Notes not found' });
    }
    
    res.json({
      note: {
        id: note.id,
        subject: note.subject,
        chapter: note.chapter,
        description: note.description,
        content: note.content,
        uploadedAt: note.uploadedAt
      }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
