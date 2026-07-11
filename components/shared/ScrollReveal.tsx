"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(currentRef);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`opacity-0 ${isVisible ? "animate-fade-in-up" : ""} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
