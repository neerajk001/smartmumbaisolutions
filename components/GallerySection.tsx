"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getGalleryEvents, GalleryEvent, getSortedImages, formatEventDate } from "@/lib/galleryApi";

export default function GallerySection() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGalleryEvents() {
      try {
        setLoading(true);
        const response = await getGalleryEvents();
        
        if (response.success) {
          setEvents(response.events);
        } else {
          setError(response.error || 'Failed to load gallery events');
        }
      } catch (err) {
        setError('Failed to load gallery events');
      } finally {
        setLoading(false);
      }
    }

    loadGalleryEvents();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-[#FCF8F8] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to static data if API fails
  if (error || events.length === 0) {
    const fallbackEvents = [
      {
        id: 1,
        title: "Christmas Festival Celebration 2024",
        description: "Celebrating the joy and spirit of Christmas with our team and community. A festive gathering filled with joy, laughter, and togetherness.",
        eventDate: "2024-12-25",
        location: "Mumbai Office",
        isFeatured: true,
        images: [
          { id: 1, imageUrl: "/events/event (2).jpeg", altText: "Christmas Festival 1", displayOrder: 0, isFeatured: true },
          { id: 2, imageUrl: "/events/event (3).jpeg", altText: "Christmas Festival 2", displayOrder: 1, isFeatured: false },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Community Outreach Program",
        description: "We believe in giving back. Our team visited local communities to provide financial literacy workshops and support local initiatives.",
        eventDate: "2024-02-10",
        location: "Andheri East, Mumbai",
        isFeatured: false,
        images: [
          { id: 3, imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", altText: "Community Outreach 1", displayOrder: 0, isFeatured: true },
          { id: 4, imageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop", altText: "Community Outreach 2", displayOrder: 1, isFeatured: false },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Smart Solutions Award Ceremony",
        description: "Celebrating excellence in our organization. Recognizing the hard work and dedication of our top performers who drive our success.",
        eventDate: "2024-01-25",
        location: "Taj Lands End",
        isFeatured: false,
        images: [
          { id: 5, imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop", altText: "Award Ceremony 1", displayOrder: 0, isFeatured: true },
          { id: 6, imageUrl: "https://images.unsplash.com/photo-1475721027767-f753c9150120?q=80&w=2070&auto=format&fit=crop", altText: "Award Ceremony 2", displayOrder: 1, isFeatured: false },
        ],
        createdAt: new Date().toISOString(),
      },
    ];

    return (
      <section className="py-20 bg-[#FCF8F8] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gallery & Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing memorable moments from our events and celebrations
            </p>
          </motion.div>

          <div className="space-y-24">
            {fallbackEvents.map((event, index) => {
              const images = getSortedImages(event);
              const image1 = images[0];
              const image2 = images[1] || images[0];

              return (
                <div
                  key={event.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Event Details */}
                  <div className="flex-1 w-full">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                          <Calendar size={18} className="text-blue-600" />
                          <span className="font-medium text-sm">{formatEventDate(event.eventDate)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                          <MapPin size={18} className="text-red-500" />
                          <span className="font-medium text-sm">{event.location}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Link 
                          href="/gallery/view-all"
                          className="group flex items-center gap-2 text-blue-900 font-semibold hover:gap-3 transition-all duration-300"
                        >
                          View All Photos <ArrowRight size={18} />
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Image Grid */}
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
                      <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                          src={image1.imageUrl}
                          alt={image1.altText}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="relative h-[85%] self-center rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-12 group">
                        <Image
                          src={image2.imageUrl}
                          alt={image2.altText}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Render events from API
  return (
    <section className="py-20 bg-[#FCF8F8] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gallery & Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capturing memorable moments from our events and celebrations
          </p>
        </motion.div>

        <div className="space-y-24">
          {events.map((event, index) => {
            const images = getSortedImages(event);
            const image1 = images[0];
            const image2 = images[1] || images[0]; // Fallback to first if only one image

            return (
              <div
                key={event.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Event Details */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <Calendar size={18} className="text-blue-600" />
                        <span className="font-medium text-sm">{formatEventDate(event.eventDate)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <MapPin size={18} className="text-red-500" />
                        <span className="font-medium text-sm">{event.location}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link 
                        href="/gallery/view-all"
                        className="group flex items-center gap-2 text-blue-900 font-semibold hover:gap-3 transition-all duration-300"
                      >
                        View All Photos <ArrowRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Image Grid */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
                      <Image
                        src={image1.imageUrl}
                        alt={image1.altText}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="relative h-[85%] self-center rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-12 group">
                      <Image
                        src={image2.imageUrl}
                        alt={image2.altText}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
