"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowUpRight
} from "lucide-react";
import { loans, insurances } from "@/lib/products";
import { useState } from "react";
import ApplicationModal from "@/components/forms/ApplicationModal";

const ProductCard = ({ product, index, category, onApplyClick }: { product: any, index: number, category: string, onApplyClick: () => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-[24px] shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden border border-gray-100"
    >
        <div className="flex gap-4 p-5 w-full h-full">
            {/* Left Column: Badge & Icon */}
            <div className="flex flex-col gap-3 items-start">
                <span className="bg-[#FFF0EB] text-[#9B2C2C] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    {product.metric}
                </span>
                <div className="bg-white p-2 rounded-2xl w-16 h-16 flex items-center justify-center shadow-sm border border-gray-100">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <product.icon className="text-[#F8B656]" strokeWidth={2} size={32} />
                    )}
                </div>
            </div>

            {/* Right Column: Text & CTA */}
            <div className="flex flex-col justify-between flex-1 py-1">
                <Link href={`/${category}/${product.slug}`} className="cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-800 font-medium opacity-90">
                        {product.detail}
                    </p>
                </Link>

                <div className="mt-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onApplyClick();
                        }}
                        className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white text-xs font-semibold px-5 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-md active:scale-95 w-fit"
                    >
                        Apply <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function ProductShowcase() {
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        slug: string;
        title: string;
        category: "Loan" | "Insurance";
    } | null>(null);

    const handleApplyClick = (product: any, category: "Loan" | "Insurance") => {
        setSelectedProduct({
            slug: product.slug,
            title: product.title,
            category: category,
        });
        setShowApplicationModal(true);
    };

    return (
        <>
            <section className="py-32 bg-transparent">
                <div className="w-full md:w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-8 space-y-24">

                    {/* Loan Section */}
                    <div>
                        <div className="mb-12 border-b border-gray-200 pb-6 flex items-end justify-between">
                            <h2 className="text-4xl font-light text-gray-900 tracking-tight">
                                Lending <span className="font-bold">Solutions</span>
                            </h2>
                            <span className="text-sm text-gray-400 uppercase tracking-widest hidden md:block">Financial Products 01</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                            {loans.map((loan, index) => (
                                <ProductCard
                                    key={index}
                                    product={loan}
                                    index={index}
                                    category="loan"
                                    onApplyClick={() => handleApplyClick(loan, "Loan")}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Insurance Section */}
                    <div>
                        <div className="mb-12 border-b border-gray-200 pb-6 flex items-end justify-between">
                            <h2 className="text-4xl font-light text-gray-900 tracking-tight">
                                Risk <span className="font-bold">Management</span>
                            </h2>
                            <span className="text-sm text-gray-400 uppercase tracking-widest hidden md:block">Protection Plans 02</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                            {insurances.map((insurance, index) => (
                                <ProductCard
                                    key={index}
                                    product={insurance}
                                    index={index}
                                    category="insurance"
                                    onApplyClick={() => handleApplyClick(insurance, "Insurance")}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Application Modal */}
            {selectedProduct && (
                <ApplicationModal
                    isOpen={showApplicationModal}
                    onClose={() => {
                        setShowApplicationModal(false);
                        setSelectedProduct(null);
                    }}
                    productType={selectedProduct.slug}
                    productTitle={selectedProduct.title}
                    category={selectedProduct.category}
                />
            )}
        </>
    );
}
