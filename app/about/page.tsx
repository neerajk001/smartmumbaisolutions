"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Lock, FileText, BarChart3, Handshake, Award, Briefcase, TrendingUp, CheckCircle2, PhoneCall } from "lucide-react";
import Image from "next/image";

// Team Members Data
const managers = [
    {
        id: 1,
        name: "Pratik Singh",
        position: "Manager",
        image: "/employee/pratik-photo.jpg",
    },
    {
        id: 2,
        name: "Nazia Khan",
        position: "Manager",
        image: "/employee/nazia-photo.png",
    },
    {
        id: 3,
        name: "Remo Mendes",
        position: "Manager",
        image: "/employee/remo-photo.jpg",
    },
];

const assistantManagers = [
    {
        id: 1,
        name: "Heena Sheikh",
        position: "Assistant Manager",
        image: "/employee/heena-photo.png",
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
        image: "/employee/farhanaz-photo.png",
    },
];

const stats = [
    { label: "Years Experience", value: "6+", icon: Award },
    { label: "Satisfied Clients", value: "10000+", icon: Users },
    { label: "Loans Approved", value: "₹500Cr+", icon: CheckCircle2 },
    { label: "Partner Banks", value: "40+", icon: Handshake },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FCF8F8] font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            <main className="space-y-12 md:space-y-20 pb-20">
                {/* HERO SECTION - RESTRUCTURED AS CARD */}
                <section className="relative w-full md:w-[90%] md:max-w-[1200px] mx-auto mt-6 md:mt-8">
                    <div className="relative overflow-hidden bg-[#0F3866] text-white rounded-2xl shadow-2xl p-10 md:p-20 md:min-h-[550px] flex flex-col justify-center text-center">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-semibold mb-6 tracking-wide">
                                    ESTABLISHED 2022
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                                    Empowering Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                                        Financial Future
                                    </span>
                                </h1>
                                <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
                                    We bridge the gap between your dreams and financial reality with expert loan advisory services.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* STATS SECTION */}
                <section className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
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

                {/* OUR STORY */}
                <section className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="h-[2px] w-12 bg-orange-500"></span>
                                <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">About Smart Solutions</span>
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                We act as a trusted bridge between <span className="text-blue-700">customers & financial partners.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                                <p>
                                    <span className="font-semibold text-gray-900">Smart Solutions</span>, incorporated on 1st July 2022, is a technology-driven financial services company committed to simplifying access to loans and credit solutions for individuals, professionals, and businesses across India.
                                </p>
                                <p>
                                    Since inception, we have focused on building a reliable, transparent, and efficient lending ecosystem powered by technology and deep banking expertise. We combine domain knowledge with smart digital innovation to deliver faster and more accurate loan outcomes.
                                </p>
                                <p>
                                    Our core objective is simple — to make lending transparent, faster, and more reliable, while ensuring customers receive the right financial product based on their profile, eligibility, and financial requirements.
                                </p>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Award className="text-orange-500" /> Our Vision
                                </h3>
                                <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
                                    <p className="text-xl text-blue-900 font-medium italic leading-relaxed">
                                        &quot;To become India’s most trusted digital lending support ecosystem by empowering customers, bankers, and partners through technology, transparency, and operational efficiency.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-orange-500 rounded-3xl opacity-20 blur-lg"></div>
                            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/intro/office-meeting.png"
                                    alt="Office Meeting"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white pr-8">
                                    <div className="text-2xl font-bold mb-2">End-to-End Support</div>
                                    <p className="text-blue-100 font-light opacity-90">
                                        From eligibility evaluation and documentation to approval coordination and disbursement.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* OUR PRODUCTS & PLATFORMS */}
                <section className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Products & Platforms</h2>
                        <p className="text-lg text-gray-600">
                            Leveraging technology to simplify your financial journey.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* LOAN SARATHI */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] transition-all group-hover:bg-blue-500/10"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <a href="https://www.loansarathi.com/" target="_blank" rel="noopener noreferrer">
                                    <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white p-2 border border-blue-50 hover:shadow-md transition-shadow cursor-pointer">
                                        <Image
                                            src="/our-product/loansarathi.png"
                                            alt="Loan Sarathi Logo"
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                </a>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Loan Sarathi</h3>
                                    <p className="text-blue-600 font-medium">Your Loan Guidance Partner</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Loan Sarathi is our flagship loan facilitation platform designed to guide customers throughout their entire loan journey. True to its name, Loan Sarathi acts as a navigator, helping customers choose the most suitable loan product.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Smart loan eligibility assessment",
                                    "Access to multiple banks and NBFCs",
                                    "Personalized product recommendations",
                                    "Reduced turnaround time (TAT)",
                                    "Transparent and compliant processes"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* SMART DIAL */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-[100px] transition-all group-hover:bg-orange-500/10"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white p-2 border border-orange-50">
                                    <Image
                                        src="/our-product/smart-dial.jpg"
                                        alt="Smart Dial Logo"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Smart Dial</h3>
                                    <p className="text-orange-600 font-medium">Intelligent Communication Platform</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Smart Dial is an advanced communication and lead-management solution developed to strengthen engagement. It enables structured follow-ups, efficient call management, and data-driven tracking.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Manage high-volume customer interactions",
                                    "Track leads and case status efficiently",
                                    "Improve response time",
                                    "Maintain accountability and transparency"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* TEAM SECTION */}
                <section className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Meet The Team</h2>
                        <p className="text-xl text-gray-500 max-w-2xl">The dedicated professionals driving your financial success.</p>
                    </div>

                    {/* Managers */}
                    <div className="mb-20">
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
                                    <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg relative bg-white">
                                        <Image
                                            src={manager.image}
                                            alt={manager.name}
                                            fill
                                            className="object-contain transition-transform duration-700 group-hover:scale-110"
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
                                    <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg relative bg-white">
                                        <Image
                                            src={assistant.image}
                                            alt={assistant.name}
                                            fill
                                            className="object-contain transition-transform duration-700 group-hover:scale-110"
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
                </section>
            </main>
            <Footer />
        </div>
    );
}
