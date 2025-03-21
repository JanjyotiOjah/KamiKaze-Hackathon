
import { useEffect, useRef, useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Upload, 
  Award, 
  Sparkles, 
  Fingerprint,
  BarChart
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className={`glass rounded-xl p-6 card-hover transform transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Fingerprint size={24} />,
      title: "Unique Assessments",
      description: "AI generates unique questions for each student based on their learning journey.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Real-world Application",
      description: "Questions focus on practical applications rather than memorization of facts.",
    },
    {
      icon: <Upload size={24} />,
      title: "Teacher Notes Integration",
      description: "Teachers upload class notes which AI uses to generate relevant questions.",
    },
    {
      icon: <FileText size={24} />,
      title: "Weekly Tests",
      description: "Regular assessments help reinforce learning and identify knowledge gaps.",
    },
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Evaluation",
      description: "Fair and consistent assessment that focuses on understanding, not memorization.",
    },
    {
      icon: <Award size={24} />,
      title: "Calibrated Marking",
      description: "Teacher responses are used to calibrate AI to maintain teaching standards.",
    },
    {
      icon: <BarChart size={24} />,
      title: "Insight Analytics",
      description: "Detailed insights on student performance to identify strengths and areas for improvement.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Encourages Creativity",
      description: "Assessment model that rewards creative thinking and unique approaches.",
    },
  ];
  
  return (
    <section id="features" className="section bg-gradient-to-b from-white to-brand-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Education Assessment</h2>
          <p className="text-lg text-gray-600">
            Our innovative platform addresses the critical challenges of rote learning and subjective marking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
