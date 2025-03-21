
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/services/api';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const response = await authAPI.loginTeacher(email, password);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', 'teacher');
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to LearnSmart",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col justify-center items-center p-10 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-2xl font-bold text-brand-700">LearnSmart</h1>
              </Link>
              <h2 className="text-2xl font-bold mt-6 mb-2">Teacher Login</h2>
              <p className="text-gray-600">Sign in to your teacher account</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-sm text-brand-600 hover:text-brand-800 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-700">
                    Remember me for 30 days
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-brand-600 hover:text-brand-800 transition-colors">
                    Sign up
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Are you a student?{" "}
                  <Link to="/student-login" className="text-brand-600 hover:text-brand-800 transition-colors">
                    Student Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-1/2 relative bg-brand-50">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100/70 to-brand-300/50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <div className="glass p-8 rounded-xl max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Teacher Assessment Platform</h3>
              <p className="text-gray-700 mb-4">
                "LearnSmart has transformed my teaching. I can create customized assessments in minutes, and the AI helps identify where students are struggling so I can focus my teaching efforts effectively."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold mr-3">
                  RG
                </div>
                <div>
                  <p className="font-medium text-gray-800">Dr. Rajesh Gupta</p>
                  <p className="text-sm text-gray-600">Physics Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
