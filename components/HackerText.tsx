"use client";

import { useEffect, useState, useRef } from "react";

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export function HackerText({ text, className = "", speed = 40 }: HackerTextProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    // Track if we have started decoding the CURRENT text
    const [started, setStarted] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    
    // 1. When text changes, reset 'started' and show scrambled immediately
    useEffect(() => {
        setStarted(false);
        const scramble = text.split("").map(char => char === " " ? " " : Math.random() > 0.5 ? "1" : "0").join("");
        setDisplayText(scramble);
    }, [text]);

    // 2. Observe visibility. Only active if NOT started yet.
    useEffect(() => {
        if (started) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setStarted(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [started]); // Re-subscribes properly if 'started' was reset

    // 3. Animation Logic. Only runs when 'started' is true.
    useEffect(() => {
        if (!started) return;

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

        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <span ref={elementRef} className={className}>
            {displayText}
        </span>
    );
}
