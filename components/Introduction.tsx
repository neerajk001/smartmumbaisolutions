"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Introduction() {
    return (
        <section className="relative py-12 md:py-24 bg-transparent overflow-hidden">
            <div className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-[2px] w-12 bg-orange-500"></span>
                            <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">
                                About Smart Solutions
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            We act as a trusted bridge between <span className="text-blue-700">customers & financial partners.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                            <p>
                                <span className="font-semibold text-gray-900">Smart Solutions</span>, incorporated on 1st July 2022, is a technology-driven financial services company committed to simplifying access to loans and credit solutions for individuals, professionals, and businesses across India.
                            </p>
                            <p>
                                Since inception, we have focused on building a reliable, transparent, and efficient lending ecosystem powered by technology and deep banking expertise.
                            </p>
                        </div>

                        <Link href="/about">
                            <button className="bg-[#0F3866] hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors duration-300 shadow-lg">
                                Read More
                            </button>
                        </Link>
                    </motion.div>

                    {/* Right Side: Animated Images */}
                    <div className="relative w-full hidden lg:block h-[500px]">
                        {/* Image 1 - Main Background (Top Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, y: -20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute top-0 right-0 w-4/5 h-80 rounded-3xl shadow-2xl overflow-hidden z-10"
                        >
                            <img
                                src="/intro/ChatGPT Image Jan 6, 2026, 02_51_48 PM.png"
                                alt="Business Meeting"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Image 2 - Overlapping (Bottom Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-40 left-0 w-3/5 h-64 rounded-3xl shadow-2xl overflow-hidden z-20 border-[6px] border-white"
                        >
                            <img
                                src="/intro/ChatGPT Image Jan 6, 2026, 02_57_13 PM.png"
                                alt="Growth and Investment"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Image 3 - Small Detail (Bottom Center/Right) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-0 right-12 w-2/5 h-48 rounded-3xl shadow-2xl overflow-hidden z-30 border-[6px] border-white"
                        >
                            <img
                                src="/intro/ChatGPT Image Jan 6, 2026, 02_58_06 PM.png"
                                alt="Approved Loan Documents"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
