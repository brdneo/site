"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { HackerText } from "@/components/HackerText";
import { ChevronDown } from "lucide-react";

export function Hero() {
    const { language } = useLanguage();
    const t = DATA[language].hero;

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center bg-black font-mono selection:bg-white selection:text-black">

            {/* Digital Night Background */}
            <div className="absolute inset-0 bg-black">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* "Moon" / Glow Source */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0 }}
                className="relative z-10 max-w-4xl w-full"
            >
                {/* System Status Badge - Ultra Minimal */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-black text-[10px] text-zinc-500 uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                        {t.badge}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Prompt */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base text-zinc-500 font-mono mb-4"
                    >
                        {t.greeting} <span className="text-zinc-300">{t.name}</span>
                    </motion.p>

                    {/* Name - Big, Bold, Stark White */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-white"
                    >
                        <HackerText text={t.role} className="break-words" />
                    </motion.h1>

                    {/* Subtext with Terminal Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-4 text-zinc-500 text-sm md:text-lg mt-6"
                    >
                        <span>{t.description}</span>
                        <span className="animate-blink">_</span>
                    </motion.div>
                </div>

                {/* Minimalist Command Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-16 max-w-md mx-auto w-full"
                >
                    <a
                        href="#contact"
                        className="group relative inline-flex h-12 w-full items-center justify-center bg-white text-black px-4 text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105"
                    >
                        {t.ctaPrimary}
                    </a>
                    <a
                        href="#projects"
                        className="inline-flex h-12 w-full items-center justify-center border border-zinc-800 bg-black px-4 text-sm font-medium text-zinc-400 uppercase tracking-widest transition-colors hover:border-zinc-600 hover:text-white"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>

            </motion.div>

            {/* Scroll Indicator - Bottom of Viewport */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="animate-bounce">
                    <ChevronDown className="h-6 w-6 text-zinc-500" />
                </div>
            </motion.div>
        </section>
    );
}
