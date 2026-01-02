"use client";

import Link from "next/link";
import { useState } from "react";
import ExpertModal from "./ExpertModal";
import {
    ShieldCheck,
    ChevronDown,
    HandCoins,
    Briefcase,
    Home,
    Building2,
    GraduationCap,
    Car,
    HeartPulse,
    Shield,
    Bike,
    FileText
} from "lucide-react";

export default function Navbar() {
    const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-2.5 z-50 w-[95%] max-w-[1400px] mx-auto rounded-xl flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-md border border-gray-200 supports-[backdrop-filter]:bg-white/60">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="text-blue-900">
                        <ShieldCheck size={32} strokeWidth={2.5} fill="currentColor" className="text-blue-900" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                        Smart Solutions
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <Link href="/" className="hover:text-blue-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-blue-900 transition-colors">
                        About Us
                    </Link>

                    {/* Loans Dropdown */}
                    <div className="group relative">
                        <button className="flex items-center gap-1 hover:text-blue-900 transition-colors focus:outline-none py-2">
                            Loans
                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid grid-cols-3 gap-2 overflow-hidden">
                                <Link href="/loan/personal" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0">
                                        <HandCoins size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Personal Loan</span>
                                </Link>
                                <Link href="/loan/business" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Business Loan</span>
                                </Link>
                                <Link href="/loan/home" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                                        <Home size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Home Loan</span>
                                </Link>
                                <Link href="/loan/property" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                                        <Building2 size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Loan Against Property</span>
                                </Link>
                                <Link href="/loan/education" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0">
                                        <GraduationCap size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Education Loan</span>
                                </Link>
                                <Link href="/loan/car" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                                        <Car size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Car Loan</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Insurance Dropdown */}
                    <div className="group relative">
                        <button className="flex items-center gap-1 hover:text-blue-900 transition-colors focus:outline-none py-2">
                            Insurance
                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid grid-cols-3 gap-2 overflow-hidden">
                                <Link href="/insurance/health" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                                        <HeartPulse size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Health Insurance</span>
                                </Link>
                                <Link href="/insurance/term" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
                                        <Shield size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Term Life</span>
                                </Link>
                                <Link href="/insurance/car" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                                        <Car size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Car Insurance</span>
                                </Link>
                                <Link href="/insurance/bike" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0">
                                        <Bike size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Bike Insurance</span>
                                </Link>
                                <Link href="/insurance/protector" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Loan Protector</span>
                                </Link>
                                <Link href="/insurance/emi" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">EMI Protector</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/gallery" className="hover:text-blue-900 transition-colors">
                        Gallery
                    </Link>
                    <Link href="/contact" className="hover:text-blue-900 transition-colors">
                        Contact
                    </Link>
                    <Link href="/calculator" className="hover:text-blue-900 transition-colors">
                        Calculator
                    </Link>
                </div>

                {/* CTA Button */}
                <div>
                    <button
                        onClick={() => setIsExpertModalOpen(true)}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-sm font-medium transition-all shadow-lg hover:shadow-xl text-sm transform hover:-translate-y-0.5"
                    >
                        Talk to Expert
                    </button>
                </div>
            </nav>
            <ExpertModal isOpen={isExpertModalOpen} onClose={() => setIsExpertModalOpen(false)} />
        </>
    );
}



