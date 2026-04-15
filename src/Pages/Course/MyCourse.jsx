import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Base_Url } from "../../Api/Base_Url";

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const getMyCourses = async () => {
        try {
            const res = await axios.get(`${Base_Url}/my-courses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCourses(res.data.courses);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        getMyCourses();
    }, []);

    return (
        <div className="min-h-screen bg-[#FBF9F4] p-10 pt-30">


            <div className="mb-10 text-left">
                <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
                    My Courses
                </h2>

                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-yellow-400 rounded-full" />
                    <span className="md:text-lg text-md font-medium text-gray-700">
                        Access your enrolled courses and continue learning at your own pace
                    </span>
                </div>
            </div>

            {courses.length === 0 ? (
                <p>No enrolled courses yet 😢</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">

                    {courses?.map((course) => (
                        <div
                            key={course?._id}
                            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                            onClick={() => navigate(`/learn/${course?._id}`)}
                        >
                            <img
                                src={course?.thumbnail}
                                alt={course?.title}
                                className="w-full h-40 object-cover rounded"
                            />

                            <h2 className="mt-3 font-semibold text-lg">
                                {course?.title}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {course?.description}
                            </p>

                            <button className="mt-3 text-indigo-600 font-semibold">
                                Continue Learning →
                            </button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default MyCourses;