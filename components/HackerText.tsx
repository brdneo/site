"use client";

import { useEffect, useState, useRef } from "react";

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number; // Speed in ms per frame
}

export function HackerText({ text, className = "", speed = 30 }: HackerTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isMounted, setIsMounted] = useState(false);

    // Use a ref to track if we should animate (to avoid strict mode double-firing issues affecting visual start)
    const startedRef = useRef(false);

    useEffect(() => {
        setIsMounted(true);
        // Start with a localized scrambled state to avoid flash of original text
        const scramble = () => text.split("").map(char => char === " " ? " " : Math.random() > 0.5 ? "1" : "0").join("");
        setDisplayText(scramble());
    }, [text]);

    useEffect(() => {
        if (!isMounted) return;

        // Short delay before starting the decode to let the user see the binary
        const startDelay = setTimeout(() => {
            let iterations = 0;

            const interval = setInterval(() => {
                setDisplayText(prev => {
                    return text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) {
                                return char;
                            }

                            // Return random binary for unscrambled parts
                            // Keep spaces as spaces for layout stability
                            if (char === " ") return " ";
                            return Math.random() > 0.5 ? "1" : "0";
                        })
                        .join("");
                });

                // Decode speed: reveal 1 character every 3 frames (adjust for smoothness)
                iterations += 1 / 3;

                if (iterations > text.length) {
                    clearInterval(interval);
                    setDisplayText(text); // Ensure final state is clean
                }
            }, speed);

            return () => clearInterval(interval);
        }, 500); // 500ms of pure binary scramble

        return () => clearTimeout(startDelay);
    }, [text, speed, isMounted]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
