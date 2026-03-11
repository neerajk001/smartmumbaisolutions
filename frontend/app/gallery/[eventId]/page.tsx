"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getGalleryEvents, GalleryImage, getSortedImages } from "@/lib/galleryApi";

interface PageProps {
    params: Promise<{
        eventId: string;
    }>;
}

export default function EventGalleryPage({ params }: PageProps) {
    // Unwrap the params Promise
    const { eventId } = use(params);

    const [allImages, setAllImages] = useState<GalleryImage[]>([]);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        async function loadEventImages() {
            try {
                setLoading(true);
                const response = await getGalleryEvents();

                if (response.success && response.events.length > 0) {
                    // Find the specific event by ID
                    const event = response.events.find(e => e.id.toString() === eventId);

                    if (event) {
                        // Get images only for this specific event
                        const images = getSortedImages(event);
                        setAllImages(images);
                        setEventTitle(event.title);
                        setEventDescription(event.description);
                    } else {
                        setError('Event not found');
                    }
                } else {
                    setError(!response.success ? response.error : 'Failed to load event images');
                }
            } catch (err) {
                setError('Failed to load event images');
            } finally {
                setLoading(false);
            }
        }

        loadEventImages();
    }, [eventId]);

    const openImageModal = (index: number) => {
        setSelectedImage(index);
        setCurrentImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    // Keyboard navigation
    useEffect(() => {
        if (selectedImage === null) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeImageModal();
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [selectedImage, allImages.length]);

    return (
        <main className="min-h-screen bg-[#FCF8F8]">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Gallery
                        </Link>

                        {loading ? (
                            <div className="text-center">
                                <p className="text-gray-600">Loading gallery...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    {eventTitle}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    {eventDescription}
                                </p>
                            </>
                        )}
                    </motion.div>

                    {/* Photo Grid */}
                    {!loading && !error && allImages.length > 0 && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {allImages.map((image, index) => (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        onClick={() => openImageModal(index)}
                                        className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-2xl transition-all duration-300"
                                    >
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.altText}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-medium">{image.altText}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Image Counter */}
                            <div className="mt-8 text-center text-gray-600">
                                <p className="text-lg">
                                    Showing <span className="font-semibold text-gray-900">{allImages.length}</span> photos
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Full Screen Image Modal */}
            <AnimatePresence>
                {selectedImage !== null && allImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={closeImageModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-7xl w-full max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeImageModal}
                                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
                                {currentImageIndex + 1} / {allImages.length}
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                                <Image
                                    src={allImages[currentImageIndex].imageUrl}
                                    alt={allImages[currentImageIndex].altText}
                                    fill
                                    className="object-contain"
                                    sizes="90vw"
                                />
                            </div>

                            {/* Navigation Buttons */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Thumbnail Strip */}
                            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 justify-center">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentImageIndex
                                            ? "ring-4 ring-blue-500 scale-110"
                                            : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={img.imageUrl}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
