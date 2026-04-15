import React, { useState } from "react";
import signupImg from "../assets/Image/signup.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../Api/Base_Url";
import { toast } from "react-toastify";
import logo from '../assets/Image/logo.png'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${Base_Url}/login`, form);

      // ✅ Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const courseId = location.state?.courseId;
      const redirectPath = location.state?.from || "/";

      // 🔥 AUTO ENROLL (agar course se aaya hai)
      if (courseId) {
        await axios.post(
          `${Base_Url}/enroll`,
          { courseId },
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          }
        );
      }

      // ✅ Redirect
      navigate(redirectPath);
      toast.success("Login Successfull")

    } catch (err) {
  console.log(err);

  const message =
    err.response?.data?.msg ||   // backend msg
    err.response?.data?.error || // backend error
    "Something went wrong ❌";   // fallback

  toast.error(message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

  <div className="grid md:grid-cols-2 max-w-6xl w-full overflow-hidden">

    {/* FORM */}
    <div className="flex flex-col justify-center px-4 sm:px-8 md:px-10 py-6 md:py-8">

      {/* LOGO */}
      <img 
        src={logo} 
        className="h-[45px] md:h-[60px] w-auto object-contain" 
      />

      <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold mt-4">
        Launch and grow your online learning business with AI
      </h3>

      <p className="text-[14px] sm:text-[16px] md:text-[18px] mt-3 md:mt-4 mb-6 md:mb-10">
        Build, manage, and expand your digital courses on a smart platform.
      </p>

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border rounded-md px-4 py-2 outline-none focus:border-blue-500 text-sm md:text-base"
          required
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border rounded-md px-4 py-2 pr-10 outline-none focus:border-blue-500 text-sm md:text-base"
            required
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#6292F2] hover:bg-blue-600 text-white py-2 md:py-3 rounded-md text-base md:text-lg font-medium transition mt-4 md:mt-6"
        >
          Continue
        </button>

      </form>

      {/* SIGNUP */}
      <p className="text-xs md:text-sm text-center mt-6 md:mt-10">
        Don’t have an account?{" "}
        <span
          className="text-[#6292F2] cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>

    </div>

    {/* IMAGE */}
    <div className="hidden md:block p-4">
      <img
        src={signupImg}
        alt="signup"
        className="w-full h-[500px] md:h-[700px] object-cover rounded-lg"
      />
    </div>

  </div>
</div>
  );
};

export default Login;