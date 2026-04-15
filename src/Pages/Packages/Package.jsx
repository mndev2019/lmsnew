import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";
import { Link } from "react-router-dom";
import { GrChapterAdd } from "react-icons/gr";

const Package = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 GET PACKAGES
    const getPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${Base_Url}/packages`);
            setPackages(res.data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPackages();
    }, []);

    return (
        <>
            {/* HEADER */}
            <div className="my-10 text-left">
                <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
                     Learning Packages
                </h2>

                <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-6 bg-red-900 rounded-full" />
                    <span className="md:text-lg text-md font-medium text-gray-700">
                         Explore curated bundles designed to boost your skills faster
                    </span>
                </div>
            </div>

            {/* LOADING */}
            {loading && <p>Loading...</p>}

            {/* PACKAGES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages?.map((pkg) => (
                    <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                        {/* IMAGE */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={pkg?.coverImage}
                                alt={pkg?.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                            {/* CATEGORY */}
                            <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-[10px] font-semibold px-3 py-1 rounded-full shadow">
                                {pkg?.access}
                            </span>

                            {/* PRICE */}
                            <span className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                {pkg?.packagePrice === "free"
                                    ? "FREE"
                                    : `₹${pkg?.packagePrice}`}
                            </span>

                            {/* HOVER BTN */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <Link
                                    to={`/pkg/${pkg._id}`}
                                    className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition"
                                >
                                    View Package
                                </Link>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 flex flex-col gap-3">

                            {/* TITLE */}
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
                                {pkg?.title}
                            </h3>

                            {/* DESC */}
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {pkg?.description}
                            </p>

                            {/* CHAPTERS */}
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                                <GrChapterAdd className="text-[#716A5C] text-lg" />
                                 {pkg.courses?.length || 0} Courses
                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-4">
                                {/* PRICE */}
                                <div>
                                    {pkg?.packagePrice === "free" ? (
                                        <span className="text-green-600 font-bold text-lg">
                                            Free
                                        </span>
                                    ) : (
                                        <span className="text-indigo-600 font-bold text-lg">
                                            ₹{pkg?.packagePrice}
                                        </span>
                                    )}
                                </div>

                                {/* CTA */}
                                <Link
                                    to={`/pkg/${pkg?._id}`}
                                    className="text-xs font-semibold text-indigo-600 hover:underline"
                                >
                                    Explore →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Package;