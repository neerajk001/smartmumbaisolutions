"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Introduction() {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
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
                            <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
                                Introducing Smart Solutions
                            </span>
                            <span className="h-[2px] w-12 bg-blue-600"></span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Your Trusted Loan <br />
                            <span className="text-blue-700">Advisory Partner</span>
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                            At Smart Solutions, we take pride in being a leading loan advisory firm, committed to assisting individuals and businesses in navigating the complex landscape of financial borrowing.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                            Established in 2018, we have swiftly emerged as a beacon of expertise and reliability in the lending industry.
                        </p>

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
