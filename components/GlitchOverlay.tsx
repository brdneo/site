"use client";

import { useEffect, useState } from "react";

export function GlitchOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<string[]>([]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scheduleGlitch = () => {
            // Random interval between 10s and 40s
            // For the first runs, it might be startling.
            const delay = Math.random() * 30000 + 10000;

            timeoutId = setTimeout(() => {
                triggerGlitch();
            }, delay);
        };

        const triggerGlitch = () => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();

            // Check if time is between 00:59 and 04:59
            const isTime = (hour === 0 && minute >= 59) || (hour >= 1 && hour < 5);

            if (isTime) {
                setIsVisible(true);
            }

            // If not time, we skip setting visible, but we still generate content/schedule next
            // actually if not time, we just schedule next and return early to save resources
            if (!isTime) {
                scheduleGlitch();
                return;
            }

            // Generate random terminal "noise"
            const lines = [];
            const phrases = [
                "SYSTEM COMPROMISED",
                "INJECTING SHELLCODE...",
                "ROOT ACCESS: GRANTED",
                "DOWNLOADING DATABASE...",
                "ENCRYPTING FILES...",
                "CONNECTION ESTABLISHED: 192.168.0.X",
                "KERNEL PANIC - NOT SYNCING",
                "SEGMENTATION FAULT",
                "BUFFER OVERFLOW DETECTED",
                "0x0000000000000000",
                "FATAL ERROR"
            ];

            for (let i = 0; i < 20; i++) {
                if (Math.random() > 0.7) {
                    lines.push(phrases[Math.floor(Math.random() * phrases.length)]);
                } else {
                    // Binary noise
                    lines.push(Array(80).fill(0).map(() => Math.random() > 0.5 ? "1" : "0").join(""));
                }
            }
            setContent(lines);

            // Duration of the glitch: very short (100ms - 300ms)
            const duration = 100 + Math.random() * 200;

            setTimeout(() => {
                setIsVisible(false);
                scheduleGlitch(); // Schedule the next one
            }, duration);
        };

        // Initial schedule
        scheduleGlitch();

        return () => clearTimeout(timeoutId);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 pointer-events-none font-mono flex flex-col justify-center items-center overflow-hidden">
            {/* CRT Scanline effect overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            <div className="w-full max-w-4xl p-8 text-green-500 text-xs md:text-sm opacity-80 mix-blend-screen animate-pulse">
                {content.map((line, i) => (
                    <div key={i} className="truncate tracking-widest leading-tight">
                        <span className="text-zinc-500 mr-4">
                            {new Date().toLocaleTimeString()}.{Math.floor(Math.random() * 999)}
                        </span>
                        {line}
                    </div>
                ))}
            </div>

            {/* Big Warning */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 bg-black text-red-600 px-8 py-4 text-4xl md:text-6xl font-black tracking-widest uppercase shadow-[0_0_50px_rgba(220,38,38,0.5)] transform -rotate-3 mix-blend-normal">
                HACKED
            </div>
        </div>
    );
}
