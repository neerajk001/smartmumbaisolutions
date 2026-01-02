"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, Send, User, MessageSquare, Briefcase, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const inputs = [
        { id: "firstName", label: "First Name", icon: User, type: "text", placeholder: "John" },
        { id: "lastName", label: "Last Name", icon: User, type: "text", placeholder: "Doe" },
        { id: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "john@example.com" },
        { id: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
        { id: "company", label: "Company Name", icon: Briefcase, type: "text", placeholder: "Your Company Ltd." },
        { id: "loanType", label: "Interest", icon: FileText, type: "text", placeholder: "Personal Loan, Insurance..." },
    ];

    return (
        <section className="relative py-20 bg-gray-50 overflow-hidden" id="contact">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-900 to-slate-900 clip-path-slant" style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)" }}></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 text-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let's Start a Conversation</h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Have questions about our financial solutions? Our team of experts is ready to help you navigate your financial journey with confidence.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Contact Info Side */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                                Contact Details
                            </h3>

                            <div className="space-y-6">
                                <InfoItem
                                    icon={Phone}
                                    title="Call Us"
                                    content={
                                        <a href="tel:+919588833303" className="hover:text-blue-600 transition-colors">
                                            +91 95888 33303
                                        </a>
                                    }
                                />
                                <InfoItem
                                    icon={Mail}
                                    title="Email Us"
                                    content={
                                        <div className="flex flex-col">
                                            <a href="mailto:sales@smartsolutionsmumbai.com" className="hover:text-blue-600 transition-colors">sales@smartsolutionsmumbai.com</a>
                                            <a href="mailto:sales@ssolutions.com" className="hover:text-blue-600 transition-colors">sales@ssolutions.com</a>
                                        </div>
                                    }
                                />
                                <InfoItem
                                    icon={Clock}
                                    title="Business Hours"
                                    content="Mon – Sat: 10:00 AM – 6:30 PM"
                                />
                                <InfoItem
                                    icon={MapPin}
                                    title="Visit Us"
                                    content="B-101, Lawrence Trade Center, Vasai West, 401202"
                                />
                            </div>
                        </motion.div>

                        {/* Map Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.659992067755!2d72.82654497597157!3d19.383866981886105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aec0a4b09b2b%3A0x6d859c4708764b3d!2sLawrence%20Trade%20Center!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </motion.div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50"></div>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                                <p className="text-gray-500 mb-10">Fill out the form below and we will get back to you shortly.</p>

                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {inputs.map((input) => (
                                            <div key={input.id} className={input.id === 'email' || input.id === 'loanType' || input.id === 'company' ? 'col-span-2 md:col-span-1' : ''}>
                                                <div className="relative group">
                                                    <label
                                                        htmlFor={input.id}
                                                        className={`absolute left-0 transition-all duration-300 pointer-events-none 
                                                            ${focusedInput === input.id || (document.getElementById(input.id) as HTMLInputElement)?.value
                                                                ? '-top-6 text-xs text-blue-600 font-semibold'
                                                                : 'top-3 text-gray-400'}`}
                                                    >
                                                        {input.label}
                                                    </label>
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type={input.type}
                                                            id={input.id}
                                                            placeholder={focusedInput === input.id ? input.placeholder : ''}
                                                            onFocus={() => setFocusedInput(input.id)}
                                                            onBlur={(e) => !e.target.value && setFocusedInput(null)}
                                                            className="w-full bg-transparent border-b-2 border-gray-200 py-3 pr-4 focus:border-blue-600 outline-none transition-colors"
                                                        />
                                                        <input.icon className={`absolute right-0 w-5 h-5 transition-colors ${focusedInput === input.id ? 'text-blue-600' : 'text-gray-300'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="relative mt-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us more about your requirements..."
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <span>Submit Request</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function InfoItem({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-1">{title}</h4>
                <div className="text-gray-600 font-medium leading-relaxed">
                    {content}
                </div>
            </div>
        </div>
    );
}
