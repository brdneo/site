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
import { useLanguage } from "@/lib/language-context";

const SKILL_GROUPS = [
    {
        category: "Development",
        // Subtle gradient border effect and faint background
        containerClass: "border-blue-500/20 hover:border-blue-500/40 bg-blue-500/[0.02]",
        textClass: "text-blue-200/80",
        items: [
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "Rust", icon: SiRust, color: "#DEA584" },
            { name: ".NET", icon: SiDotnet, color: "#512BD4" },
            { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
        ]
    },
    {
        category: "Data & Infra",
        containerClass: "border-purple-500/20 hover:border-purple-500/40 bg-purple-500/[0.02]",
        textClass: "text-purple-200/80",
        items: [
            { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "AWS", icon: SiAmazon, color: "#FF9900" },
            { name: "Databricks", icon: SiDatabricks, color: "#FF3621" },
            { name: "ETL", icon: GrDatabase, color: "#00CED1" },
            { name: "Linux", icon: SiLinux, color: "#FCC624" },
            { name: "Arch", icon: SiArchlinux, color: "#1793D1" },
            { name: "Shell", icon: SiGnubash, color: "#4EAA25" },
        ]
    },
    {
        category: "Diferenciais",
        containerClass: "border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/[0.02]",
        textClass: "text-emerald-200/80",
        items: [
            { name: "Eng. Dados", icon: FaGraduationCap, color: "#FF69B4" },
            { name: "CPA-10", icon: FaIdCard, color: "#FFD700" },
            { name: "CNH A/B", icon: FaCar, color: "#A9A9A9" },
            { name: "Autonomia", icon: FaRegLightbulb, color: "#FFFF00" },
            { name: "Team Work", icon: FaUsers, color: "#00FA9A" },
        ]
    }
];

export function Skills() {
    const { language } = useLanguage();
    const t = DATA[language].skills;

    return (
        <section id="skills" className="py-24 space-y-12 overflow-hidden bg-black/40 border-y border-white/5">
            <div className="text-center px-4">
                <h2 className="text-4xl font-bold text-white mb-4">{t.title}</h2>
                <p className="text-zinc-400">{t.subtitle}</p>
            </div>

            <div className="relative w-full overflow-hidden mask-gradient-x py-10">
                <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-12 px-4 items-start">
                    {/* Marquee Content */}
                    {[...SKILL_GROUPS, ...SKILL_GROUPS, ...SKILL_GROUPS].map((group, groupIdx) => (
                        <div
                            key={groupIdx}
                            className={cn(
                                "relative flex flex-col rounded-3xl border backdrop-blur-[2px] overflow-hidden min-w-max transition-colors duration-500",
                                group.containerClass
                            )}
                        >
                            {/* Subtle Header */}
                            <div className={cn(
                                "w-full py-3 px-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] border-b border-white/5",
                                group.textClass
                            )}>
                                {group.category}
                            </div>

                            {/* Group Body (Icons) */}
                            <div className="flex items-center gap-4 p-5">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="group/icon relative flex flex-col items-center">
                                        {/* Icon Container - Cleaner look */}
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group-hover/icon:scale-110 cursor-pointer">
                                            <item.icon
                                                size={24}
                                                style={{ color: item.color }}
                                                className="opacity-70 group-hover/icon:opacity-100 transition-opacity duration-300"
                                            />
                                        </div>

                                        {/* Tooltip Name (Floating Above with blur) */}
                                        <div className="absolute -top-10 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 z-30 pointer-events-none whitespace-nowrap scale-95 group-hover/icon:scale-100">
                                            <span className="bg-black/90 text-zinc-200 text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 shadow-xl backdrop-blur-md">
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
