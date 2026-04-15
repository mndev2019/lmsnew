import React, { useState } from "react";
import { Base_Url } from "../../Api/Base_Url";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrChapterAdd } from "react-icons/gr";
import banner from '../../assets/Image/innerbanner.png'
import InnerBanner from "../../Component/InnerBanner";
import Package from "../Packages/Package";

const Courses = () => {
  const [paidCourses, setPaidCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);

  // 🔥 API CALL
  const getCourses = async () => {
    try {
      const res = await axios.get(`${Base_Url}/courses`);
      const allCourses = res.data.courses;

      // ✅ FILTERING
      const paid = allCourses.filter(
        (course) => course.pricing.type !== "free"
      );

      const free = allCourses.filter(
        (course) => course.pricing.type === "free"
      );

      setPaidCourses(paid);
      setFreeCourses(free);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourses();
  }, []);

  // 🔥 REUSABLE CARD
  const CourseCard = ({ course }) => {
    return (

      <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

          {/* CATEGORY */}
          <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-[10px] font-semibold px-3 py-1 rounded-full shadow">
            {course.category}
          </span>

          {/* PRICE */}
          <span className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {course.pricing.type === "free"
              ? "FREE"
              : `₹${course.pricing.price}`}
          </span>

          {/* HOVER BTN */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Link
              to={`/course/${course._id}`}
              className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition"
            >
              View Course
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col gap-3">

          {/* TITLE */}
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
            {course.title}
          </h3>

          {/* DESC */}
          <p className="text-xs text-gray-500 line-clamp-2">
            {course.description}
          </p>

          {/* CHAPTERS */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
            <GrChapterAdd className="text-[#716A5C] text-lg" />
            {course.chapters?.length || 0} Chapters
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-4">
            {/* PRICE */}
            <div>
              {course.pricing.type === "free" ? (
                <span className="text-green-600 font-bold text-lg">
                  Free
                </span>
              ) : (
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{course.pricing.price}
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              to={`/course/${course._id}`}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <InnerBanner
        title="Our Courses"
        subtitle="Explore industry-ready courses designed to boost your skills and career growth."
        image={banner}
      />
      <section className="bg-white py-12 px-6 md:px-20 font-sans">

        {/* 🔥 PAID COURSES */}
        <div className="mb-10 text-left">
          <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
            Trending Courses
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-yellow-400 rounded-full" />
            <span className="md:text-lg text-md font-medium text-gray-700">
              Certified Self-Paced Learning Programs
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paidCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        {/* 🆓 FREE COURSES */}
        <div className="lg:mt-20 mt-10 mb-10 text-left">
          <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
            Free Courses
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            <span className="md:text-lg text-md font-medium text-gray-700">
              Start Learning for Free
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freeCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        <Package />


      </section>
    </>
  );
};

export default Courses;