
import express from 'express';
import { authenticateJWT } from '../index';
import { generateTest, evaluateAnswer } from '../services/aiService';
import { mockTests, mockTestResults } from '../db/mockData';

const router = express.Router();

// Generate a test
router.post('/generate', authenticateJWT, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can generate tests' });
    }
    
    const { subject, chapter, difficulty } = req.body;
    
    // Generate the test using AI
    const test = await generateTest(subject, chapter, difficulty);
    
    // Save test (in a real app, save to database)
    mockTests.push({
      id: Date.now().toString(),
      teacherId: req.user.id,
      subject,
      chapter,
      difficulty,
      title: test.title,
      questions: test.questions,
      createdAt: new Date().toISOString()
    });
    
    res.status(201).json({
      message: 'Test generated successfully',
      test
    });
  } catch (error) {
    console.error('Test generation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start a test
router.get('/start/:testId', authenticateJWT, (req, res) => {
  try {
    const { testId } = req.params;
    
    // Find test
    const test = mockTests.find(t => t.id === testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    // Create test session (in a real app, save to database)
    const testSession = {
      id: Date.now().toString(),
      testId,
      userId: req.user.id,
      startTime: new Date().toISOString(),
      status: 'in-progress'
    };
    
    res.json({
      message: 'Test started',
      test: {
        id: test.id,
        title: test.title,
        subject: test.subject,
        chapter: test.chapter,
        questions: test.questions.map(q => ({
          id: q.id,
          text: q.text,
          marks: q.marks
        })) // Don't send answers to client
      },
      sessionId: testSession.id
    });
  } catch (error) {
    console.error('Test start error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a test
router.post('/submit/:sessionId', authenticateJWT, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answers } = req.body;
    
    // In a real app, find the session and related test
    // Here we'll just evaluate the answers directly
    
    let totalScore = 0;
    const evaluatedAnswers = [];
    
    // Evaluate each answer using AI
    for (const answer of answers) {
      const evaluation = await evaluateAnswer(
        answer.questionId, 
        answer.questionText, 
        answer.userAnswer
      );
      
      totalScore += evaluation.score;
      evaluatedAnswers.push({
        questionId: answer.questionId,
        score: evaluation.score,
        maxScore: evaluation.maxScore,
        feedback: evaluation.feedback
      });
    }
    
    // Save test result (in a real app, save to database)
    const testResult = {
      id: Date.now().toString(),
      userId: req.user.id,
      testId: sessionId, // In a real app, get from session
      score: totalScore,
      answers: evaluatedAnswers,
      submittedAt: new Date().toISOString()
    };
    
    mockTestResults.push(testResult);
    
    res.json({
      message: 'Test submitted successfully',
      result: {
        score: totalScore,
        answers: evaluatedAnswers
      }
    });
  } catch (error) {
    console.error('Test submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test results
router.get('/results/:testId', authenticateJWT, (req, res) => {
  try {
    const { testId } = req.params;
    
    // Find test results
    const result = mockTestResults.find(
      r => r.testId === testId && r.userId === req.user.id
    );
    
    if (!result) {
      return res.status(404).json({ message: 'Test result not found' });
    }
    
    res.json({
      result
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tests (for teachers to see their created tests)
router.get('/teacher/tests', authenticateJWT, (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can access this endpoint' });
    }
    
    // Find tests created by this teacher
    const tests = mockTests.filter(t => t.teacherId === req.user.id);
    
    res.json({
      tests: tests.map(test => ({
        id: test.id,
        title: test.title,
        subject: test.subject,
        chapter: test.chapter,
        difficulty: test.difficulty,
        createdAt: test.createdAt
      }))
    });
  } catch (error) {
    console.error('Get teacher tests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all available tests (for students)
router.get('/student/tests', authenticateJWT, (req, res) => {
  try {
    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can access this endpoint' });
    }
    
    // Find all tests (in a real app, filter by class, etc.)
    const tests = mockTests.map(test => ({
      id: test.id,
      title: test.title,
      subject: test.subject,
      chapter: test.chapter
    }));
    
    res.json({
      tests
    });
  } catch (error) {
    console.error('Get student tests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
