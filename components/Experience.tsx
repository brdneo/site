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

                <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12">
                    {t.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative ml-8 md:ml-12"
                        >
                            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 h-4 w-4 rounded-full border-2 border-white/20 bg-black box-content p-0.5">
                                <div className="h-full w-full rounded-full bg-white" />
                            </div>

                            <div className="glass overflow-hidden rounded-2xl p-6 transition-all hover:bg-white/5">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="text-xl font-semibold text-white">
                                        {item.role}
                                    </h3>
                                    <span className="text-sm text-zinc-400">{item.period}</span>
                                </div>
                                <p className="mt-2 text-lg text-purple-400">{item.company}</p>
                                <p className="mt-4 text-zinc-400 leading-relaxed">
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
