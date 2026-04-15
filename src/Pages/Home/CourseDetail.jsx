// import React, {useState} from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Base_Url } from "../../Api/Base_Url";
// import { FaStar } from "react-icons/fa6";
// import { GrChapterAdd } from "react-icons/gr";

// const CourseDetail = () => {
//     const navigate = useNavigate("");
//     const { id } = useParams();
//     const [course, setCourse] = useState(null);

//     const getCourseDetail = async () => {
//         try {
//             const res = await axios.get(`${Base_Url}/course/${id}`);
//             setCourse(res.data.course);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     React.useEffect(() => {
//         getCourseDetail();
//     }, [id]);

//     if (!course) {
//         return <p className="text-center py-20">Loading...</p>;
//     }

//     return (
//         <section className="bg-[#FBF9F4] min-h-screen py-10 px-5 md:px-20">

//             {/* TOP SECTION */}
//             <div className="grid md:grid-cols-2 gap-10 items-center">

//                 {/* IMAGE */}
//                 <div className="rounded-2xl overflow-hidden shadow-lg">
//                     <img
//                         src={course.thumbnail}
//                         alt={course.title}
//                         className="w-full h-full object-cover"
//                     />
//                 </div>

//                 {/* DETAILS */}
//                 <div className="flex flex-col gap-5">

//                     {/* CATEGORY */}
//                     <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
//                         {course.category}
//                     </span>

//                     {/* TITLE */}
//                     <h1 className="text-3xl font-bold text-gray-900">
//                         {course.title}
//                     </h1>

//                     {/* DESCRIPTION */}
//                     <p className="text-gray-600 text-sm">
//                         {course.description}
//                     </p>

//                     {/* STATS */}
//                     <div className="flex items-center gap-6 text-sm text-gray-500">
//                         <span className="flex items-center gap-2">
//                             <GrChapterAdd /> {course.chapters?.length || 0} Chapters
//                         </span>
//                     </div>

//                     {/* PRICE */}
//                     <div>
//                         {course.pricing.type === "free" ? (
//                             <span className="text-green-600 text-2xl font-bold">
//                                 Free Course
//                             </span>
//                         ) : (
//                             <span className="text-indigo-600 text-2xl font-bold">
//                                 ₹{course.pricing.price}
//                             </span>
//                         )}
//                     </div>

//                     {/* BUTTON */}
//                     <button
//                         onClick={() =>
//                             navigate("/login", {
//                                 state: { from: `/course/${id}` },
//                             })
//                         }
//                         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
//                     >
//                         Enroll Now
//                     </button>
//                 </div>
//             </div>

//             {/* CHAPTERS SECTION */}
//             <div className="mt-14">
//                 <h2 className="text-2xl font-bold mb-6">Course Content</h2>

//                 <div className="bg-white rounded-xl shadow divide-y">
//                     {course.chapters?.map((chapter, index) => (
//                         <div
//                             key={index}
//                             className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
//                         >
//                             <p className="text-sm font-medium text-gray-700">
//                                 {index + 1}. {chapter.title}
//                             </p>
//                             <span className="text-xs text-gray-400">
//                                 {chapter.duration || "—"}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </section >
//     );
// };

// export default CourseDetail;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";
import { GrChapterAdd } from "react-icons/gr";
import { toast } from "react-toastify";

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // ✅ Fetch Course
    const getCourseDetail = async () => {
        try {
            const res = await axios.get(`${Base_Url}/course/${id}`);
            setCourse(res.data.course);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Check Enrollment
    const checkEnrollment = async () => {
        try {
            const res = await axios.get(`${Base_Url}/my-courses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const enrolled = res.data.courses.some(
                (c) => c._id === id
            );

            setIsEnrolled(enrolled);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCourseDetail();

        if (token) {
            checkEnrollment(); // 🔥 important
        }
    }, [id]);

    // ✅ Enroll API (Free Course)
    const enrollCourse = async () => {
        try {
            await axios.post(
                `${Base_Url}/enroll`,
                { courseId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsEnrolled(true);
            toast.success("Enrolled Successfully 🎉");

        } catch (err) {
            console.log(err);
        }
    };

    // 🔥 Main Action Logic
    const handleAction = () => {
        if (!token) {
            navigate("/login", {
                state: {
                    from: `/course/${id}`,
                    courseId: id,
                },
            });
            return;
        }

        if (course.pricing.type === "free") {
            enrollCourse();
        } else {
            navigate(`/payment/course/${id}`);
        }
    };

    if (loading) {
        return <p className="text-center py-20">Loading...</p>;
    }

    return (
        <section className="bg-[#FBF9F4] min-h-screen pb-10 pt-30 px-5 md:px-20">

            {/* TOP SECTION */}
            <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* IMAGE */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col gap-5">

                    {/* CATEGORY */}
                    <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                        {course.category}
                    </span>

                    {/* TITLE */}
                    <h1 className="text-3xl font-bold text-gray-900">
                        {course.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 text-sm">
                        {course.description}
                    </p>

                    {/* STATS */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <GrChapterAdd /> {course.chapters?.length || 0} Chapters
                        </span>
                    </div>

                    {/* PRICE */}
                    <div>
                        {course.pricing.type === "free" ? (
                            <span className="text-green-600 text-2xl font-bold">
                                Free Course
                            </span>
                        ) : (
                            <span className="text-indigo-600 text-2xl font-bold">
                                ₹{course.pricing.price}
                            </span>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => {
                            if (isEnrolled) {
                                navigate(`/learn/${course._id}`);
                            } else {
                                handleAction();
                            }
                        }}
                        className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg
                         ${isEnrolled
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
                                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105"
                            }`}
                    >
                        {isEnrolled
                            ? "Start Learning"
                            : course.pricing.type === "free"
                                ? "Enroll Now"
                                : "Buy Now"}
                    </button>
                </div>
            </div>

            {/* CHAPTERS SECTION */}
            <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>

                <div className="bg-white rounded-xl shadow divide-y">

                    {course.chapters?.map((chapter, index) => (
                        <div
                            key={index}
                            className="p-4 mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm hover:shadow-md transition"
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full text-sm font-bold">
                                        {index + 1}
                                    </div>

                                    <p className="text-base font-semibold text-gray-800">
                                        {chapter.title}
                                    </p>

                                </div>

                                <span className="text-xs bg-white px-3 py-1 rounded-full shadow text-gray-500">
                                    Chapter
                                </span>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
};

export default CourseDetail;