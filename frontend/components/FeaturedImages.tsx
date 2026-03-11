"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { getFeaturedGalleryEvents, GalleryEvent, getSortedImages } from "@/lib/galleryApi";

export default function FeaturedImages() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedEvents() {
      try {
        setLoading(true);
        const response = await getFeaturedGalleryEvents();
        
        if (response.success) {
          setEvents(response.events);
        } else {
          setError(response.error || 'Failed to load featured images');
        }
      } catch (err) {
        setError('Failed to load featured images');
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedEvents();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state - fallback to static images
  if (error || events.length === 0) {
    // Fallback to static images
    const featuredImages = [
      {
        id: 1,
        src: "/events/event (2).jpeg",
        alt: "Christmas Festival Celebration 1",
      },
      {
        id: 2,
        src: "/events/event (3).jpeg",
        alt: "Christmas Festival Celebration 2",
      },
    ];

    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">
              <Images size={20} />
              <span>Festival Gallery</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Christmas Festival Celebrations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing the joy and spirit of our festive celebrations
            </p>
          </motion.div>

          {/* Featured Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold text-lg">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Photos Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/gallery/view-all"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Images size={20} />
              View All Photos
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // Get first event and its images from API
  const event = events[0];
  const images = getSortedImages(event).slice(0, 2); // Get first 2 images

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">
            <Images size={20} />
            <span>Festival Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {event.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {event.description}
          </p>
        </motion.div>

        {/* Featured Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src={image.imageUrl}
                alt={image.altText}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-white font-semibold text-lg">{image.altText}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Photos Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/gallery/view-all"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Images size={20} />
            View All Photos
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

