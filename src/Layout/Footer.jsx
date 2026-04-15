import React from "react";
import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from '../assets/Image/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#F9F7F3] text-[#716A5C]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* 🔹 Logo + About */}
        <div>
          {/* <div className="text-3xl text-black font-black tracking-tighter">
            Ramot<span className="text-yellow-400 font-normal">LMS</span>
          </div> */}
           <img src={logo} className="h-[60px]" />
          <p className="text-sm text-[#716A5C]/80">
            Learn new skills and grow your career with our high-quality courses.
          </p>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <div className="flex items-center gap-2 text-sm mb-2">
            <FaMapMarkerAlt className="text-[#716A5C]" />
            <span>Lucknow, India</span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-2">
            <FaPhoneAlt className="text-[#716A5C]" />
            <span>+91 9876543210</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-[#716A5C]" />
            <span>support@example.com</span>
          </div>
        </div>

        {/* 🔹 Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-lg">

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#716A5C]/10 rounded-full hover:bg-[#716A5C]/20 transition"
            >
              <FaLinkedin className="text-[#716A5C]" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#716A5C]/10 rounded-full hover:bg-[#716A5C]/20 transition"
            >
              <FaFacebookF className="text-[#716A5C]" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#716A5C]/10 rounded-full hover:bg-[#716A5C]/20 transition"
            >
              <FaInstagram className="text-[#716A5C]" />
            </a>

          </div>
        </div>

      </div>

      {/* 🔹 Bottom */}
      <div className="border-t border-[#716A5C]/30 text-center py-4 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;