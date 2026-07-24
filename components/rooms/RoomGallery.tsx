"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightbox from "../shared/ImageLightbox";

interface RoomGalleryProps {
    images: string[];
    roomName: string;
}

export default function RoomGallery({ images, roomName }: RoomGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const handleCloseLightbox = () => {
        setLightboxIndex(null);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Active Large Image Display */}
            <div
                onClick={() => handleOpenLightbox(images.indexOf(activeImage))}
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-mist shadow-sm border border-sage/20 cursor-zoom-in group"
            >
                <Image
                    src={activeImage}
                    alt={`${roomName} Display`}
                    fill
                    priority
                    sizes="(max-w-1024px) 100vw, 800px"
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                     
                />
                {/* Gallery Overlay Indicator */}
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                    <span className="bg-forest/90 backdrop-blur-md text-cream text-xs font-bold tracking-wider px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md">
                        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Zoom
                    </span>
                </div>
            </div>

            {/* Thumbnails list */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(img)}
                            className={`relative aspect-video rounded-xl overflow-hidden bg-mist border transition duration-250 cursor-pointer ${activeImage === img
                                    ? "border-forest ring-2 ring-sage/30"
                                    : "border-sage/20 hover:border-sage/50"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${roomName} Thumbnail ${index + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                                 
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <ImageLightbox
                    images={images}
                    currentIndex={lightboxIndex}
                    onClose={handleCloseLightbox}
                />
            )}
        </div>
    );
}
