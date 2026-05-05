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
            <div className="rounded-full bg-black/60 border border-zinc-800/60 backdrop-blur-md p-1.5 shadow-lg shadow-black/30">
                <LanguageToggle />
            </div>
        </motion.div>
    );
}
