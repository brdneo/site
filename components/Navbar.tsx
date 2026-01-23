"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { language } = useLanguage();
    const t = DATA[language].nav;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-300",
                scrolled ? "pt-4" : "pt-6"
            )}
        >
            <nav
                className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300",
                    "glass shadow-2xl shadow-black/20"
                )}
            >
                {t.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white rounded-full hover:bg-white/5"
                    >
                        {link.name}
                    </Link>
                ))}
                <div className="pl-2 border-l border-white/10 ml-2">
                    <LanguageToggle />
                </div>
            </nav>
        </motion.header>
    );
}
