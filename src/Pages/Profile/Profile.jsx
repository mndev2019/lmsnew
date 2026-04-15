import React, { useEffect, useState } from "react";
import axios from "axios";
import profile from '../../assets/Image/profile.jpg'
import { Base_Url } from "../../Api/Base_Url";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

const ProfilePage = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
const [whatsappLink, setWhatsappLink] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(userData?.name || "");
    const [mobile, setMobile] = useState(userData?.mobile || "");
    const [password, setPassword] = useState("");

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(userData?.profileImage || "");
    const [loading, setLoading] = useState(false);

    // 📸 Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // 💾 Update Profile
    const handleUpdate = async () => {
        try {
            setLoading(true); // 🔥 start loading
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("mobile", mobile);

            if (password) {
                formData.append("password", password);
            }

            if (image) {
                formData.append("profileImage", image);
            }

            const res = await axios.put(`${Base_Url}/update-profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            setIsEdit(false);
            toast.success("Profile Updated ✅");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong ❌");
        } finally {
            setLoading(false); // 🔥 stop loading (important)
        }
    };
    useEffect(() => {
    const getWhatsappLink = async () => {
        try {
            const res = await axios.get(`${Base_Url}/community`);
            setWhatsappLink(res.data.data.link);
        } catch (err) {
            console.log(err);
        }
    };

    getWhatsappLink();
}, []);

  return (
    <section className="min-h-screen bg-[#F3F1EC] flex items-center justify-center px-3 md:px-4 py-6">

        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-[#e5e2dc] rounded-[20px] md:rounded-[30px] shadow-lg overflow-hidden">

            {/* Top Gradient */}
            <div className="h-20 md:h-24 bg-gradient-to-r from-[#a8edea] to-[#fed6e3]"></div>

            <div className="p-4 md:p-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 -mt-12 md:-mt-16 mb-6 md:mb-8">

                    {/* Avatar */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto md:mx-0">

                        <img
                            src={preview ? preview : profile}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                        />

                        {isEdit && (
                            <label className="absolute bottom-0 right-0 bg-black text-white text-[10px] md:text-xs px-2 py-1 rounded-full cursor-pointer">
                                Edit
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>

                    {/* Name + Email */}
                    <div className="text-center md:text-left">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            {name}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500">
                            {userData?.email}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-3 md:ml-auto">

                        {/* WhatsApp */}
                        {whatsappLink && (
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-2"
                            >
                                <FaWhatsapp size={14} />
                                Join
                            </a>
                        )}

                        {/* Edit */}
                        <button
                            onClick={() => setIsEdit(!isEdit)}
                            className="px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:opacity-90 transition"
                        >
                            {isEdit ? "Cancel" : "Edit"}
                        </button>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    {/* Name */}
                    <div>
                        <label className="text-xs text-gray-500">Full Name</label>
                        {isEdit ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 p-2 md:p-3 text-sm rounded-xl border border-[#ddd] focus:ring-2 focus:ring-[#667eea] outline-none"
                            />
                        ) : (
                            <p className="mt-1 font-medium text-sm md:text-base text-gray-800">{name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-500">Email</label>
                        <p className="mt-1 font-medium text-sm md:text-base text-gray-800">
                            {userData?.email}
                        </p>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-xs text-gray-500">Mobile</label>
                        {isEdit ? (
                            <input
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full mt-1 p-2 md:p-3 text-sm rounded-xl border border-[#ddd] focus:ring-2 focus:ring-[#667eea] outline-none"
                            />
                        ) : (
                            <p className="mt-1 font-medium text-sm md:text-base text-gray-800">{mobile}</p>
                        )}
                    </div>

                    {/* Password */}
                    {isEdit && (
                        <div>
                            <label className="text-xs text-gray-500">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full mt-1 p-2 md:p-3 text-sm rounded-xl border border-[#ddd] focus:ring-2 focus:ring-[#667eea] outline-none"
                            />
                        </div>
                    )}
                </div>

                {/* Save Button */}
                {isEdit && (
                    <div className="mt-6 md:mt-8 text-center md:text-right">
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className={`w-full md:w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-white text-sm font-medium transition 
                            ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:scale-105"
                                }`}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    </section>
);
};

export default ProfilePage;