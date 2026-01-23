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
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-6 transition-all hover:border-white/20"
                        >
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-zinc-400 line-clamp-3">{project.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech: string, i: number) => (
                                    <span
                                        key={i}
                                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                className="inline-flex items-center text-sm font-semibold text-white hover:text-purple-400 transition-colors"
                            >
                                View Project →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
