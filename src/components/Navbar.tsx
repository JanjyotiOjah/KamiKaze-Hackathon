
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-700">
          LearnSmart
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-brand-700 ${
              location.pathname === '/' ? 'text-brand-700' : 'text-gray-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="#features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-700"
          >
            Features
          </Link>
          <Link
            to="#about"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-700"
          >
            About
          </Link>
          <Link
            to="/login"
            className="ml-4"
          >
            <Button
              variant="outline"
              className="rounded-full px-6 border-brand-600 text-brand-700 hover:bg-brand-50"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-full px-6 bg-brand-600 hover:bg-brand-700 transition-colors">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-fade-in z-40">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-brand-700 ${
                location.pathname === '/' ? 'text-brand-700' : 'text-gray-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/login"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="outline"
                className="w-full rounded-full border-brand-600 text-brand-700 hover:bg-brand-50"
              >
                Login
              </Button>
            </Link>
            <Link 
              to="/register" 
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full rounded-full bg-brand-600 hover:bg-brand-700 transition-colors">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
