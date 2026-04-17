"use client";

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export function HackerText({ text, className = "" }: HackerTextProps) {
    return (
        <span className={className}>
            {text}
        </span>
    );
}
