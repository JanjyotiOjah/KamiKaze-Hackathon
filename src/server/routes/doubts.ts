
import express from 'express';
import { authenticateJWT } from '../index';
import { mockDoubts } from '../db/mockData';
import { generateAnswer } from '../services/aiService';

const router = express.Router();

// Submit a doubt/question
router.post('/ask', authenticateJWT, async (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can submit doubts' });
    }
    
    const { subject, question } = req.body;
    
    if (!subject || !question) {
      return res.status(400).json({ message: 'Subject and question are required' });
    }
    
    // Generate answer using AI
    const answer = await generateAnswer(subject, question);
    
    // Save doubt (in a real app, save to database)
    const doubt = {
      id: Date.now().toString(),
      studentId: req.user.id,
      subject,
      question,
      answer,
      status: 'answered',
      askedAt: new Date().toISOString(),
      answeredAt: new Date().toISOString()
    };
    
    mockDoubts.push(doubt);
    
    res.status(201).json({
      message: 'Doubt submitted and answered',
      doubt: {
        id: doubt.id,
        subject: doubt.subject,
        question: doubt.question,
        answer: doubt.answer,
        askedAt: doubt.askedAt
      }
    });
  } catch (error) {
    console.error('Doubt submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get student's doubts
router.get('/student', authenticateJWT, (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can access this endpoint' });
    }
    
    // Find doubts asked by this student
    const doubts = mockDoubts.filter(d => d.studentId === req.user.id);
    
    res.json({
      doubts: doubts.map(doubt => ({
        id: doubt.id,
        subject: doubt.subject,
        question: doubt.question,
        answer: doubt.answer,
        status: doubt.status,
        askedAt: doubt.askedAt,
        answeredAt: doubt.answeredAt
      }))
    });
  } catch (error) {
    console.error('Get student doubts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get common doubts for a subject
router.get('/common/:subject', authenticateJWT, (req, res) => {
  try {
    const { subject } = req.params;
    
    // Find common doubts for this subject
    // In a real app, you'd have a way to mark doubts as "common"
    // Here we'll just return all doubts for the subject
    const doubts = mockDoubts
      .filter(d => d.subject === subject)
      .slice(0, 5); // Limit to 5 common doubts
    
    res.json({
      doubts: doubts.map(doubt => ({
        id: doubt.id,
        question: doubt.question,
        answer: doubt.answer
      }))
    });
  } catch (error) {
    console.error('Get common doubts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
