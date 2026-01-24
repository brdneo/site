"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Projects() {
    const { language } = useLanguage();
    const t = DATA[language].projects;

    return (
        <section id="projects" className="relative py-24 px-4 bg-white/5">
            <div className="mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center text-4xl font-bold text-white"
                >
                    {t.title}
                </motion.h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {t.items.map((project: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded bg-black border border-zinc-900 hover:border-zinc-600 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                                <p className="text-zinc-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                    {project.tech.map((tech: string, i: number) => (
                                        <span
                                            key={i}
                                            className="text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-800 px-2 py-1"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    className="inline-flex items-center text-xs font-bold text-white uppercase tracking-widest hover:text-green-400 transition-colors mt-auto pt-4"
                                >
                                    [ View Project ]
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
