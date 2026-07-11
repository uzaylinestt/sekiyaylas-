"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface ImageLightboxProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
}

export default function ImageLightbox({
    images,
    currentIndex,
    onClose,
}: ImageLightboxProps) {
    const [index, setIndex] = React.useState(currentIndex);

    useEffect(() => {
        // Lock background scroll when lightbox is open
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index]);

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/98 backdrop-blur-md animate-in fade-in duration-200">

            {/* Top action bar: Close */}
            <div className="absolute top-6 right-6 z-10 flex gap-4">
                <button
                    onClick={onClose}
                    className="p-3 bg-white/10 hover:bg-white/20 text-cream rounded-full transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10"
                    aria-label="Close Lightbox"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main Visual Display */}
            <div className="relative w-full max-w-5xl h-[70vh] px-4 flex items-center justify-center">

                {/* Prev Button */}
                {images.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-cream rounded-full transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10"
                        aria-label="Previous Image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Current Image */}
                <div className="relative w-full h-full max-h-[70vh]">
                    <Image
                        src={images[index]}
                        alt={`Enlarged room view ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                        unoptimized
                    />
                </div>

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-cream rounded-full transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10"
                        aria-label="Next Image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Photo Index Indicator */}
            <div className="absolute bottom-6 text-sm font-semibold tracking-widest text-sage">
                {index + 1} / {images.length}
            </div>

        </div>
    );
}
