"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ApplicationModal from "@/components/forms/ApplicationModal";
import ExpertModal from "@/components/ExpertModal";

interface ProductDetailProps {
    product: {
        title: string;
        slug?: string;
        description: string;
        features: string[];
        metric?: string;
        detail?: string;
        eligibility?: string[];
        documents?: string[];
        faqs?: { question: string; answer: string }[];
    };
    category: "Loan" | "Insurance";
}

export default function ProductDetailLayout({ product, category }: ProductDetailProps) {
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showExpertModal, setShowExpertModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="pt-24 pb-24">
                <div className="container mx-auto px-8 md:px-16 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">

                        {/* Left Side: Scrollable Information */}
                        <div className="lg:col-span-7 space-y-16">

                            {/* Header & Overview */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
                                        {category}
                                    </span>
                                    {product.metric && (
                                        <span className="text-sm text-gray-500 font-medium">
                                            {product.metric}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                                    {product.title}
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
                                    {product.description}
                                </p>

                                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                        Key Benefits
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                        {product.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="text-blue-600 mt-0.5 shrink-0" size={18} />
                                                <span className="text-gray-700 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Eligibility Section (Parallax Fade In) */}
                            {product.eligibility && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
                                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                        <ul className="space-y-4">
                                            {product.eligibility.map((item, index) => (
                                                <li key={index} className="flex items-center gap-3 text-gray-700 border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Documents Section */}
                            {product.documents && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {product.documents.map((doc, index) => (
                                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors flex items-center gap-3">
                                                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                                                    <FileText size={20} />
                                                </div>
                                                <span className="text-gray-700 font-medium text-sm">{doc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* FAQ Section */}
                            {product.faqs && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
                                        {product.faqs.map((faq, index) => (
                                            <div key={index} className="p-6">
                                                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                        </div>

                        {/* Right Side: Sticky Action Card */}
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="sticky top-32"
                            >
                                <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 md:p-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Ready to proceed?
                                    </h3>
                                    <p className="text-gray-500 mb-8">
                                        Get started with your {product.title} application today. Quick, secure, and hassle-free.
                                    </p>

                                    <div className="space-y-4">
                                        <button 
                                            onClick={() => setShowApplicationModal(true)}
                                            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                                        >
                                            Apply Now
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                        </button>

                                        <button 
                                            onClick={() => setShowExpertModal(true)}
                                            className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-semibold py-4 rounded-xl transition-all"
                                        >
                                            Talk to an Expert
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-400 text-center mt-6">
                                        By applying, you agree to our Terms & Conditions and Privacy Policy.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />

            {/* Application Modal */}
            <ApplicationModal
                isOpen={showApplicationModal}
                onClose={() => setShowApplicationModal(false)}
                productType={product.slug || ""}
                productTitle={product.title}
                category={category}
            />

            {/* Expert Modal */}
            <ExpertModal
                isOpen={showExpertModal}
                onClose={() => setShowExpertModal(false)}
            />
        </div>
    );
}
