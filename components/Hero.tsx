"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
    const { language } = useLanguage();
    const t = DATA[language].hero;

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
            {/* Background Elements */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
                <div className="absolute h-[300px] w-[300px] translate-x-[100px] rounded-full bg-purple-500/20 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 space-y-6"
            >
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 backdrop-blur-md">
                    <span>{t.badge}</span>
                </div>

                <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
                    <span className="block text-white">{t.greeting}</span>
                    <span className="text-gradient block">{t.name}</span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
                    {t.role} | {t.description}
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center gap-4 pt-4"
                >
                    <a
                        href="#contact"
                        className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-transform hover:scale-105"
                    >
                        <span>{t.ctaPrimary}</span>
                    </a>
                    <a
                        href="#projects"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white transition-colors hover:bg-white/10"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
