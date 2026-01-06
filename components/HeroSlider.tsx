"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/Hero-images/hero-latest-1.png",
        title: "Business Capital Made Easy.",
        subtitle: "Fuel your business growth with low-interest loans and quick approvals. No hidden charges, just pure growth.",
        primaryButton: "Business Loans",
        secondaryButton: "Contact Us",
        theme: "blue"
    },
    {
        id: 2,
        image: "/Hero-images/hero-latest-2.png",
        title: "Trusted Insurance For Your Family.",
        subtitle: "Comprehensive coverage that actually pays out when you need it. Life, Health, and General Insurance tailored for you.",
        primaryButton: "Get Insured",
        secondaryButton: "View Plans",
        theme: "green"
    },
    {
        id: 3,
        image: "/Hero-images/hero-latest-3.png",
        title: "Your Dream Home Awaits.",
        subtitle: "Competitive interest rates and flexible tenures for your perfect home. Making home ownership a reality.",
        primaryButton: "Home Loans",
        secondaryButton: "Check Eligibility",
        theme: "purple"
    },
    {
        id: 4,
        image: "/Hero-images/hero-latest-4.png",
        title: "Invest in Your Future.",
        subtitle: "Education loans that empower your dreams. Partial coverage, full coverage, and global opportunities.",
        primaryButton: "Education Loans",
        secondaryButton: "Apply Now",
        theme: "indigo"
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // Auto-advance every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const slide = slides[current];

    return (
        <div className="relative w-[90%] max-w-[1200px] mx-auto mt-8 h-[550px] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Main Image - Stretched to fit container */}
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: '100% 100%'
                        }}
                    />


                    {/* Content - Removed */}

                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                            ? "bg-blue-500 w-8"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Optional: Arrow Navigation */}
            <button
                onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-all z-20 hidden md:block"
            >
                <ChevronLeft size={40} />
            </button>
            <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-all z-20 hidden md:block"
            >
                <ChevronRight size={40} />
            </button>
        </div>
    );
}
