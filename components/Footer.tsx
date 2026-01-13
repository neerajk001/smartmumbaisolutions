import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#121212] text-gray-400 py-16 text-sm">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/3d.png"
                                alt="Smart Solutions 3D Logo"
                                width={400}
                                height={150}
                                className="object-contain h-40 w-auto opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="leading-relaxed text-gray-400 max-w-xs">
                            Your trusted partner for all financial needs. We make borrowing simple, transparent, and fast.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-pink-600 transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    {/* Loan Column */}
                    <div>
                        <h3 className="text-orange-500 font-bold text-base mb-6 uppercase tracking-wider">Loan</h3>
                        <ul className="space-y-4">
                            <li><Link href="/loan/personal-loan" className="hover:text-white transition-colors">Personal Loan</Link></li>
                            <li><Link href="/loan/business-loan" className="hover:text-white transition-colors">Business Loan</Link></li>
                            <li><Link href="/loan/home-loan" className="hover:text-white transition-colors">Home Loan</Link></li>
                            <li><Link href="/loan/mortgage-loan" className="hover:text-white transition-colors">Loan Against Property</Link></li>
                            <li><Link href="/loan/education-loan" className="hover:text-white transition-colors">Education Loan</Link></li>
                            <li><Link href="/loan/car-loan" className="hover:text-white transition-colors">Car Loan</Link></li>
                        </ul>
                    </div>

                    {/* Insurance Column */}
                    <div>
                        <h3 className="text-orange-500 font-bold text-base mb-6 uppercase tracking-wider">Insurance</h3>
                        <ul className="space-y-4">
                            <li><Link href="/insurance/health-insurance" className="hover:text-white transition-colors">Health Insurance</Link></li>
                            <li><Link href="/insurance/term-life" className="hover:text-white transition-colors">Term Life Insurance</Link></li>
                            <li><Link href="/insurance/car-insurance" className="hover:text-white transition-colors">Car Insurance</Link></li>
                            <li><Link href="/insurance/bike-insurance" className="hover:text-white transition-colors">Bike Insurance</Link></li>
                            <li><Link href="/insurance/loan-protector" className="hover:text-white transition-colors">Loan Protector</Link></li>
                            <li><Link href="/insurance/emi-protector" className="hover:text-white transition-colors">EMI Protector</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-orange-500 font-bold text-base mb-6 uppercase tracking-wider">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Apply Now</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/calculator" className="hover:text-white transition-colors">Calculators</Link></li>
                            <li><Link href="/calculator?tab=eligibility" className="hover:text-white transition-colors">Check Eligibility</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-orange-500 font-bold text-base mb-6 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <Mail className="text-orange-500 shrink-0" size={20} />
                                <a href="mailto:sales@smartsolutionsmumbai.com" className="hover:text-white transition-colors">sales@smartsolutionsmumbai.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="text-orange-500 shrink-0" size={20} />
                                <a href="tel:+919588833303" className="hover:text-white transition-colors">+91 95888 33303</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="text-orange-500 shrink-0" size={20} />
                                <span>B-203, 204, 205, Lawrence Trade Center, Manikpur Road, Near Madhuram Hotel, Vasai West 401202</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} Smart Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
