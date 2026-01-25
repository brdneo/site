"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { HackerText } from "@/components/HackerText";
import {
    SiLinkedin, SiDiscord, SiGithub, SiYoutube, SiWhatsapp, SiGmail
} from "react-icons/si";
import { cn } from "@/lib/utils";

const SOCIALS = [
    { name: "Email", icon: SiGmail, color: "#EA4335", link: "mailto:brdueo@gmai.com" },
    { name: "LinkedIn", icon: SiLinkedin, color: "#0077B5", link: "https://linkedin.com/in/brdneo" },
    { name: "Discord", icon: SiDiscord, color: "#5865F2", link: "https://discord.com/users/1058427557491507250" },
    { name: "GitHub", icon: SiGithub, color: "#181717", link: "https://github.com/brdneo" },
    { name: "YouTube", icon: SiYoutube, color: "#FF0000", link: "https://youtube.com/@brdneo" },
    { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366", link: "https://wa.me/5571996070108" },
];

export function Footer() {
    const { language } = useLanguage();
    const t = DATA[language].footer;

    return (
        <footer id="contact" className="py-24 px-4 border-t border-zinc-900 overflow-hidden font-mono">
            <div className="mx-auto max-w-4xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8 text-2xl font-bold text-white tracking-tight"
                >
                    <HackerText text={t.title} />
                </motion.h2>

                <p className="mb-16 text-zinc-500 text-sm">
                    {t.subtitle}
                </p>

                {/* Social Marquee */}
                <div className="relative w-full overflow-hidden mask-gradient-x py-12">
                    <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-8 px-4 items-center">
                        {/* Repeat 4 times for smooth loop */}
                        {[...SOCIALS, ...SOCIALS, ...SOCIALS, ...SOCIALS].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target={item.name === "Email" ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                className="group/icon relative flex flex-col items-center justify-center"
                            >
                                {/* Icon Container - Technical Look (Matching Skills.tsx) */}
                                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded border border-zinc-800 bg-black transition-all duration-300 group-hover/icon:border-zinc-600 group-hover/icon:bg-zinc-900 cursor-pointer">
                                    <item.icon
                                        size={28}
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
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-sm text-zinc-600">
                    {t.copyright}
                </div>
            </div>
        </footer>
    );
}
