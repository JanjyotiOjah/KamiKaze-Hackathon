
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col justify-center items-center p-10 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-2xl font-bold text-brand-700">LearnSmart</h1>
              </Link>
              <h2 className="text-2xl font-bold mt-6 mb-2">Welcome to LearnSmart</h2>
              <p className="text-gray-600">Please select your account type to continue</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="space-y-4">
                <Link to="/student-login">
                  <Button 
                    className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors h-14"
                  >
                    Student Login
                  </Button>
                </Link>
                
                <Link to="/teacher-login">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-lg border-brand-600 text-brand-700 hover:bg-brand-50 transition-colors h-14"
                  >
                    Teacher Login
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-brand-600 hover:text-brand-800 transition-colors">
                    Sign up
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI-Powered Learning</h3>
              <p className="text-gray-700 mb-4">
                "LearnSmart has revolutionized how we evaluate student knowledge. Its AI-powered assessments focus on real understanding rather than memorization, and the results speak for themselves."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold mr-3">
                  JD
                </div>
                <div>
                  <p className="font-medium text-gray-800">Dr. Jane Doe</p>
                  <p className="text-sm text-gray-600">Department Chair, Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
