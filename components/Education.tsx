"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

import Link from "next/link";

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
                            className="relative group rounded bg-black p-8 border border-zinc-900 hover:border-zinc-700 transition-colors"
                        >

                            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <h3 className="text-xl font-bold text-white font-mono tracking-tight max-w-[80%]">{item.institution}</h3>
                                <span className="text-xs text-zinc-500 font-mono border border-zinc-900 px-2 py-1 rounded bg-zinc-950 mt-2 md:mt-0 w-fit">{item.period}</span>
                            </div>
                            <h4 className="text-zinc-300 mb-4">{item.degree}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
