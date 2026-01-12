"use client";

import Link from "next/link";
import Image from "next/image";
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
    FileText,
    Menu,
    X
} from "lucide-react";

export default function Navbar() {
    const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full md:w-[90%] md:max-w-[1200px] md:mx-auto md:top-2.5 rounded-none md:rounded-xl flex items-center justify-between px-4 md:px-8 h-20 md:overflow-visible overflow-hidden bg-white/80 backdrop-blur-md shadow-md border-x-0 md:border border-gray-200 supports-[backdrop-filter]:bg-white/60">
                {/* Logo Section */}
                <Link href="/" onClick={scrollToTop} className="flex items-center h-full">
                    <Image
                        src="/logo1.png"
                        alt="Smart Solutions Logo"
                        width={160}
                        height={160}
                        className="object-contain h-14 md:h-16 w-auto"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <Link href="/" onClick={scrollToTop} className="hover:text-blue-900 transition-colors">
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid grid-cols-3 gap-2 overflow-hidden transition-all duration-200">
                                <Link href="/loan/personal-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/PersonalLoan.png" alt="Personal Loan" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Personal Loan</span>
                                </Link>
                                <Link href="/loan/business-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/BusinessLoan.png" alt="Business Loan" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Business Loan</span>
                                </Link>
                                <Link href="/loan/home-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/HomeLoan (2).png" alt="Home Loan" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Home Loan</span>
                                </Link>
                                <Link href="/loan/mortgage-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/LAP (2).png" alt="Loan Against Property" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Loan Against Property</span>
                                </Link>
                                <Link href="/loan/education-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/EducationLoan.png" alt="Education Loan" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Education Loan</span>
                                </Link>
                                <Link href="/loan/car-loan" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/CarLoan (2).png" alt="Car Loan" width={40} height={40} className="object-contain" />
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid grid-cols-3 gap-2 overflow-hidden transition-all duration-200">
                                <Link href="/insurance/health-insurance" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/HealthInsurance.png" alt="Health Insurance" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Health Insurance</span>
                                </Link>
                                <Link href="/insurance/term-life" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/terminsurance.png" alt="Term Life" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Term Life</span>
                                </Link>
                                <Link href="/insurance/car-insurance" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/CarInsurance.png" alt="Car Insurance" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Car Insurance</span>
                                </Link>
                                <Link href="/insurance/bike-insurance" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/BikeInsurance.png" alt="Bike Insurance" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Bike Insurance</span>
                                </Link>
                                <Link href="/insurance/loan-protector" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/LoanProtector.png" alt="Loan Protector" width={40} height={40} className="object-contain" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm">Loan Protector</span>
                                </Link>
                                <Link href="/insurance/emi-protector" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    <div className="w-10 h-10 shrink-0">
                                        <Image src="/card-logos/EMI Protector.png" alt="EMI Protector" width={40} height={40} className="object-contain" />
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

                {/* CTA Button - Desktop */}
                <div className="hidden md:block">
                    <button
                        onClick={() => setIsExpertModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-sm font-medium transition-all shadow-lg hover:shadow-xl text-sm transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        Talk to Expert
                    </button>
                </div>

                {/* Hamburger Menu Button - Mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-md md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full overflow-y-auto px-6 py-4">
                    <Link
                        href="/"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            scrollToTop();
                        }}
                        className="py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors border-b border-gray-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors border-b border-gray-200"
                    >
                        About Us
                    </Link>

                    {/* Loans Dropdown - Mobile */}
                    <div className="border-b border-gray-200">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "loans" ? null : "loans")}
                            className="w-full flex items-center justify-between py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors"
                        >
                            Loans
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${openDropdown === "loans" ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openDropdown === "loans" && (
                            <div className="pl-4 pb-2 space-y-2">
                                <Link
                                    href="/loan/personal-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/PersonalLoan.png" alt="Personal Loan" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Personal Loan</span>
                                </Link>
                                <Link
                                    href="/loan/business-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/BusinessLoan.png" alt="Business Loan" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Business Loan</span>
                                </Link>
                                <Link
                                    href="/loan/home-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/HomeLoan (2).png" alt="Home Loan" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Home Loan</span>
                                </Link>
                                <Link
                                    href="/loan/mortgage-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/LAP (2).png" alt="Loan Against Property" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Loan Against Property</span>
                                </Link>
                                <Link
                                    href="/loan/education-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/EducationLoan.png" alt="Education Loan" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Education Loan</span>
                                </Link>
                                <Link
                                    href="/loan/car-loan"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/CarLoan (2).png" alt="Car Loan" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Car Loan</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Insurance Dropdown - Mobile */}
                    <div className="border-b border-gray-200">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "insurance" ? null : "insurance")}
                            className="w-full flex items-center justify-between py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors"
                        >
                            Insurance
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${openDropdown === "insurance" ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openDropdown === "insurance" && (
                            <div className="pl-4 pb-2 space-y-2">
                                <Link
                                    href="/insurance/health-insurance"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/HealthInsurance.png" alt="Health Insurance" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Health Insurance</span>
                                </Link>
                                <Link
                                    href="/insurance/term-life"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/terminsurance.png" alt="Term Life" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Term Life</span>
                                </Link>
                                <Link
                                    href="/insurance/car-insurance"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/CarInsurance.png" alt="Car Insurance" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Car Insurance</span>
                                </Link>
                                <Link
                                    href="/insurance/bike-insurance"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/BikeInsurance.png" alt="Bike Insurance" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Bike Insurance</span>
                                </Link>
                                <Link
                                    href="/insurance/loan-protector"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/LoanProtector.png" alt="Loan Protector" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>Loan Protector</span>
                                </Link>
                                <Link
                                    href="/insurance/emi-protector"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-blue-900 transition-colors"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <Image src="/card-logos/EMI Protector.png" alt="EMI Protector" width={32} height={32} className="object-contain" />
                                    </div>
                                    <span>EMI Protector</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/gallery"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors border-b border-gray-200"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors border-b border-gray-200"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/calculator"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-3 text-gray-700 font-medium hover:text-blue-900 transition-colors border-b border-gray-200"
                    >
                        Calculator
                    </Link>

                    {/* Talk to Expert Button - Mobile */}
                    <button
                        onClick={() => {
                            setIsExpertModalOpen(true);
                            setIsMobileMenuOpen(false);
                        }}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-sm font-medium transition-all shadow-lg text-sm"
                    >
                        Talk to Expert
                    </button>
                </div>
            </div>

            <ExpertModal isOpen={isExpertModalOpen} onClose={() => setIsExpertModalOpen(false)} />
        </>
    );
}



