import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaVideo,
    FaUsers,
    FaRupeeSign,
    FaInfoCircle,
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import { Base_Url } from "../../Api/Base_Url";
import { toast } from "react-toastify";

const WebinarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate("");

    const [webinar, setWebinar] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    // ✅ Get Webinar Details
    const getWebinar = async () => {
        try {
            const res = await axios.get(`${Base_Url}/webinars/${id}`);
            setWebinar(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ Check Registration
    const checkRegistration = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`${Base_Url}/webinars/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const isRegistered = res.data.data.some(
                (item) => item.webinarId?._id === id
            );

            setRegistered(isRegistered);
        } catch {
            setRegistered(false);
        }
    };

    // ✅ Register
    const handleRegister = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login first");
                return;
            }

            // 🔥 Paid webinar → Payment page
            if (webinar.isPaid) {
                navigate(`/payment/webinar/${id}`);
                return;
            }

            // ✅ Free webinar → Direct register
            setLoading(true);

            await axios.post(
                `${Base_Url}/webinars/register`,
                { webinarId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRegistered(true);
            toast.success("Registered Successfully 🎉");

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Join
    const handleJoin = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${Base_Url}/webinars/join/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            window.open(res.data.meetingLink, "_blank");
        } catch {
            toast.error("Please login first");
        }
    };

    // ✅ Countdown
    const calculateTimeLeft = () => {
        if (!webinar) return;

        const now = new Date();
        const start = new Date(webinar.startTime);

        const diff = start - now;

        if (diff <= 0) {
            setTimeLeft("Live Now 🔴");
            return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    // ✅ Button Logic
    const getButtonState = () => {
        if (!webinar) return "";

        const now = new Date();
        const start = new Date(webinar.startTime);
        const end = new Date(webinar.endTime);

        if (!localStorage.getItem("token")) return "login";
        if (!registered) return "register";
        if (now < start) return "soon";
        if (now >= start && now <= end) return "join";
        if (now > end) return "ended";

        return "";
    };

    useEffect(() => {
        getWebinar();
        checkRegistration();
    }, []);

    useEffect(() => {
        if (!webinar) return;

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [webinar]);

    const state = getButtonState();

    return (
        <>
            {/* <TopHeader /> */}

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 pt-30">
                <div className="max-w-6xl mx-auto">

                    {/* HERO */}
                    <div className="rounded-3xl shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-10">

                        <h1 className="text-3xl md:text-5xl font-bold">
                            {webinar?.title || "Webinar Title"}
                        </h1>

                        <p className="mt-4 text-white/80 max-w-2xl">
                            {webinar?.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 text-sm">

                            <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                <FaCalendarAlt />
                                {webinar && new Date(webinar.startTime).toDateString()}
                            </span>

                            <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                <FaClock />
                                {webinar?.duration} min
                            </span>

                            <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                <FaUsers />
                                Live Session
                            </span>

                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {/* LEFT */}
                        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">

                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <FaInfoCircle className="text-indigo-600" />
                                About Webinar
                            </h2>

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                {webinar?.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-semibold text-green-600">
                                        {webinar?.status}
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <FaRupeeSign />
                                        Price
                                    </p>
                                    <p className="font-semibold">
                                        {webinar?.isPaid ? `₹${webinar.price}` : "Free"}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">

                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FaVideo className="text-indigo-600" />
                                Join Webinar
                            </h3>

                            <div className="mt-4 space-y-3 text-sm text-gray-600">

                                <p className="flex items-center gap-2">
                                    <FaCalendarAlt />
                                    {webinar && new Date(webinar.startTime).toLocaleDateString()}
                                </p>

                                <p className="flex items-center gap-2">
                                    <FaClock />
                                    {webinar && new Date(webinar.startTime).toLocaleTimeString()}
                                </p>

                                <p className="flex items-center gap-2">
                                    <FaVideo /> Google Meet Live
                                </p>

                            </div>

                            {/* ⏳ Countdown */}
                            <p className="mt-4 text-center text-sm text-gray-600">
                                ⏳ {timeLeft}
                            </p>

                            {/* 🔥 Smart Button */}
                            <div className="mt-6">

                                {state === "login" && (
                                    <button className="w-full bg-gray-500 text-white py-3 rounded-xl">
                                        Login to Join
                                    </button>
                                )}

                                {state === "register" && (
                                    <button
                                        onClick={handleRegister}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl"
                                    >
                                        {loading
                                            ? "Processing..."
                                            : webinar?.isPaid
                                                ? "Buy & Register 💰"
                                                : "Register"}
                                    </button>
                                )}

                                {state === "soon" && (
                                    <button className="w-full bg-yellow-500 text-white py-3 rounded-xl">
                                        Starting Soon
                                    </button>
                                )}

                                {state === "join" && (
                                    <button
                                        onClick={handleJoin}
                                        className="w-full bg-green-600 text-white py-3 rounded-xl"
                                    >
                                        Join Now 🚀
                                    </button>
                                )}

                                {state === "ended" && (
                                    <button className="w-full bg-gray-400 text-white py-3 rounded-xl">
                                        Webinar Ended
                                    </button>
                                )}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default WebinarDetails;