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
                    <div className="relative h-[600px] w-full hidden lg:block">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

                        {/* Image 1 - Top Left (Coins/Docs) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 left-0 w-72 h-96 overflow-hidden rounded-lg shadow-2xl border-4 border-white"
                        >
                            <img
                                src="/loan_documents.png"
                                alt="Financial Documents"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Image 2 - Bottom Right (Money Bag/Growth) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-0 right-0 w-72 h-96 overflow-hidden rounded-lg shadow-2xl border-4 border-white z-20"
                        >
                            <img
                                src="/wealth_growth.png"
                                alt="Wealth Growth"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                        </motion.div>

                        {/* Floating Decor Element */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 right-10 w-24 h-24 bg-orange-500 rounded-full opacity-10 blur-xl z-20"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
