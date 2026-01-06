"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Lock, FileText, BarChart3, Handshake, Award, Briefcase, TrendingUp, CheckCircle2 } from "lucide-react";
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

const stats = [
    { label: "Years Experience", value: "6+", icon: Award },
    { label: "Satisfied Clients", value: "2500+", icon: Users },
    { label: "Loans Approved", value: "₹500Cr+", icon: CheckCircle2 },
    { label: "Partner Banks", value: "40+", icon: Handshake },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main>
                {/* MODERN HERO SECTION */}
                <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden bg-[#0F3866] text-white rounded-b-[4rem] z-10">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-semibold mb-6 tracking-wide">
                                ESTABLISHED 2018
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                                Empowering Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                                    Financial Future
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
                                We bridge the gap between your dreams and financial reality with expert loan advisory services.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* STATS OVERLAY SECTION */}
                <section className="relative z-20 -mt-24 container mx-auto px-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-12"
                    >
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-gray-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    <div className="mb-4 p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <stat.icon size={28} />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* OUR STORY / MISSION */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 md:px-12 lg:px-24">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="h-[2px] w-12 bg-orange-500"></span>
                                    <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">Who We Are</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                    Your Trusted Partner in <span className="text-blue-700">Financial Growth</span>
                                </h2>
                                <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                                    <p>
                                        At <span className="font-semibold text-gray-900">Smart Solutions</span>, we take pride in being a leading loan advisory firm. Established in 2018, we have swiftly emerged as a beacon of expertise and reliability in the lending industry.
                                    </p>
                                    <p>
                                        Our mission is simple: to simplify the complex landscape of borrowing. Whether you are an individual looking for a home loan or a business seeking expansion capital, we ensure you get terms tailored to your unique situation.
                                    </p>
                                </div>
                                <div className="mt-10 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
                                    <p className="text-xl text-blue-900 font-medium italic">
                                        "Transparency and integrity are not just values for us; they are the foundation of every client relationship we build."
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-3xl opacity-20 blur-lg"></div>
                                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/intro/ChatGPT Image Jan 6, 2026, 02_51_48 PM.png"
                                        alt="Office Meeting"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <div className="text-3xl font-bold mb-1">2000+</div>
                                        <div className="text-blue-200">Happy Families & Businesses</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* VALUES / FEATURES */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 md:px-12 lg:px-24">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
                            <p className="text-lg text-gray-600">
                                We don't just find you a loan; we engineer the perfect financial solution for your specific needs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Users, title: "Expert Guidance", desc: "Seasoned professionals with deep domain expertise providing sound, tailored advice.", color: "text-blue-600", bg: "bg-blue-50" },
                                { icon: Handshake, title: "Personalized Approach", desc: "Customized solutions aligned with your unique financial circumstances—because one size doesn't fit all.", color: "text-orange-600", bg: "bg-orange-50" },
                                { icon: Lock, title: "Transparent & Ethical", desc: "Total transparency and ethical conduct are the cornerstones of our operations.", color: "text-green-600", bg: "bg-green-50" }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                                >
                                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TEAM SECTION */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 opacity-50 z-0"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Meet The Team</h2>
                            <p className="text-xl text-gray-500 max-w-2xl">The dedicated professionals driving your financial success.</p>
                        </div>

                        {/* Managers */}
                        <div className="mb-24">
                            <div className="flex items-center gap-3 mb-10">
                                <span className="p-2 bg-blue-100 rounded-lg text-blue-700"><Award size={24} /></span>
                                <h3 className="text-2xl font-bold text-gray-900">Leadership</h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {managers.map((manager, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative"
                                    >
                                        <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                                            <Image
                                                src={manager.image}
                                                alt={manager.name}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <h4 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">{manager.name}</h4>
                                                <p className="text-blue-300 font-medium">{manager.position}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Asst Managers */}
                        <div>
                            <div className="flex items-center gap-3 mb-10">
                                <span className="p-2 bg-orange-100 rounded-lg text-orange-700"><Users size={24} /></span>
                                <h3 className="text-2xl font-bold text-gray-900">Key Members</h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {assistantManagers.map((assistant, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative"
                                    >
                                        <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                                            <Image
                                                src={assistant.image}
                                                alt={assistant.name}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 bg-gray-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                                <h4 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">{assistant.name}</h4>
                                                <p className="text-orange-300 font-medium">{assistant.position}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
