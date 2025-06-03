import {
  Github,
  Mail,
  Linkedin,
  Instagram,
  Layout,
  ArrowUp,
  Phone,
  Store,
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-500/20 dark:bg-gray-900/20 backdrop-blur-lg text-gray-700 dark:text-gray-400 py-12 cursor-default">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Brand Section */}
          <a
            href="https://aaroophan.onrender.com"
            className="flex items-center gap-2 text-xl font-bold mb-6 hover:text-primary transition-colors"
          >
            <Layout className="w-6 h-6" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.375 38.4" width="24.375" height="38.4"><g transform="translate(0, 30.72)"><path d="M542 492 522 454Q396 219 396 90Q396 52 425 16Q401 8 317 -23Q278 -37 243 -37Q173 -37 173 30Q173 169 346 454L377 505H326Q162 505 72 454Q119 623 325 623L449 620L476 660Q633 896 956 1295Q1065 1430 1119 1463.0Q1173 1496 1328 1523Q1299 1343 1299 1188Q1299 777 1394 355Q1446 123 1553 56Q1459 -37 1392 -37Q1234 -37 1148 505Q983 487 815 487ZM614 610 816 605Q1023 605 1133 619Q1087 970 1087 1201L1088 1276Q1055 1234 940 1094Q732 839 635 649Z" fill="var(--primary-color)" transform="scale(0.015625, -0.015625)" /></g></svg>
            Aaroophan
          </a>

          {/* Social Icons */}
          <div className="flex space-x-6 mb-6">
            <a
              href="https://github.com/Aaroophan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/aaroophan/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/aaroophan/?theme=dark"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:arophn@gmail.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:+94768505131"
              className="hover:text-primary transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="http://aaroophan.onrender.com"
              aria-label="Portfolio"
              className="hover:text-primary transition-colors"
            >
              <Store className="w-5 h-5" />
            </a>
          </div>

          {/* Section Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="hover:text-primary transition-colors"
              >
                {section}
              </a>
            ))}
          </div>

          {/* Copyright and Scroll */}
          <div className="text-center">
            <p className="text-sm mb-4">
              &copy; {currentYear} Aaroophan Varatharajan. All rights reserved.
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
