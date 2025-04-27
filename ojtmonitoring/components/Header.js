// components/Header.js
import { useEffect, useState } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-t from-blue-900 to-blue-800 text-white p-4 fixed top-0 w-full z-10 shadow-xl">
      <div className="flex justify-between items-center px-6 sm:px-16">
        <div className="flex gap-1">
          <img src="/Main_Logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
          <img src="/Crim_Logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-10">
          <a
            href="#HeroSection"
            className={`hover:font-bold transition-all ${
              activeSection === 'HeroSection' ? 'font-bold' : ''
            }`}
          >
            Home
          </a>
          <a
            href="#AboutUsSection"
            className={`hover:font-bold transition-all ${
              activeSection === 'AboutUsSection' ? 'font-bold' : ''
            }`}
          >
            About Us
          </a>
          <a
            href="#ContactUsSection"
            className={`hover:font-bold transition-all ${
              activeSection === 'ContactUsSection' ? 'font-bold' : ''
            }`}
          >
            Contact Us
          </a>
          <a href="/auth" className="hover:font-bold transition-all">
            Log In
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } bg-blue-900 text-white p-4 mt-4`}
      >
        <a
          href="#HeroSection"
          className={`block py-2 ${activeSection === 'HeroSection' ? 'font-bold' : ''}`}
        >
          Home
        </a>
        <a
          href="#AboutUsSection"
          className={`block py-2 ${activeSection === 'AboutUsSection' ? 'font-bold' : ''}`}
        >
          About Us
        </a>
        <a
          href="#ContactUsSection"
          className={`block py-2 ${activeSection === 'ContactUsSection' ? 'font-bold' : ''}`}
        >
          Contact Us
        </a>
        <a
          href="/auth"
          className="block py-2 font-bold"
        >
          Log In
        </a>
      </div>
    </div>
  );
}
