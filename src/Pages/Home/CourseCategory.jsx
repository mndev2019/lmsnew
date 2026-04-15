import React from "react";
import beginner from "../../assets/Image/beginner.png";
import intermediate from "../../assets/Image/intermediate.png";
import advanced from "../../assets/Image/advanced.png";
import { Link, useNavigate } from "react-router-dom";

const courses = [
    {
        title: "Beginner Courses",
        bg: "from-pink-300 via-purple-200 to-purple-300",
        img: beginner,
    },
    {
        title: "Intermediate Courses",
        bg: "from-yellow-200 via-orange-200 to-orange-300",
        img: intermediate,
    },
    {
        title: "Advanced Courses",
        bg: "from-green-200 via-blue-200 to-blue-300",
        img: advanced,
    },
];

const CourseCategory = () => {
    const navigate = useNavigate("");
    return (
        <section className="lg:py-20 py-10 px-10 bg-[#f9f8f4]">
            {/* Header */}
            <div className="flex justify-between items-center lg:mb-16 mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#716A5C]">
                    Courses
                </h2>
                <Link
                    onClick={()=> navigate('/courses')}
                    className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-black relative group transition-all duration-300"
                >
                    View All Courses

                    {/* Arrow */}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>

                    {/* Animated Underline */}
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link >
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 md:gap-12 gap-8">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer relative rounded-[30px] overflow-hidden transition-all duration-500 hover:-translate-y-4"
                    >
                        {/* Gradient Background */}
                        <div
                            className={`h-72 flex  justify-center bg-gradient-to-br ${course.bg}`}
                        >
                            <img
                                src={course.img}
                                alt={course.title}
                                className="h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Floating Content Card */}
                        <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg rounded-t-[30px] p-6 transition-all duration-500 group-hover:bg-white">

                            <h3 className="text-xl font-semibold tracking-wide">
                                {course.title}
                            </h3>

                            {/* Arrow Animation */}
                            <div className="mt-3 flex items-center gap-2 text-sm font-medium opacity-70 group-hover:opacity-100 transition">
                                <span>Explore</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                                    →
                                </span>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-20 bg-white blur-2xl transition duration-500"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CourseCategory;