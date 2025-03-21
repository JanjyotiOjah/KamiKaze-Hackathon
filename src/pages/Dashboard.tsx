
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, FileText, Upload, BarChart3, Calendar, LogOut, ExternalLink, FileSearch, Send, MessageCircleQuestion } from 'lucide-react';

// Mock data with updated CBSE Class 9 subjects
const upcomingTests = [
  { id: 1, title: "Motion and Forces Quiz", date: "May 15, 2024", subject: "Class 9 Physics" },
  { id: 2, title: "Number Systems Assessment", date: "May 18, 2024", subject: "Class 9 Mathematics" },
  { id: 3, title: "Cell Structure Test", date: "May 22, 2024", subject: "Class 9 Biology" },
];

const recentNotes = [
  { id: 1, title: "Newton's Laws of Motion", date: "May 10, 2024", subject: "Class 9 Physics" },
  { id: 2, title: "Quadratic Equations", date: "May 8, 2024", subject: "Class 9 Mathematics" },
  { id: 3, title: "Fundamental Unit of Life", date: "May 5, 2024", subject: "Class 9 Biology" },
];

const pastTestResponses = [
  { id: 1, title: "Matter in Our Surroundings", date: "May 1, 2024", subject: "Class 9 Chemistry", score: 85 },
  { id: 2, title: "French Revolution", date: "April 22, 2024", subject: "Class 9 History", score: 78 },
  { id: 3, title: "Computer Fundamentals", date: "April 15, 2024", subject: "Class 9 Computer Science", score: 92 },
];

// Mock subjects for doubt section
const subjects = [
  "Class 9 Physics",
  "Class 9 Chemistry",
  "Class 9 Biology",
  "Class 9 Mathematics",
  "Class 9 History",
  "Class 9 Geography",
  "Class 9 Computer Science",
  "Class 9 English",
  "Class 9 Hindi"
];

// Mock doubt responses
const doubtResponses = [
  {
    question: "How do Newton's laws apply to a car stopping suddenly?",
    answer: "When a car stops suddenly, all three of Newton's laws come into play. First, your body tends to continue moving forward (First Law - inertia). The seat belt applies force to stop you (Second Law), and your body pushes back on the seat belt with equal force (Third Law). This is why wearing seat belts is essential - they provide the opposing force needed to safely decelerate your body."
  },
  {
    question: "What is the difference between evaporation and boiling?",
    answer: "Evaporation and boiling are both processes where liquid changes to gas, but they differ in key ways. Evaporation happens at any temperature below boiling point and only at the surface. Boiling occurs at a specific temperature (boiling point) and happens throughout the liquid with bubble formation. Evaporation is a cooling process as high-energy molecules escape, while boiling maintains constant temperature with added heat energy."
  }
];

const Dashboard = () => {
  const [progressValue, setProgressValue] = useState(13);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [doubtQuestion, setDoubtQuestion] = useState<string>("");
  const [doubts, setDoubts] = useState<{question: string, answer: string, subject: string}[]>([]);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => setProgressValue(67), 500);
    
    // Check for user role in localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'student' || storedRole === 'teacher') {
      setUserRole(storedRole);
    }
    
    // Get user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitDoubt = () => {
    if (!selectedSubject || !doubtQuestion.trim()) return;
    
    // Simulate AI responding with a mock response
    // In a real app, this would make an API call to an AI service
    setIsAskingQuestion(true);
    setTimeout(() => {
      const newDoubt = {
        question: doubtQuestion,
        answer: "Based on your question about " + doubtQuestion + ", the concept relates to Newton's laws of motion. The principle at work here is that every action has an equal and opposite reaction, which explains the phenomenon you're asking about. Would you like me to elaborate further on this topic?",
        subject: selectedSubject
      };
      
      setDoubts([newDoubt, ...doubts]);
      setDoubtQuestion("");
      setIsAskingQuestion(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-brand-700">
              LearnSmart
            </Link>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-700 hover:bg-gray-100">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-brand-700 hover:bg-gray-100">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                  {userRole === 'teacher' ? 'T' : 'S'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{userData?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
              </div>
              
              <Link to={userRole === 'teacher' ? "/teacher-login" : "/student-login"}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500"
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('userData');
                  }}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userData?.name || 'User'}</p>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                  <FileText className="w-4 h-4" />
                </div>
                {userRole === 'student' ? 'Upcoming Tests' : 'Tests Created'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">5</div>
              <p className="text-sm text-gray-500">For this week</p>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                {userRole === 'student' ? 'Completed Tests' : 'Notes Uploaded'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">12</div>
              <p className="text-sm text-gray-500">This month</p>
            </CardContent>
          </Card>
          
          <Card className="glass card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                  <BarChart3 className="w-4 h-4" />
                </div>
                {userRole === 'student' ? 'Average Score' : 'Students Assessed'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {userRole === 'student' ? '85%' : '34'}
              </div>
              <p className="text-sm text-gray-500">
                {userRole === 'student' ? 'Last 5 tests' : 'Active students'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Portal Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{userRole === 'student' ? 'Test Portal' : 'Manage Tests'}</span>
                  <Link to="/test-portal">
                    <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                      {userRole === 'student' ? 'Enter Test Portal' : 'Create New Test'}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>
                  {userRole === 'student' 
                    ? 'Access your upcoming and in-progress tests'
                    : 'Create and monitor student assessments'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userRole === 'teacher' ? (
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="drafts">Drafts</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming" className="space-y-4">
                      {upcomingTests.map(test => (
                        <div key={test.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                          <div>
                            <h3 className="font-medium">{test.title}</h3>
                            <p className="text-sm text-gray-500">{test.subject} • {test.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Link to="/test-portal">
                              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                                Launch
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      
                      <Link to="/test-portal">
                        <Button className="w-full bg-brand-600 hover:bg-brand-700 mt-2">
                          Create New Test
                        </Button>
                      </Link>
                    </TabsContent>
                    
                    <TabsContent value="drafts">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="font-medium mb-2">No draft tests</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          You haven't created any draft tests yet
                        </p>
                        <Link to="/test-portal">
                          <Button className="bg-brand-600 hover:bg-brand-700">
                            Create New Test
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-lg border border-gray-100">
                          <div>
                            <h3 className="font-medium">Matter in Our Surroundings</h3>
                            <p className="text-sm text-gray-500">Class 9 Chemistry • May 1, 2024</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-lg border border-gray-100">
                          <div>
                            <h3 className="font-medium">Drainage System in India</h3>
                            <p className="text-sm text-gray-500">Class 9 Geography • April 25, 2024</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium mb-2">No tests available</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      There are no tests scheduled for you at the moment
                    </p>
                    <Link to="/test-portal">
                      <Button className="bg-brand-600 hover:bg-brand-700">
                        Check Test Portal
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {userRole === 'teacher' ? 'Upload Class Notes' : 'Past Test Responses'}
                </CardTitle>
                <CardDescription>
                  {userRole === 'teacher' 
                    ? 'Upload your teaching materials to help generate relevant test questions'
                    : 'Review your previous test submissions and feedback'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userRole === 'teacher' ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium mb-2">Upload Notes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Upload PDF, DOCX, or TXT files of your teaching materials
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastTestResponses.map(test => (
                      <div key={test.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                        <div>
                          <h3 className="font-medium">{test.title}</h3>
                          <div className="flex gap-2 text-sm text-gray-500">
                            <span>{test.subject}</span>
                            <span>•</span>
                            <span>{test.date}</span>
                            <span>•</span>
                            <span className="font-medium text-green-600">Score: {test.score}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex items-center">
                            <FileSearch className="w-4 h-4 mr-1" />
                            View Response
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {userRole === 'student' && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Test Responses
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userRole === 'student' ? 'Your Progress' : 'Class Progress'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userRole === 'student' ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Physics</span>
                        <span>67%</span>
                      </div>
                      <Progress value={progressValue} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Mathematics</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Chemistry</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Physics</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Mathematics</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Class 9 Geography</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
            
            {userRole === 'student' ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircleQuestion className="w-5 h-5 text-brand-600" />
                    Ask a Doubt
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to your academic questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Type your doubt here..." 
                      value={doubtQuestion}
                      onChange={(e) => setDoubtQuestion(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-brand-600 hover:bg-brand-700 flex items-center gap-2"
                    onClick={handleSubmitDoubt}
                    disabled={!selectedSubject || !doubtQuestion.trim() || isAskingQuestion}
                  >
                    {isAskingQuestion ? "Processing..." : "Ask Doubt"}
                    <Send className="w-4 h-4" />
                  </Button>
                  
                  {doubts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      <div className="text-sm font-medium">Recent Doubts</div>
                      
                      {doubts.map((doubt, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                          <div className="font-medium mb-1">{doubt.subject}</div>
                          <div className="text-gray-700 mb-2 font-medium">Q: {doubt.question}</div>
                          <div className="text-gray-600">A: {doubt.answer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {doubts.length === 0 && doubtResponses.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      <div className="text-sm font-medium">Common Doubts</div>
                      
                      {doubtResponses.map((doubt, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                          <div className="text-gray-700 mb-2 font-medium">Q: {doubt.question}</div>
                          <div className="text-gray-600">A: {doubt.answer}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-1">Upload Regular Notes</h3>
                    <p className="text-sm text-blue-700">
                      The more teaching materials you upload, the better the AI can generate relevant questions.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800 mb-1">Review AI-Generated Tests</h3>
                    <p className="text-sm text-green-700">
                      Always review the AI-generated questions before assigning them to students.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
