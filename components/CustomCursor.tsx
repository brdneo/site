"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const TRAIL_LENGTH = 5;

export function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const trailRef = useRef<{ x: number; y: number }[]>(
        Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
    );
    const animFrameRef = useRef<number>(0);

    const updateTrail = useCallback(() => {
        const trail = trailRef.current;
        trail[0] = { ...position };
        for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
            trail[i] = {
                x: trail[i].x + (trail[i - 1].x - trail[i].x) * 0.35,
                y: trail[i].y + (trail[i - 1].y - trail[i].y) * 0.35,
            };
        }
        animFrameRef.current = requestAnimationFrame(updateTrail);
    }, [position]);

    useEffect(() => {
        // Only show on devices with fine pointer (no touch)
        const hasFineCursor = window.matchMedia("(pointer: fine)").matches;
        if (!hasFineCursor) return;

        setIsVisible(true);

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, [tabindex]");
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        animFrameRef.current = requestAnimationFrame(updateTrail);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [updateTrail]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
            {/* Trail dots */}
            {trailRef.current.map((_, idx) => (
                <div
                    key={idx}
                    className="absolute rounded-full bg-[#D4A373] transition-none"
                    style={{
                        left: trailRef.current[idx].x,
                        top: trailRef.current[idx].y,
                        width: `${4 - idx * 0.5}px`,
                        height: `${4 - idx * 0.5}px`,
                        opacity: 0.3 - idx * 0.05,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}

            {/* Main cursor dot */}
            <div
                className="absolute rounded-full transition-transform duration-100 ease-out"
                style={{
                    left: position.x,
                    top: position.y,
                    width: isHovering ? "32px" : "8px",
                    height: isHovering ? "32px" : "8px",
                    backgroundColor: isHovering ? "transparent" : "#D4A373",
                    border: isHovering ? "1.5px solid #D4A373" : "none",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease",
                }}
            />
        </div>
    );
}
