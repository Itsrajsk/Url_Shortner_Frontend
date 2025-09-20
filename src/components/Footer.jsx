// Footer.jsx
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa";

const socialLinks = [
  { href: "https://www.twitter.com", icon: <FaTwitter /> },
  { href: "https://www.linkedin.com", icon: <FaLinkedin /> },
  { href: "https://www.instagram.com", icon: <FaInstagram /> },
  { href: "https://www.github.com", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <div className="bg-white py-5 lg:px-8 px-6 text-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-6">
        {/* Copyright Section */}
        <div className="flex items-center">
          <FaRegCopyright className="mr-2" />
          <p>2023 Linklytics. All rights reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-x-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-900 transition-colors duration-300 transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
