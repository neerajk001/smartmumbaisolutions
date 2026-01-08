"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const categories = [
    "General",
    "Loans",
    "Insurance",
    "Repayment",
];

const faqs = [
    // General
    {
        category: "General",
        question: "How do I apply for a service?",
        answer: "Applying is simple! You can click on the 'Apply' button on any product card, or directly call our expert team. We will guide you through the documentation and process.",
    },
    {
        category: "General",
        question: "What documents are required?",
        answer: "Typically, you'll need ID proof (Aadhar/PAN), address proof, and income proof (ITR/Salary Slips). Specific requirements vary based on the loan or insurance product.",
    },
    {
        category: "General",
        question: "Is my data secure with Smart Solutions?",
        answer: "Absolutely. We use bank-grade encryption to ensure your personal and financial data is 100% secure and never shared without consent.",
    },
    {
        category: "Loans",
        question: "What is the minimum credit score required?",
        answer: "While a score of 750+ is ideal, we have partners who cater to various credit profiles. Contact us for a personalized assessment.",
    },
    // Loans
    {
        category: "Loans",
        question: "What is the maximum loan amount I can get?",
        answer: "The loan amount depends on your income, credit score, and existing liabilities. Our experts can calculate your eligibility instantly.",
    },
    {
        category: "Loans",
        question: "How long does the approval process take?",
        answer: "For personal loans, approval can be as fast as 24 hours. Business and home loans may take 3-5 working days depending on document verification.",
    },
    // Insurance
    {
        category: "Insurance",
        question: "How do I claim my insurance?",
        answer: "In case of a claim, inform our support team immediately. We will assist you in filing the claim with the respective insurance provider and ensure a smooth settlement.",
    },
    {
        category: "Insurance",
        question: "Is medical check-up mandatory for health insurance?",
        answer: "It depends on the policy and your age. Many policies for young individuals don't require a pre-policy medical check-up.",
    },
    // Repayment
    {
        category: "Repayment",
        question: "Can I prepay my loan?",
        answer: "Yes, most loans allow part-payment or foreclosure after a certain period. Charges may apply depending on the lender's policy.",
    },
    {
        category: "Repayment",
        question: "What happens if I miss an EMI?",
        answer: "Missing an EMI can impact your credit score and attract penalty charges. We recommend setting up auto-debit to avoid accidental misses.",
    },
];

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState("General");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

    return (
        <section className="py-16 bg-[#F9FAFB]">
            <div className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Header & Filters */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-sans tracking-tight">
                                FAQs
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Everything you need to know about our services, loan processes, insurance policies, and billing.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setActiveCategory(category);
                                        setOpenIndex(null);
                                    }}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category
                                        ? "bg-black text-white border-black shadow-md"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-800"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Accordion Questions */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="space-y-0">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-200 last:border-0"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between py-4 text-left group"
                                    >
                                        <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {faq.question}
                                        </span>
                                        <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-gray-600 pb-4 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Contact Support Card */}
                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Still have questions?</h4>
                                <p className="text-gray-500 text-sm">
                                    Contact our support team for help!
                                </p>
                            </div>
                            <button className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap text-sm">
                                Contact Support
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
