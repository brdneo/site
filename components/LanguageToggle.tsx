"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

function FlagBR() {
    return (
        <svg viewBox="0 0 72 50" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="72" height="50" fill="#009c3b" />
            <polygon points="36,6 66,25 36,44 6,25" fill="#ffdf00" />
            <circle cx="36" cy="25" r="11" fill="#002776" />
            <path d="M 26 27 C 29 24 35 24 45 27" fill="transparent" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
    );
}

function FlagUK() {
    return (
        <svg viewBox="0 0 60 30" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <clipPath id="t">
                <path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" />
            </clipPath>
            <path d="M0,0v30h60v-30z" fill="#00247d" />
            <path d="M0,0l60,30m0-30l-60,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0l60,30m0-30l-60,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4" />
            <path d="M30,0v30m-30-15h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0v30m-30-15h60" stroke="#cf142b" strokeWidth="6" />
        </svg>
    );
}

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
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg overflow-hidden ${language === "en" ? "translate-x-8" : "translate-x-0"}`}
            >
                {language === "pt" ? <FlagBR /> : <FlagUK />}
            </motion.div>
        </button>
    );
}
