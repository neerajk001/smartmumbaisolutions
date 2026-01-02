"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Percent, Headset, Banknote, Briefcase } from "lucide-react";

const features = [
    {
        icon: <Clock size={32} />,
        title: "Quick Approval",
        description: "Experience lightning-fast loan approvals with our streamlined digital process.",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: <Percent size={32} />,
        title: "Low Interest Rates",
        description: "We partner with top banks to offer you the most competitive interest rates in the market.",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Secure & Transparent",
        description: "Your data security is our priority. No hidden charges, just 100% transparency.",
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: <Headset size={32} />,
        title: "Expert Support",
        description: "Our financial experts are available 24/7 to guide you through every step.",
        color: "bg-orange-100 text-orange-600",
    },
    {
        icon: <Banknote size={32} />,
        title: "Unsecured Loans",
        description: "Get funding without collateral. Hassle-free unsecured loans for your needs.",
        color: "bg-red-100 text-red-600",
    },
    {
        icon: <Briefcase size={32} />,
        title: "Any Loan Type",
        description: "From personal to business loans, we have a solution for every financial requirement.",
        color: "bg-teal-100 text-teal-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
                            Why Choose Us
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-gray-900">
                            Smart Financial Decisions Start Here
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
