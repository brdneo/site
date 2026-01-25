"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { HackerText } from "@/components/HackerText";

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
                    <HackerText text={t.title} />
                </motion.h2>

                <div className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-12">
                    {DATA.pt.experience.items.map((_, index) => {
                        const itemPT = DATA.pt.experience.items[index];
                        const itemEN = DATA.en.experience.items[index];
                        const items = { pt: itemPT, en: itemEN };

                        return (
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

                                {/* Minimalist Card Container */}
                                <div className="relative rounded border border-zinc-900 bg-black p-6 transition-all hover:border-zinc-700">
                                    {/* Grid to overlap PT and EN versions */}
                                    <div className="grid">
                                        {/* Render both languages to force max height */}
                                        {(["pt", "en"] as const).map((langKey) => {
                                            const item = items[langKey];
                                            const isActive = language === langKey;

                                            return (
                                                <div
                                                    key={langKey}
                                                    className={cn(
                                                        "col-start-1 row-start-1 flex flex-col transition-opacity duration-300",
                                                        isActive ? "opacity-100 z-10" : "opacity-0 -z-10 invisible"
                                                    )}
                                                    aria-hidden={!isActive}
                                                >
                                                    <div className="relative z-10 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between mb-6">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white font-mono leading-tight">
                                                                {item.role}
                                                            </h3>
                                                            <p className="text-sm text-zinc-400 font-medium">{item.company}</p>
                                                        </div>
                                                        <span className="text-xs text-zinc-500 font-mono tracking-wider mt-1 sm:mt-0">{item.period}</span>
                                                    </div>

                                                    {/* Legacy company prop removed from standalone paragraph to avoid duplication */}

                                                    <div className="flex-grow space-y-6">
                                                        {item.context ? (
                                                            <>
                                                                <div className="grid gap-2">
                                                                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                                                                        {langKey === 'pt' ? 'Contexto' : 'Context'}
                                                                    </span>
                                                                    <p className="text-sm text-zinc-400 leading-relaxed border-l border-zinc-900 pl-3">
                                                                        {item.context}
                                                                    </p>
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                                                                        {langKey === 'pt' ? 'Ação' : 'Action'}
                                                                    </span>
                                                                    <p className="text-sm text-zinc-300 leading-relaxed border-l border-zinc-800 pl-3">
                                                                        {item.action}
                                                                    </p>
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                                                                        {langKey === 'pt' ? 'Aprendizado' : 'Learning'}
                                                                    </span>
                                                                    <p className="text-sm text-zinc-400 italic leading-relaxed border-l border-zinc-900 pl-3">
                                                                        {item.learning}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </div>

                                                    {/* Stack Pinned to Bottom */}
                                                    {item.stack && (
                                                        <div className="pt-6 mt-auto border-t border-zinc-900/50">
                                                            <div className="flex flex-wrap gap-2">
                                                                {item.stack.map((tech: string, i: number) => (
                                                                    <span key={i} className="px-2 py-1 bg-zinc-950 border border-zinc-900 rounded text-[10px] text-zinc-500 uppercase tracking-wider font-mono hover:text-zinc-300 transition-colors">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
