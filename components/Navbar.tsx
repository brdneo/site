"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "./LanguageToggle";
import { HiMenuAlt4, HiX } from "react-icons/hi";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const { language } = useLanguage();
    const t = DATA[language].nav;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
                    scrolled ? "pt-4" : "pt-6"
                )}
            >
                {/* Desktop Navigation */}
                <nav
                    className={cn(
                        "hidden md:flex items-center gap-1 rounded-full px-4 py-2 transition-all duration-300",
                        "bg-black border border-zinc-900 shadow-xl shadow-black/50 backdrop-blur-sm"
                    )}
                >
                    {t.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="w-28 flex justify-center px-4 py-2 text-xs font-medium text-zinc-500 uppercase tracking-widest transition-colors hover:text-white hover:bg-zinc-900 rounded-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pl-4 border-l border-zinc-800 ml-4">
                        <LanguageToggle />
                    </div>
                </nav>

                {/* Mobile Navigation Toggle (Visible only on small screens) */}
                <div className="md:hidden flex items-center justify-between w-full px-6">
                    <div className="flex-1" /> {/* Spacer */}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-full bg-black border border-zinc-900 text-white"
                    >
                        <HiMenuAlt4 size={24} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white"
                        >
                            <HiX size={24} />
                        </button>

                        <div className="flex flex-col items-center gap-6">
                            {t.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-mono text-zinc-400 hover:text-white uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8">
                            <LanguageToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
