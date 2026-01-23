"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex h-8 w-16 items-center rounded-full bg-white/10 p-1 ring-1 ring-white/10 transition-colors hover:bg-white/20"
            aria-label="Toggle Language"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black shadow-lg ${language === "en" ? "translate-x-8" : "translate-x-0"
                    }`}
            >
                {language.toUpperCase()}
            </motion.div>
        </button>
    );
}
