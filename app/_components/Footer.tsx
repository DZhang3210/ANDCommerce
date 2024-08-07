// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left side of the footer */}
          <div className="text-sm">
            © {new Date().getFullYear()} My Company. All rights reserved.
          </div>

          {/* Right side of the footer (Social Links) */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Additional Footer Links */}
        <div className="mt-4 text-center">
          <a href="/privacy-policy" className="hover:text-gray-400 text-sm">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="hover:text-gray-400 text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
