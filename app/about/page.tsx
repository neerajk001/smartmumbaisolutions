"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Lock, FileText, BarChart3, Handshake, Award, Briefcase } from "lucide-react";
import Image from "next/image";

// Team Members Data
const managers = [
    {
        id: 1,
        name: "Pratik Singh",
        position: "Manager",
        image: "/employee/Pratik Photo New.jpg",
    },
    {
        id: 2,
        name: "Nazia Khan",
        position: "Manager",
        image: "/employee/Nazia Photo.png",
    },
    {
        id: 3,
        name: "Remo Mendes",
        position: "Manager",
        image: "/employee/Remo Photo.jpg",
    },
];

const assistantManagers = [
    {
        id: 1,
        name: "Heena Sheikh",
        position: "Assistant Manager",
        image: "/employee/Heena Photo.png",
    },
    {
        id: 2,
        name: "Ashwini Mishra",
        position: "Assistant Manager",
        image: "/employee/ashwini-mishra.jpeg",
    },
    {
        id: 3,
        name: "Farhanaaz Aga",
        position: "Assistant Manager",
        image: "/employee/Farhanaz Photo.png",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* HERO SECTION */}
                <section className="relative h-[160px] md:h-[240px] flex items-center justify-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="/about_us_banner.png"
                            alt="About Us Banner"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10 text-center text-white px-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2"
                        >
                            About Us
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
                        >
                            Your Trusted Financial Advisory Partner
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="h-1 w-24 bg-orange-500 mx-auto mt-4 rounded-full"
                        />
                    </div>
                </section>

                {/* INTRODUCTION SECTION */}
                <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto px-6 md:px-8 lg:px-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <span className="h-[2px] w-12 bg-orange-600"></span>
                                <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">About Smart Solutions</span>
                                <span className="h-[2px] w-12 bg-orange-600"></span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Your Trusted Loan <span className="text-blue-700">Advisory Partner</span>
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-gray-600 font-light leading-relaxed">
                                <p>
                                    At Smart Solutions, we take pride in being a leading loan advisory firm, committed to assisting individuals and businesses in navigating the complex landscape of financial borrowing.
                                </p>
                                <p>
                                    Established in 2018, we have swiftly emerged as a beacon of expertise and reliability in the lending industry. Our mission is to simplify the borrowing process, ensuring that you get the best possible terms tailored to your unique financial situation.
                                </p>
                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-xl font-semibold text-gray-800 italic">
                                        "Empowering your financial journey since 2018"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* OUR TEAM SECTION */}
                <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-6 md:px-8 lg:px-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Users className="text-blue-600" size={32} />
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Our Team</h2>
                            </div>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Meet the experienced professionals dedicated to your financial success
                            </p>
                            <div className="h-1 w-20 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                        </motion.div>

                        {/* Managers Section */}
                        <div className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <Award className="text-blue-600" size={28} />
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Managers</h3>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {managers.map((manager, index) => (
                                    <motion.div
                                        key={manager.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className="relative h-[350px] overflow-hidden">
                                            <Image
                                                src={manager.image}
                                                alt={manager.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-1">{manager.name}</h4>
                                            <p className="text-blue-600 font-semibold">{manager.position}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Assistant Managers Section */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <Briefcase className="text-orange-600" size={28} />
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Assistant Managers</h3>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {assistantManagers.map((assistant, index) => (
                                    <motion.div
                                        key={assistant.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className="relative h-[350px] overflow-hidden">
                                            <Image
                                                src={assistant.image}
                                                alt={assistant.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-1">{assistant.name}</h4>
                                            <p className="text-orange-600 font-semibold">{assistant.position}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHAT SETS US APART */}
                <section className="py-20 md:py-24 bg-white">
                    <div className="container mx-auto px-6 md:px-8 lg:px-24">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
                            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <Users size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    Our team comprises seasoned professionals with extensive expertise in the lending domain. We leverage our knowledge to offer sound advice tailored to your specific needs.
                                </p>
                            </motion.div>

                            {/* Feature 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                                    <Handshake size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Approach</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    We acknowledge that one size doesn't fit all. That's why we take a personalized approach, ensuring that each client receives customized solutions aligned with their circumstances.
                                </p>
                            </motion.div>

                            {/* Feature 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <Lock size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent & Ethical</h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    Transparency and ethical conduct form the cornerstone of our operations. We believe in fostering trust by maintaining the highest standards of integrity and honesty.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* OUR SERVICES */}
                <section className="py-20 md:py-24 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 lg:px-24">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
                            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Loan Consultation</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    Whether it's a personal loan, business loan, mortgage, education loan, or Doctor loan, we provide comprehensive consultation to guide you through the borrowing process.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                                    <BarChart3 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Financial Analysis</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    We conduct in-depth financial analyses to assess your eligibility, recommend suitable loan options, and help optimize your financial portfolio.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="p-8 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                                    <FileText size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Loan Application Support</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    From paperwork to negotiations, we offer full-scale support throughout the loan application process, ensuring a smooth and hassle-free experience.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
