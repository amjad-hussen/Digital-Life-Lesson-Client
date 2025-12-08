import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/Banner/banner1.jpg'
import banner2 from '../../assets/Banner/banner2.jpeg'
import banner3 from '../../assets/Banner/banner3.webp'
import banner4 from '../../assets/Banner/banner4.webp'
import banner5 from '../../assets/Banner/banner5.webp'

const slides = [
    {
        img: banner1,
        title: "Start Writing Your Wisdom",
        desc: "Capture and organize your meaningful life lessons for personal growth."
    },
    {
        img: banner2,
        title: "Organize Your Life Lessons",
        desc: "Keep your valuable experiences structured in one place."
        
    },
    {
        img: banner3,
        title: "Read, Reflect & Improve",
        desc: "Discover meaningful lessons shared by others."
    },
    {
        img: banner4,
        title: "Grow Together With Shared Wisdom",
        desc: "Share your journey and learn from a community.",
    },
    {
        img: banner5,
        title: "A New Dawn, A New Lesson",
        desc: "Every sunrise brings a new opportunity to learn and inspire."
    }
];

const Banner = () => {
    return (
        <div>
            <div className="w-full my-5 px-10 ">
                <Carousel
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    showThumbs={false}
                    showStatus={false}
                    showArrows={true}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="relative">
                            
                            <img
                                src={slide.img}
                                className="w-full rounded-xl h-[250px] md:h-[480px] object-cover "
                            />

                            
                            <div
                                className="absolute rounded-xl inset-0"
                                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                            ></div>

                            
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white md:px-4 ">
                                <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-sm md:text-lg max-w-2xl mx-auto drop-shadow-lg">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>


        </div>
    );
};

export default Banner;