
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section id="about" className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Tackling Critical Issues in Education</h2>
              <div className="space-y-6">
                <div className="bg-brand-50 rounded-lg p-6 border border-brand-100">
                  <h3 className="text-xl font-semibold mb-3 text-brand-800">The Rote Learning Problem</h3>
                  <p className="text-gray-600">
                    Traditional assessment methods often reward memorization over understanding, 
                    leading to surface-level knowledge that doesn't translate to real-world application. 
                    Our platform generates unique, application-based questions that require critical thinking and creativity.
                  </p>
                </div>
                
                <div className="bg-brand-50 rounded-lg p-6 border border-brand-100">
                  <h3 className="text-xl font-semibold mb-3 text-brand-800">The Subjective Grading Challenge</h3>
                  <p className="text-gray-600">
                    Inconsistent marking practices can create unfair outcomes for students. 
                    By using AI that's calibrated with teacher inputs, our system provides fair, 
                    consistent evaluation while maintaining educational standards and values.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Promotes Deeper Learning</h4>
                      <p className="text-gray-600">
                        By focusing on application rather than memorization, students develop a more robust understanding of concepts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Ensures Fair Assessment</h4>
                      <p className="text-gray-600">
                        Eliminates bias and inconsistency in grading, providing all students with an equal opportunity to succeed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Saves Teacher Time</h4>
                      <p className="text-gray-600">
                        Automates test creation and grading, allowing teachers to focus more on teaching and less on administrative tasks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Personalizes Learning</h4>
                      <p className="text-gray-600">
                        Provides individualized questions tailored to each student's progress and learning style.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why It Matters</h3>
                <p className="mb-4">
                  In today's rapidly evolving world, the ability to apply knowledge to new situations is more valuable than memorizing facts. Our system prepares students for real-world challenges by developing critical thinking and problem-solving skills.
                </p>
                <p>
                  By addressing these fundamental issues in education, we're not just improving assessment—we're transforming how students learn and how teachers teach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      
      <section className="section bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Assessment?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join educators and institutions who are already using our platform to create meaningful assessments that truly measure understanding.
          </p>
          <div className="inline-block">
            <a href="/register" className="inline-block rounded-full px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors">
              Get Started Today
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
