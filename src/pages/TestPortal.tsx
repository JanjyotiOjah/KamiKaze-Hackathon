
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Clock, ArrowLeft, Save, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock test data for Students
const studentExam = {
  title: "Newton's Laws of Motion",
  subject: "Physics - Class 9",
  duration: "90 minutes",
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      text: "Imagine you're at a bus stop and the bus suddenly starts moving forward. You feel yourself being pushed backward. Using Newton's First Law of Motion, explain this phenomenon in detail. How does it relate to the concept of inertia? Give examples of how this concept applies to daily life situations.",
      marks: 10,
    },
    {
      id: 2,
      text: "Riya and her brother are skating in the park. Riya weighs 40 kg and her brother weighs 60 kg. They face each other and Riya pushes her brother with a certain force. Using Newton's Third Law and Second Law, explain why Riya moves backward with greater acceleration than her brother moves forward. Calculate the ratio of their accelerations.",
      marks: 10,
    },
    {
      id: 3,
      text: "During a cricket match, a batsman hits a ball, changing its direction completely. The ball weighing 150g approaches with a speed of 15 m/s and leaves with a speed of 20 m/s in the opposite direction. Using Newton's Laws of Motion, explain what happens during the impact. What force does the bat exert on the ball if the contact time is 0.1 seconds?",
      marks: 10,
    },
    {
      id: 4,
      text: "Ananya notices that it's harder to push her 10 kg shopping cart when it's full of groceries compared to when it's empty. Using Newton's Second Law of Motion, provide a detailed explanation for this observation. If she applies a force of 15 N, calculate the acceleration of the cart when it's empty versus when it contains 30 kg of groceries.",
      marks: 10,
    },
    {
      id: 5,
      text: "Rohit is designing a seat belt system for a car. He needs to understand how Newton's Laws of Motion apply to passengers during a sudden stop. Explain in detail how all three of Newton's Laws apply in this scenario and why seat belts are crucial for passenger safety. Include the forces acting on a passenger during a sudden deceleration from 60 km/h to 0 km/h in 2 seconds.",
      marks: 10,
    },
  ],
};

// Mock test data for Teachers
const teacherExam = {
  title: "Newton's Laws of Motion - Teacher Assessment",
  subject: "Physics - Class 9",
  duration: "90 minutes",
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      text: "Please provide a comprehensive explanation of Newton's First Law of Motion that you would present to your class 9 students. Include key examples that demonstrate real-life applications and common misconceptions students might have. Your answer will help the AI system understand how you conceptualize this law for your students.",
      marks: 10,
    },
    {
      id: 2,
      text: "When teaching Newton's Second Law (F=ma), what practical demonstrations or activities do you use to help students visualize the relationship between force, mass, and acceleration? Describe your approach to making this concept accessible to 14-15 year old students with varying mathematical abilities.",
      marks: 10,
    },
    {
      id: 3,
      text: "How do you connect Newton's Third Law of Motion to students' everyday experiences? Please outline your teaching strategy including examples, analogies, and questioning techniques you would use to verify students' understanding of action-reaction pairs.",
      marks: 10,
    },
    {
      id: 4,
      text: "Describe how you would design an in-class activity or experiment that allows students to measure and verify Newton's Laws of Motion using simple materials. What specific learning outcomes would you expect, and how would you guide students to reach those conclusions through their own observations?",
      marks: 10,
    },
    {
      id: 5,
      text: "Students often struggle with understanding the concept of 'net force' and its role in Newton's Laws. Explain your approach to teaching this concept, including how you would address the common misconception that objects move in the direction of the applied force rather than the direction of the net force.",
      marks: 10,
    },
  ],
};

// Test states
type TestStatus = 'not-started' | 'in-progress' | 'submitted';
type UserRole = 'student' | 'teacher';

const TestPortal = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [testStatus, setTestStatus] = useState<TestStatus>('not-started');
  const [timeLeft, setTimeLeft] = useState("90:00"); // Mock time display
  const [userRole, setUserRole] = useState<UserRole>('student');
  
  // Get the current exam based on user role
  const currentExam = userRole === 'student' ? studentExam : teacherExam;
  
  // Current question
  const currentQuestion = currentExam.questions[currentQuestionIndex];
  
  // Save answer for current question
  const saveAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
  };
  
  // Toggle flagged status for current question
  const toggleFlag = () => {
    setFlagged({
      ...flagged,
      [currentQuestion.id]: !flagged[currentQuestion.id]
    });
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Start the test
  const startTest = () => {
    setTestStatus('in-progress');
  };
  
  // Submit the test
  const submitTest = () => {
    setTestStatus('submitted');
  };
  
  // Count answered questions
  const answeredCount = Object.keys(answers).length;

  // Render the teacher-specific content
  const renderTeacherContent = () => {
    if (userRole === 'teacher' && testStatus === 'not-started') {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 space-y-3 mt-4">
          <div className="flex gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">Why Teachers Need to Complete This Assessment</h3>
              <p className="text-sm text-amber-700">
                This assessment helps our AI system understand your teaching approach and expectations. Your responses:
              </p>
              <ul className="list-disc list-inside text-sm text-amber-700 mt-2 space-y-1">
                <li>Guide the AI in generating student questions that align with your teaching style</li>
                <li>Help calibrate the AI's evaluation of student responses</li>
                <li>Ensure that test content reflects what was actually taught in class</li>
                <li>Create a fair assessment system that rewards true understanding rather than memorization</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Render the disclaimer for teachers
  const renderTeacherDisclaimer = () => {
    if (userRole === 'teacher' && testStatus === 'not-started') {
      return (
        <Alert className="mt-4 border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <p className="font-medium mb-1">Important Disclaimer:</p>
            <p className="text-sm">
              Your answers should directly reflect what you've taught in class and align with the content in your uploaded class notes. 
              The AI system will use your responses to understand the key concepts you wanted to emphasize to your students.
              This helps create a fair evaluation system that assesses students based on what was actually taught.
            </p>
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };
  
  // Handle showing instructions or the actual test
  if (testStatus === 'not-started') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/dashboard" className="text-brand-600 hover:text-brand-700 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{currentExam.title}</CardTitle>
                  <CardDescription>{currentExam.subject}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={userRole === 'student' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setUserRole('student')}
                    className={userRole === 'student' ? 'bg-brand-600 hover:bg-brand-700' : ''}
                  >
                    Student View
                  </Button>
                  <Button 
                    variant={userRole === 'teacher' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setUserRole('teacher')}
                    className={userRole === 'teacher' ? 'bg-brand-600 hover:bg-brand-700' : ''}
                  >
                    Teacher View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
                  <p className="text-gray-600 mb-4">Please read the following instructions carefully before starting the test.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 space-y-3">
                  <div>
                    <h3 className="font-medium mb-1">Duration and Questions</h3>
                    <p className="text-sm text-gray-700">
                      This test consists of {currentExam.totalQuestions} questions and has a duration of {currentExam.duration}.
                      All questions are paragraph-based requiring detailed answers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Navigation</h3>
                    <p className="text-sm text-gray-700">
                      You can navigate between questions using the Previous and Next buttons or by clicking on question numbers.
                      You can flag questions to review later.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Answer Format</h3>
                    <p className="text-sm text-gray-700">
                      {userRole === 'student' 
                        ? "Each answer should apply concepts to real-world scenarios. Focus on demonstrating your understanding rather than memorized answers."
                        : "Your answers should reflect how you teach these concepts in class. Include examples and approaches you use with your students."}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Saving & Submission</h3>
                    <p className="text-sm text-gray-700">
                      Your answers are automatically saved. You can review all answers before final submission.
                      Once submitted, you cannot return to the test.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">AI Evaluation</h3>
                    <p className="text-sm text-gray-700">
                      {userRole === 'student'
                        ? "Your answers will be evaluated based on conceptual understanding, application, and creativity - not just memorization of facts."
                        : "Your responses help calibrate the AI system to evaluate student answers in alignment with your teaching approach."}
                    </p>
                  </div>
                </div>
                
                {renderTeacherContent()}
                {renderTeacherDisclaimer()}
                
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    onClick={startTest} 
                    className="bg-brand-600 hover:bg-brand-700 px-8"
                  >
                    Start Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Handle submitted state
  if (testStatus === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Test Submitted Successfully</h2>
              <p className="text-gray-600 mb-6">
                {userRole === 'student' 
                  ? "Your answers have been submitted for evaluation. Results will be available soon."
                  : "Thank you for completing this assessment. Your responses will help guide the AI in evaluating student answers."}
              </p>
              <div className="flex justify-center">
                <Link to="/dashboard">
                  <Button className="bg-brand-600 hover:bg-brand-700 px-8">
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Test in progress
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with test info */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{currentExam.title}</h1>
              <p className="text-sm text-gray-600">{currentExam.subject}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-md">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800 font-medium">{timeLeft}</span>
              </div>
              
              <Button onClick={submitTest} className="bg-brand-600 hover:bg-brand-700">
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1} of {currentExam.questions.length}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Marks: {currentQuestion.marks}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 pb-2">
                {userRole === 'teacher' && (
                  <Alert className="mb-4 border-blue-200 bg-blue-50">
                    <AlertDescription className="text-blue-800 text-xs">
                      Remember: Your answer should reflect what you've taught in class and align with your uploaded notes.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {currentQuestion.text}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="answer" className="text-sm font-medium">
                    Your Answer:
                  </label>
                  <Textarea 
                    id="answer"
                    placeholder={userRole === 'student' 
                      ? "Write your detailed answer here applying the concepts you've learned..."
                      : "Write your detailed answer reflecting how you would explain this concept to your students..."}
                    className="min-h-[240px] text-base leading-relaxed"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => saveAnswer(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={toggleFlag}
                  className={flagged[currentQuestion.id] ? 'text-yellow-600 border-yellow-200 bg-yellow-50' : ''}
                >
                  <Flag className={`w-4 h-4 mr-1 ${flagged[currentQuestion.id] ? 'fill-yellow-500' : ''}`} />
                  {flagged[currentQuestion.id] ? 'Flagged' : 'Flag for Review'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === currentExam.questions.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Question Navigator */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentExam.questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium ${
                        currentQuestionIndex === index
                          ? 'bg-brand-600 text-white'
                          : answers[q.id]
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : flagged[q.id]
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-sm bg-gray-100 border border-gray-200"></div>
                      <span>Not Answered</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-200"></div>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-sm bg-yellow-100 border border-yellow-200"></div>
                      <span>Flagged for Review</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-sm bg-brand-600"></div>
                      <span>Current Question</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Test Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Questions</span>
                      <span>{currentExam.questions.length}</span>
                    </div>
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Answered</span>
                      <span className="text-green-600">{answeredCount}</span>
                    </div>
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Not Answered</span>
                      <span className="text-red-600">{currentExam.questions.length - answeredCount}</span>
                    </div>
                    <Separator />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Flagged</span>
                      <span className="text-yellow-600">
                        {Object.values(flagged).filter(Boolean).length}
                      </span>
                    </div>
                    <Separator />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-brand-600 hover:bg-brand-700"
                  onClick={submitTest}
                >
                  Submit Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPortal;
