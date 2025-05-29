import  { Github, Mail, Linkedin, Instagram, Layout, ArrowUp, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <a href="#" className="flex items-center gap-2 text-xl font-bold gradient-text mb-6">
            <Layout className="w-6 h-6" />
            <span>Aaroophan</span>
          </a>
          
          <div className="flex space-x-6 mb-8">
            <a
              href="https://github.com/Aaroophan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a
              href="https://linkedin.com/in/aaroophan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a
              href="https://www.instagram.com/aaroophan/?theme=dark"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:arophn@gmail.com"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            <a
              href="tel:+94768505131"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              About
            </a>
            <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Skills
            </a>
            <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Projects
            </a>
            <a href="#experience" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Experience
            </a>
            <a href="#education" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Education
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Contact
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              © {currentYear} Aaroophan Varatharajan. All rights reserved.
            </p>
            
            <button
              onClick={scrollToTop}
              className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
 