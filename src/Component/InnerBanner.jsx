import React from 'react'
import shape from '../assets/Image/shape.png'
import { useNavigate } from 'react-router-dom'

const InnerBanner = (props) => {
    const navigate = useNavigate("");

    return (
        <>
            <section className='bg-[#F3F1EC] px-4 sm:px-6 md:px-10 md:pt-20 pt-30'>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
                        
                        {/* Left Content */}
                        <div>
                            <div className="w-full space-y-4 text-center md:text-left">
                                
                                <h2 className='inria text-[#494743] font-bold text-[28px] sm:text-[36px] md:text-[50px] leading-tight'>
                                    {props.title}
                                </h2>

                                <p className='text-[#494743] text-[14px] sm:text-[16px] md:text-[18px] tracking-wide sm:tracking-widest noto'>
                                    {props.subtitle}
                                </p>

                                <div>
                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="px-6 sm:px-7 py-2 rounded-full hover:bg-[#e6c800] transition font-medium bg-[#EACF00] text-black noto text-sm sm:text-base"
                                    >
                                        Get In Touch
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Right Image */}
                        <div>
                            <div className="w-full flex justify-center md:justify-end">
                                <img 
                                    src={props.image} 
                                    alt="banner"
                                    className="w-[80%] sm:w-[70%] md:w-full max-w-[400px] md:max-w-full"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Shape */}
            <section>
                <div className='w-full'>
                    <img src={shape} alt="shape" className='w-full object-cover' />
                </div>
            </section>
        </>
    )
}

export default InnerBanner