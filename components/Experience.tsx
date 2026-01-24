"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Experience() {
    const { language } = useLanguage();
    const t = DATA[language].experience;

    return (
        <section id="experience" className="relative py-24 px-4">
            <div className="mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                >
                    {t.title}
                </motion.h2>

                <div className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-12">
                    {t.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative ml-8 md:ml-12"
                        >
                            {/* Dot */}
                            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 h-4 w-4 rounded-full border border-zinc-800 bg-black box-content p-0.5">
                                <div className="h-full w-full rounded-full bg-zinc-600 group-hover:bg-white" />
                            </div>

                            {/* Minimalist Card */}
                            <div className="rounded border border-zinc-900 bg-black p-6 transition-all hover:border-zinc-700">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white font-mono">
                                        {item.role}
                                    </h3>
                                    <span className="text-xs text-zinc-500 font-mono tracking-wider">{item.period}</span>
                                </div>
                                <p className="text-sm text-zinc-400 mb-2 font-medium border-l-2 border-zinc-800 pl-3">{item.company}</p>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
