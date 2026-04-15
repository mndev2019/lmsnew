import React, { useState } from "react";
import signupImg from "../assets/Image/signup.png"; // your image
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../Api/Base_Url";
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !mobile || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${Base_Url}/register`, {
                name,
                email,
                mobile,
                password,
            });

            console.log(res.data);

            if (res.data.success) {
                toast.success("Register Successfully ✅");
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">

            <div className="grid md:grid-cols-2 max-w-6xl w-full overflow-hidden">

                {/* Left Image */}
                <div className="p-4">
                    <img
                        src={signupImg}
                        alt="signup"
                        className="w-full h-[700px] object-cover rounded-lg"
                    />
                </div>

                {/* Right Form */}
                <div className="flex flex-col justify-center px-10 py-8">

                    {/* Logo */}
                    {/* <h2 className="text-2xl font-bold mb-6">LOGO</h2> */}
                    <div className="text-3xl font-black tracking-tighter">
                        Ramot<span className="text-yellow-400 font-normal">LMS</span>
                    </div>
                    <h3 className="text-[30px] font-semibold text-(--text-primary)">
                        Launch and grow your online learning business with AI
                    </h3>

                    <p className="text-(--text-primary) text-[18px] mt-4 mb-6">
                        Build, manage, and expand your digital courses on a smart platform
                        designed for creators and educators.
                    </p>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handlesubmit}>

                        <input
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-(--primary) rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        />

                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-(--primary) rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        />

                        {/* Phone */}
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value="IN (+91)"
                                readOnly
                                className="w-28 border border-(--primary) rounded-md px-3 py-2 bg-gray-100"
                            />

                            <input
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                type="text"
                                placeholder="Phone number"
                                className="flex-1 border border-(--primary) rounded-md px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">

                            <input
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full border border-(--primary) rounded-md px-4 py-2 pr-10 outline-none focus:border-blue-500"
                            />

                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </span>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6292F2] hover:bg-blue-600 text-white py-2 rounded-md text-lg font-medium transition disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : "Continue"}
                        </button>

                    </form>

                    {/* Login */}
                    <p className="text-sm text-(--text-primary) text-center mt-4">
                        Already have an account?{" "}
                        <span className="text-[#6292F2] cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Signup;