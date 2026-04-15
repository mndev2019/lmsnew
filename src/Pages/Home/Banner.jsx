import React from 'react'
import image from "../../assets/Image/bannerimg.png"
import robot from "../../assets/Image/robot.png"

const Banner = () => {
    return (
        <>
            <section className="pt-24  bg-[#716A5C] text-[#F3F1EC] font-sans selection:bg-yellow-400 selection:text-[#F3F1EC] py-0">

                {/* --- HERO SECTION --- */}
                <main className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:pl-22 lg:pt-0 pt-5 ">

                    {/* Left: Heading & Rocket Illustration */}
                    <div className="w-full lg:w-1/2  ">
                        <h1 className=" mb-12 text-4xl md:text-[42px] font-extrabold leading-[1.1] mb-8">
                            Boost Your <br />
                            <span className="text-yellow-400 decoration-4 underline-offset-8">Investing</span> <br />
                            Knowledge.
                        </h1>

                        {/* Decorative Rocket/Coins - Use your actual image asset here */}
                        <div className="w-64 md:w-80 opacity-90 animate-pulse ">
                            <img
                                src={robot}
                                alt="Investing Growth"
                                className="rounded-lg mix-blend-screen"
                            />
                        </div>
                    </div>

                    {/* Middle: Syllabus Breakdown */}
                    <div className="w-full lg:w-2/5 space-y-6 pt-5">
                        <div className="inline-block bg-yellow-400 text-black font-bold px-3 py-1 text-lg uppercase rounded-[2px]">
                            3 Levels. 8 Courses. 1 Mission.
                        </div>

                        <div className="grid gap-4">

                            {/* Beginner */}
                            <section>
                                <button className="text-yellow-400 rounded-[2px] font-semibold text-lg tracking-widest border-1 px-2 border-yellow-400 inline-block mb-2 uppercase">
                                    Beginner
                                </button>
                                <ul className="text-md text-[#F3F1EC] font-medium">
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Introduction to the subject.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Understanding fundamental concepts.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Building a strong foundation.</li>
                                </ul>
                            </section>

                            {/* Intermediate */}
                            <section>
                                <button className="text-yellow-400 rounded-[2px] font-semibold text-lg tracking-widest border-1 px-2 border-yellow-400 inline-block mb-2 uppercase">
                                    Intermediate
                                </button>
                                <ul className="text-md text-[#F3F1EC] font-medium">
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Practical applications and real-world use.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Developing problem-solving skills.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Hands-on learning with guided projects.</li>
                                </ul>
                            </section>

                            {/* Advanced */}
                            <section>
                                <button className="text-yellow-400 rounded-[2px] font-semibold text-lg tracking-widest border-1 px-2 border-yellow-400 inline-block mb-2 uppercase">
                                    Advanced
                                </button>
                                <ul className="text-md text-[#F3F1EC] font-medium">
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Mastering advanced concepts and techniques.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Working on complex real-world scenarios.</li>
                                    <li className="flex items-center"><span className="text-yellow-400 mr-2">•</span> Achieving expertise and career readiness.</li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* Right: Instructor (Positioned absolutely on large screens to mimic image) */}
                    <div className="lg:w-2/5">
                        <img
                            src={image}
                            alt="Instructor"
                            className="max-h-[60vh] lg:max-h-[75vh] object-contain grayscale-0 hover:grayscale transition-all duration-500"
                        />
                    </div>
                </main>
            </section>
        </>
    )
}

export default Banner
