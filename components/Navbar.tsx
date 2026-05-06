"use client";

import { motion } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="fixed top-5 right-5 z-50"
        >
            <div className="flex items-center gap-1.5 rounded-full bg-hero-surface border border-hero-border backdrop-blur-md p-1.5 shadow-sm transition-colors duration-300">
                <LanguageToggle />
            </div>
        </motion.div>
    );
}
