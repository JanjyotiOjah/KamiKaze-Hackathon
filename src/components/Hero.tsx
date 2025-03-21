
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative z-10">
          {/* Background Elements */}
          <div className="absolute -top-24 -left-20 w-64 h-64 bg-brand-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-brand-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-700 bg-brand-100 rounded-full">
                Revolutionizing Education Assessment
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
                Redefining Learning <span className="text-brand-600">Assessment</span> with AI
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Moving beyond rote learning and unfair grading with AI-powered personalized assessments that focus on real understanding and practical application.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="rounded-full px-8 py-6 bg-brand-600 hover:bg-brand-700 text-white">
                    Get Started
                  </Button>
                </Link>
                <Link to="#features">
                  <Button variant="outline" className="rounded-full px-8 py-6 border-brand-600 text-brand-700 hover:bg-brand-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="glass rounded-2xl p-1 shadow-xl">
                <div className="relative bg-white rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-400 to-brand-700"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="bg-brand-50 rounded-lg px-3 py-1 text-sm font-medium text-brand-700">
                        Weekly Assessment
                      </div>
                      <div className="text-sm text-gray-500">
                        Week 3 • May 2024
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="font-medium mb-2">Real-world Application</h3>
                        <p className="text-sm text-gray-600">Design a solution to optimize energy usage in a smart home system using the principles of machine learning we covered this week.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="font-medium mb-2">Critical Analysis</h3>
                        <p className="text-sm text-gray-600">Compare supervised and unsupervised learning approaches for customer segmentation in an e-commerce business.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-60">
                        <h3 className="font-medium mb-2">Practical Implementation</h3>
                        <p className="text-sm text-gray-600">Unique question for each student based on individual learning progress...</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="rounded-full px-4 py-2 text-sm bg-brand-600">Start Assessment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
