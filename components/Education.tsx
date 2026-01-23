"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Education() {
    const { language } = useLanguage();
    const t = DATA[language].education;

    return (
        <section id="education" className="relative py-24 px-4">
            <div className="mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500"
                >
                    {t.title}
                </motion.h2>

                <div className="grid gap-6 md:grid-cols-1">
                    {/* Explicitly typing item as 'any' for now to bypass strict check, or defined type */}
                    {t.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-2xl p-8 hover:bg-white/5 transition-colors border-l-4 border-l-purple-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <h3 className="text-2xl font-bold text-white">{item.institution}</h3>
                                <span className="text-zinc-400 font-medium">{item.period}</span>
                            </div>
                            <h4 className="text-xl text-purple-400 mb-2">{item.degree}</h4>
                            <p className="text-zinc-400">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
