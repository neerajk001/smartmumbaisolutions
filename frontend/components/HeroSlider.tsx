"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import ApplicationModal from "./forms/ApplicationModal";

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ type: string; title: string; category: "Loan" | "Insurance" } | null>(null);

    const slides = [
        {
            id: 1,
            image: "/Hero-images/hero (1).png",
            title: "Planning your dream home?",
            subtitle: "Apply for a Home Loan starting from 7.15% p.a.*",
            primaryButton: "Apply Now",
            features: [
                "Digital Process",
                "Faster Approval Turnaround",
                "Flexible Repayment Options"
            ],
            theme: "amber",
            productType: "home-loan",
            category: "Loan" as "Loan"
        },
        {
            id: 2,
            image: "/Hero-images/hero (3).png",
            title: "Business Capital Made Easy.",
            subtitle: "Fuel your business growth with low-interest loans and quick approvals.",
            primaryButton: "Business Loans",
            theme: "blue",
            productType: "business-loan",
            category: "Loan" as "Loan"
        },
        {
            id: 3,
            image: "/Hero-images/hero (2).png",
            title: "Don't delay your plans.",
            subtitle: "Personal loans to help you achieve your dreams today.",
            primaryButton: "Apply Now",
            features: [
                "Starting from 9.99% ROI.",
                "Flexible tenures up to 7-8 years.",
                "Low EMI options"
            ],
            theme: "purple",
            productType: "personal-loan",
            category: "Loan" as "Loan"
        },
        {
            id: 4,
            image: "/Hero-images/hero.png",
            title: "Instant Personal Loan",
            subtitle: "Quick approval for all your financial needs.",
            primaryButton: "Apply Now",
            features: [
                "Quick Disbursal",
                "Minimal Documentation",
                "No Collateral Required"
            ],
            theme: "orange",
            productType: "personal-loan",
            category: "Loan" as "Loan"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isModalOpen) {
                setCurrent((prev) => (prev + 1) % slides.length);
            }
        }, 5000); // Auto-advance every 5 seconds
        return () => clearInterval(timer);
    }, [slides.length, isModalOpen]);

    const slide = slides[current];

    const handlePrimaryClick = () => {
        if (slide.productType) {
            setModalData({
                type: slide.productType,
                title: slide.title, // Or a specific product title if needed
                category: slide.category
            });
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className="relative w-[90%] max-w-[1200px] mx-auto mt-8 h-[550px] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl group">
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
                        <img
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Dimmed Overlay */}
                        <div className="absolute inset-0 bg-black/50" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white z-10 w-full md:w-3/4 lg:w-1/2">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-6xl font-bold leading-tight mb-4"
                            >
                                {slide.title}
                            </motion.h1>

                            {slide.subtitle && (
                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                    className="text-lg md:text-xl text-gray-200 mb-8"
                                >
                                    {slide.subtitle}
                                </motion.p>
                            )}

                            {slide.features && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="flex flex-col gap-3 mb-8"
                                >
                                    {slide.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-amber-400 font-semibold tracking-wide uppercase text-sm">
                                            <ChevronRight size={20} strokeWidth={3} />
                                            {feature}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                            >
                                <button
                                    onClick={handlePrimaryClick}
                                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20"
                                >
                                    {slide.primaryButton}
                                    <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-300 rounded-full ${index === current
                                ? "w-8 h-2 bg-amber-500"
                                : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow Navigation */}
                <button
                    onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all z-20 hidden md:block"
                >
                    <ChevronLeft size={40} />
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all z-20 hidden md:block"
                >
                    <ChevronRight size={40} />
                </button>
            </div>

            {modalData && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    productType={modalData.type}
                    productTitle={slide.productType === "personal-loan" ? "Personal Loan Application" : modalData.title}
                    category={modalData.category}
                />
            )}
        </>
    );
}
