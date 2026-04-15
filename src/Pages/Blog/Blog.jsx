import React from "react";
import InnerBanner from "../../Component/InnerBanner";
import banner from "../../assets/Image/innerbanner.png";
import image from "../../assets/Image/blog.png";

const blogs = [
    {
        title: "Getting Started with Online Learning",
        category: "Beginner",
        date: "March 20, 2026",
        img: "https://via.placeholder.com/400x250",
    },
    {
        title: "Effective Study Techniques for Students",
        category: "Intermediate",
        date: "March 18, 2026",
        img: "https://via.placeholder.com/400x250",
    },
    {
        title: "How to Stay Consistent While Learning",
        category: "Advanced",
        date: "March 15, 2026",
        img: "https://via.placeholder.com/400x250",
    },
];

const BlogPage = () => {
    return (
        <>
            {/* Banner */}
            <InnerBanner
                title="Our Blogs"
                subtitle="Stay updated with the latest insights, trends, expert tips, and valuable learning resources to boost your knowledge and skills."
                image={banner}
            />

            {/* Main Section */}
            <section className="relative py-8 md:py-10 px-4 md:px-6 overflow-hidden bg-[#F3F1EC]">

                {/* 🌿 Soft Warm Bubbles */}
                <div className="absolute top-5 left-5 w-24 h-24 md:w-40 md:h-40 bg-[#e7e3dc] opacity-60 rounded-full blur-3xl"></div>
                <div className="absolute bottom-5 right-5 w-32 h-32 md:w-52 md:h-52 bg-[#ddd7cf] opacity-60 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 md:w-60 md:h-60 bg-[#ebe7df] opacity-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

                {/* Hero */}
                <div className="relative text-center max-w-3xl mx-auto mb-10 md:mb-16 z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-800">
                        Insights, Ideas & Learning Resources
                    </h1>
                    <p className="mt-3 md:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
                        Explore articles, guides and updates designed to support your learning journey.
                    </p>
                </div>

                {/* Featured Blog */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center bg-[#ffffffb3] border border-[#e5e2dc] rounded-2xl md:rounded-[30px] p-4 md:p-10 shadow-sm hover:shadow-md transition duration-500">

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl group">
                        <img
                            src={image}
                            className="w-full h-[220px] sm:h-[260px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                            alt="featured blog"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-xs tracking-widest uppercase text-gray-400">
                            Featured Article
                        </span>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2 md:mt-3 leading-snug text-gray-800">
                            The Ultimate Guide to Getting Started with Online Learning
                        </h2>

                        <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">
                            Discover practical tips, structured learning paths and essential strategies to help you make the most of your learning experience.
                        </p>

                        {/* Link */}
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 mt-4 md:mt-6 text-sm font-semibold relative group text-gray-800"
                        >
                            Read Article
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>

                            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gray-800 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        </a>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="relative z-10 mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl md:rounded-[25px] overflow-hidden bg-[#ffffffb3] border border-[#e5e2dc] shadow-sm hover:shadow-lg transition duration-500 cursor-pointer hover:-translate-y-1 md:hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.img}
                                    className="h-44 sm:h-48 md:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    alt={blog.title}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                <span className="text-xs text-gray-500">
                                    {blog.category} • {blog.date}
                                </span>

                                <h3 className="mt-2 md:mt-3 text-base md:text-lg font-semibold leading-snug text-gray-800">
                                    {blog.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-600 mt-1 md:mt-2">
                                    Explore insights, tips and practical knowledge to enhance your learning experience.
                                </p>

                                {/* Read Link */}
                                <div className="mt-3 md:mt-4 flex items-center gap-2 text-sm font-medium text-gray-800 group-hover:gap-3 transition-all duration-300">
                                    <span>Read</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default BlogPage;