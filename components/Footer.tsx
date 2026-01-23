"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
    const { language } = useLanguage();
    const t = DATA[language].footer;

    return (
        <footer id="contact" className="py-24 px-4 border-t border-white/10 bg-black">
            <div className="mx-auto max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8 text-4xl font-bold text-white"
                >
                    {t.title}
                </motion.h2>

                <p className="mb-12 text-zinc-400 text-lg">
                    {t.subtitle}
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex justify-center gap-6"
                >
                    <a
                        href="mailto:brendo@example.com"
                        className="rounded-full bg-white px-8 py-3 font-medium text-black transition-transform hover:scale-105"
                    >
                        {t.ctaPrimary}
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>

                <div className="mt-24 text-sm text-zinc-600">
                    {t.copyright}
                </div>
            </div>
        </footer>
    );
}
