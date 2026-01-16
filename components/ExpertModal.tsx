"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Clock } from "lucide-react";

interface ExpertModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExpertModal({ isOpen, onClose }: ExpertModalProps) {
    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-md rounded-sm shadow-2xl p-8 relative overflow-hidden cursor-default"
                        >
                            {/* Decorative background circle */}
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50 to-transparent -z-0"></div>

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                type="button"
                                aria-label="Close modal"
                                className="absolute top-4 right-4 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-[110] cursor-pointer touch-manipulation"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon */}
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white">
                                    <Phone size={32} className="text-blue-600" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Talk to an Expert
                                </h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    Get instant guidance on your loan requirements. <br />
                                    Our financial experts are here to help you.
                                </p>

                                {/* Call Action */}
                                <a
                                    href="tel:+919665248445"
                                    className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white py-4 rounded-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <Phone size={20} className="group-hover:animate-pulse" />
                                    <span>Call +91 96652 48445</span>
                                </a>

                                {/* Footer Info */}
                                <div className="mt-6 flex flex-col gap-2 items-center text-xs text-gray-400">
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                        <Clock size={12} />
                                        <span>Available 10 AM - 7 PM</span>
                                    </div>
                                    <span>Standard calling charges may apply</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
