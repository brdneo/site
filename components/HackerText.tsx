"use client";

import { useEffect, useState, useRef } from "react";

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export function HackerText({ text, className = "", speed = 40 }: HackerTextProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const [displayText, setDisplayText] = useState(text);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // Step 1: Immediately scramble on mount so user sees binary waiting
        const scramble = text.split("").map(char => char === " " ? " " : Math.random() > 0.5 ? "1" : "0").join("");
        setDisplayText(scramble);

        // Step 2: Use vanilla IntersectionObserver to detect visibility
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);

                // Start Decoding Loop
                let iterations = 0;
                const interval = setInterval(() => {
                    setDisplayText(() => {
                        return text
                            .split("")
                            .map((char, index) => {
                                if (index < iterations) {
                                    return char;
                                }
                                if (char === " ") return " ";
                                return Math.random() > 0.5 ? "1" : "0";
                            })
                            .join("");
                    });

                    iterations += 1 / 3;

                    if (iterations >= text.length) {
                        clearInterval(interval);
                        setDisplayText(text);
                    }
                }, speed);

                // Cleanup interval works via closure, but we also disconnect observer
                observer.disconnect();
            }
        }, {
            threshold: 0.1, // Trigger when 10% visible
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [text, speed, hasAnimated]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
}
