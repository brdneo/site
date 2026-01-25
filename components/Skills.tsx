"use client";

import {
    SiPython, SiPostgresql, SiRust, SiDotnet, SiArchlinux,
    SiAmazon, SiDatabricks, SiLinux, SiGnubash, SiNextdotjs,
    SiTailwindcss, SiReact, SiFramer, SiDocker, SiGit
} from "react-icons/si";
import { FaGraduationCap, FaIdCard, FaCar, FaRegLightbulb, FaUsers, FaBrain } from "react-icons/fa6";
import { GrDatabase } from "react-icons/gr";
import { BsTerminal } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/data";
import { HackerText } from "@/components/HackerText";
import { useLanguage } from "@/lib/language-context";

// Only items remain hardcoded as they are proper nouns, but keys must match index of content in data.ts
const SKILL_ITEMS = [
    // Group 0: Development
    [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "Rust", icon: SiRust, color: "#DEA584" },
        { name: ".NET", icon: SiDotnet, color: "#512BD4" },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    ],
    // Group 1: Data & Infra
    [
        { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
        { name: "AWS", icon: SiAmazon, color: "#FF9900" },
        { name: "Databricks", icon: SiDatabricks, color: "#FF3621" },
        { name: "ETL", icon: GrDatabase, color: "#00CED1" },
        { name: "Linux", icon: SiLinux, color: "#FCC624" },
        { name: "Arch", icon: SiArchlinux, color: "#1793D1" },
        { name: "Shell", icon: SiGnubash, color: "#4EAA25" },
    ],
    // Group 2: Differentials
    [
        { name: "Eng. Dados", icon: FaGraduationCap, color: "#FF69B4" },
        { name: "CPA-10", icon: FaIdCard, color: "#FFD700" },
        { name: "CNH A/B", icon: FaCar, color: "#A9A9A9" },
        { name: "Autonomia", icon: FaRegLightbulb, color: "#FFFF00" },
        { name: "Team Work", icon: FaUsers, color: "#00FA9A" },
    ]
];

export function Skills() {
    const { language } = useLanguage();
    const t = DATA[language].skills;

    return (
        <section id="skills" className="py-24 space-y-12 overflow-hidden bg-black border-y border-zinc-900 font-mono">
            <div className="text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    <HackerText text={t.title} />
                </h2>
                <p className="text-zinc-500 text-sm">{t.subtitle}</p>
            </div>

            <div className="relative w-full overflow-hidden mask-gradient-x py-10">
                <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-12 px-4 items-start">
                    {/* Marquee Content */}
                    {[0, 1, 2, 0, 1, 2].map((groupIndex, idx) => {
                        const groupData = t.groups[groupIndex]; // Get translated category name
                        const items = SKILL_ITEMS[groupIndex]; // Get icons/items

                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "relative flex flex-col rounded border overflow-hidden min-w-max transition-colors duration-300 hover:border-zinc-700",
                                    "border-zinc-900 bg-black"
                                )}
                            >
                                {/* Minimalist Header */}
                                <div className={cn(
                                    "w-full py-3 px-6 text-center text-[10px] uppercase tracking-[0.2em] border-b border-zinc-900 bg-zinc-950 text-zinc-500"
                                )}>
                                    {groupData.category}
                                </div>

                                {/* Group Body (Icons) */}
                                <div className="flex items-center gap-4 p-5">
                                    {items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="group/icon relative flex flex-col items-center">
                                            {/* Icon Container - Technical Look */}
                                            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded border border-zinc-800 bg-black transition-all duration-300 group-hover/icon:border-zinc-600 group-hover/icon:bg-zinc-900 cursor-pointer">
                                                <item.icon
                                                    size={24}
                                                    style={{ color: item.color }}
                                                    className="transition-all duration-300 group-hover/icon:scale-110 opacity-70 group-hover/icon:opacity-100"
                                                />
                                            </div>

                                            {/* Tooltip Name (Tech Badge Style) */}
                                            <div className="absolute -top-10 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 z-30 pointer-events-none whitespace-nowrap">
                                                <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 border border-zinc-700 shadow-xl">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
