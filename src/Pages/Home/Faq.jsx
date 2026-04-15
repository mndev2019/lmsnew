import React from "react";

const faqs = [
    {
        question: "What is LMS Platform?",
        answer:
            "LMS is a modern learning platform where students can access courses, track progress, and learn new skills anytime.",
    },
    {
        question: "Why should I choose this LMS?",
        answer:
            "It offers structured learning paths, expert-led content, and an easy interface to improve your skills efficiently.",
    },
    {
        question: "Are courses free or paid?",
        answer:
            "We offer both free and premium courses depending on the learning level and content depth.",
    },
    {
        question: "Will I get a certificate?",
        answer:
            "Yes, after completing a course you will receive a certificate of completion to showcase your skills.",
    },
];

const Faq = () => {
    return (
        <section className="relative py-10 bg-[#f7f6f2] overflow-hidden">

            {/* 🌈 Background Bubbles */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

            {/* Heading */}
            <div className="relative text-center mb-14">
                <h2 className="md:text-5xl text-4xl font-extrabold text-[#716A5C]">
                    FAQs
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    How Can We Help You?
                </p>
            </div>

            {/* Grid */}
            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

                {faqs.map((item, index) => (
                    <div
                        key={index}
                        className="relative group bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                        {/* Floating Icon */}
                        <div className="absolute -top-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-400 to-green-300 flex items-center justify-center text-white text-xl shadow-lg group-hover:rotate-12 transition">
                            ?
                        </div>

                        <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-3">
                            {item.question}
                        </h3>

                        <p className="text-gray-600 leading-relaxed ">
                            {item.answer}
                        </p>

                        {/* Bottom glow line */}
                        <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-purple-400 to-yellow-300"></div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Faq;