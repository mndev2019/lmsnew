import React, { useState } from "react";
import image from "../../assets/Image/bannerimg.png";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔥 prevent multiple click

    try {
      setLoading(true);

      await axios.post(`${Base_Url}/lead`, formData);

      toast.success("Message sent successfully ✅");

      // reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT IMAGE */}
        <div className="relative h-[300px] md:h-auto">
          <img src={image} alt="contact" className="w-full h-[600px] object-contain" />
          <div className="absolute inset-0 bg-[#716A5C]/70"></div>

          <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
            <h2 className="text-4xl font-bold mb-4">Let's Build Something Amazing ✨</h2>
            <p className="text-sm opacity-90 max-w-sm">
              Have a project in mind? Drop your message and let’s create something beautiful together.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white/70 backdrop-blur-xl p-8 md:p-12 relative">
          <h2 className="text-3xl font-bold text-[#716A5C] mb-8">
            Contact Me
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:border-[#716A5C]"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#716A5C]
              peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:border-[#716A5C]"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#716A5C]
              peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
                Email Address
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:border-[#716A5C]"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#716A5C]
              peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
                Phone Number
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:border-[#716A5C]"
              ></textarea>
              <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#716A5C]
              peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
                Your Message
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#716A5C] text-white hover:scale-105"}`}
            >
              {loading ? "Sending..." : "Send Message"}

              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;