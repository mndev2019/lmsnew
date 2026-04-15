import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profile from '../assets/Image/profile.jpg'
import logo from '../assets/Image/logo.png'
import { toast } from "react-toastify";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        toast.success("Logout successfull")
    };

    const location = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    return (
        <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
            <div className="w-[95%] bg-white/90 backdrop-blur-md shadow-lg rounded-2xl">

                <div className="flex items-center justify-between px-4 md:px-6 py-3">

                    {/* Logo */}
                    {/* <div className="text-3xl font-black tracking-tighter">
                        Ramot<span className="text-yellow-400 font-normal">LMS</span>
                    </div> */}
                    <img src={logo} className="h-[45px] md:h-[60px]" />

                    {/* 🔥 Desktop MENU */}
                    <ul className="hidden md:flex items-center gap-8 font-medium text-[16px]">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/webinar">Live Webinar</Link></li>

                        {token && (
                            <>
                                <li><Link to="/my-course" className="font-semibold">My Courses</Link></li>
                                <li><Link to="/my-webinar" className="font-semibold">My Webinars</Link></li>
                            </>
                        )}
                    </ul>

                    {/* 🔥 Right Section */}
                    <div className="flex items-center gap-3 md:gap-4">

                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden md:block border border-gray-400 px-4 py-2 rounded-full text-sm"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="hidden md:block bg-[#FCCC18] px-4 py-2 rounded-full font-semibold"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Profile */}
                                <div
                                    onClick={() => navigate("/profile")}
                                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer overflow-hidden"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt="profile"
                                            className="w-full h-full object-fill"
                                        />
                                    ) : (
                                        <img
                                            src={profile}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="hidden md:block bg-[#716A5C] text-white px-4 py-2 rounded-full text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {/* 🔥 Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-xl"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* 🔥 Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden px-4 pb-4">
                        <ul className="flex flex-col gap-4 font-medium">

                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
                            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                            <li><Link to="/webinar" onClick={() => setMenuOpen(false)}>Live Webinar</Link></li>

                            {token && (
                                <>
                                    <li><Link to="/my-course" onClick={() => setMenuOpen(false)}>My Courses</Link></li>
                                    <li><Link to="/my-webinar" onClick={() => setMenuOpen(false)}>My Webinars</Link></li>
                                </>
                            )}

                            {!token ? (
                                <>
                                    <Link to="/login" className="border px-4 py-2 rounded-full text-sm text-center">Login</Link>
                                    <Link to="/signup" className="bg-[#FCCC18] px-4 py-2 rounded-full text-center">Signup</Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#716A5C] text-white px-4 py-2 rounded-full text-sm"
                                >
                                    Logout
                                </button>
                            )}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;