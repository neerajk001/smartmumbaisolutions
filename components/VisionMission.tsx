"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function VisionMission() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0 space-y-32">

                {/* Mission Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-2 block">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            To empower individuals and businesses by providing accessible, transparent, and tailored financial solutions. We strive to simplify the lending process, ensuring that every client can achieve their financial goals with confidence and ease.
                        </p>
                        <Link href="/about">
                            <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1">
                                LEARN MORE
                            </button>
                        </Link>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop"
                            alt="Our Mission - Team Work"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>


                {/* Vision Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Collage Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full"
                    >
                        <div className="absolute top-0 left-0 w-[45%] h-[65%] rounded-[30px] overflow-hidden shadow-xl z-10 bg-gray-100">
                            <Image
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
                                alt="Vision 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-[20%] w-[45%] h-[60%] rounded-[30px] overflow-hidden shadow-xl z-20 bg-gray-100 border-4 border-white">
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                                alt="Vision 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute top-[10%] right-0 w-[40%] h-[55%] rounded-[30px] overflow-hidden shadow-xl z-0 bg-gray-100 opacity-90">
                            <Image
                                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop"
                                alt="Vision 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-2 block">
                            What We Do
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                            Our Vision
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            To be the most trusted and innovative financial advisory partner in India, recognized for our commitment to customer success, integrity, and excellence in service. We envision a future where financial freedom is within everyone's reach.
                        </p>
                        <Link href="/about">
                            <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1">
                                LEARN MORE
                            </button>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
