import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
// import TopHeader from "../../Layout/TopHeader";
import { Base_Url } from "../../Api/Base_Url";

const MyWebinars = () => {
    const [webinars, setWebinars] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch My Webinars
    const getMyWebinars = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await axios.get(`${Base_Url}/webinars/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setWebinars(res.data.data || []);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyWebinars();
    }, []);

    // ✅ Time-based label
    const getStatus = (webinar) => {
        const now = new Date();
        const start = new Date(webinar.startTime);
        const end = new Date(webinar.endTime);

        if (now < start) return "Upcoming";
        if (now >= start && now <= end) return "Live";
        return "Completed";
    };

    return (
        <>
            {/* <TopHeader /> */}

            <div className="p-6 min-h-screen pt-30">


                <div className="mb-10 text-left">
                    <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
                        My Webinars 🎥
                    </h2>

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-yellow-400 rounded-full" />
                        <span className="md:text-lg text-md font-medium text-gray-700">
                            Access your registered webinars and join sessions at the right time
                        </span>
                    </div>
                </div>

                {loading && <p>Loading...</p>}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">

                    {webinars.map((item) => {
                        const webinar = item.webinarId;

                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                            >

                                {/* Thumbnail */}
                                <div className="h-40 bg-gray-200">
                                    {webinar?.thumbnail && (
                                        <img
                                            src={webinar.thumbnail}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="p-4">

                                    <h3 className="font-semibold text-lg mb-1">
                                        {webinar?.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        📅 {new Date(webinar?.startTime).toLocaleDateString()}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ⏰ {new Date(webinar?.startTime).toLocaleTimeString()}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ⏳ {webinar?.duration} mins
                                    </p>
                                    {webinar.recordingUrl && getStatus(webinar) === "Completed" && (
                                        <a
                                            href={webinar.recordingUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-blue-600 text-white px-3 py-1 rounded mt-2 inline-block"
                                        >
                                            Watch Recording 🎥
                                        </a>
                                    )}

                                    {/* Status Badge */}
                                    <div className="mt-2">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${getStatus(webinar) === "Live"
                                                ? "bg-green-100 text-green-600"
                                                : getStatus(webinar) === "Upcoming"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {getStatus(webinar)}
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-between mt-4">

                                        <button
                                            className="text-indigo-600 text-sm"
                                            onClick={() => navigate(`/webinar/${webinar._id}`)}
                                        >
                                            View →
                                        </button>

                                        {getStatus(webinar) === "Live" && (
                                            <a
                                                href={webinar.meetingLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Join
                                            </a>
                                        )}

                                        {getStatus(webinar) === "Upcoming" && (
                                            <span className="text-yellow-600 text-sm">
                                                Starting Soon
                                            </span>
                                        )}

                                        {getStatus(webinar) === "Completed" && (
                                            <span className="text-gray-500 text-sm">
                                                Ended
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </div>
                        );
                    })}


                </div>

                {!loading && webinars.length === 0 && (
                    <p className="text-center mt-10 text-gray-500">
                        No registered webinars found
                    </p>
                )}

            </div>
        </>
    );
};

export default MyWebinars;