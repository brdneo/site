"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { HackerText } from "@/components/HackerText";
import { ChevronDown } from "lucide-react";

interface ExperienceItemProps {
    index: number;
    items: { pt: any; en: any };
    language: "pt" | "en";
}

function ExperienceCard({ index, items, language }: ExperienceItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative ml-8 md:ml-12"
        >
            {/* Dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 h-4 w-4 rounded-full border border-zinc-800 bg-black box-content p-0.5">
                <div className={cn(
                    "h-full w-full rounded-full transition-colors",
                    isOpen ? "bg-white" : "bg-zinc-600"
                )} />
            </div>

            {/* Minimalist Card Container */}
            <div
                className={cn(
                    "relative rounded border bg-black transition-all cursor-pointer group",
                    isOpen ? "border-zinc-700 p-6" : "border-zinc-900 p-4 hover:border-zinc-800"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Header - Always Visible */}
                <div className="flex items-start justify-between">
                    <div className="grid w-full">
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
                                >
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white font-mono leading-tight">
                                                {item.role}
                                            </h3>
                                            <p className="text-sm text-zinc-400 font-medium">{item.company}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 sm:mt-0">
                                            <span className="text-xs text-zinc-500 font-mono tracking-wider">{item.period}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="ml-4 pt-1">
                        <ChevronDown className={cn(
                            "h-5 w-5 text-zinc-500 transition-transform duration-300",
                            isOpen && "rotate-180 text-white"
                        )} />
                    </div>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="grid">
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
                                                <div className="pt-6 mt-6 border-t border-zinc-900/50">
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

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
                            <ExperienceCard 
                                key={index} 
                                index={index} 
                                items={items} 
                                language={language} 
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
