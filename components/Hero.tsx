"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { useState, useEffect, useCallback, useRef } from "react";
import {
    SiLinkedin, SiGithub, SiInstagram, SiWhatsapp, SiGmail, SiWakatime,
    SiPython, SiPostgresql, SiRust,
    SiAmazon, SiDatabricks, SiLinux,
    SiDocker, SiGit, SiApacheairflow, SiApachespark
} from "react-icons/si";
import { GrDatabase } from "react-icons/gr";
import { TbSql, TbDatabase } from "react-icons/tb";
import { Code, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

const SOCIALS = [
    { name: "Email", icon: SiGmail, color: "#EA4335", link: "mailto:oi@brendo.dev" },
    { name: "WakaTime", icon: SiWakatime, color: "#FFFFFF", link: "https://wakatime.com/@brendo" },
    { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2", link: "https://linkedin.com/in/brdneo" },
    { name: "GitHub", icon: SiGithub, color: "#C0C0C0", link: "https://github.com/brdneo" },
    { name: "Instagram", icon: SiInstagram, color: "#E4405F", link: "https://instagram.com/brdneo" },
    { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366", link: "https://wa.me/5571996070108" },
];

const SKILL_ITEMS = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "SQL", icon: TbSql, color: "#4169E1" },
    { name: "Modelagem", icon: TbDatabase, color: "#A78BFA" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "ETL", icon: GrDatabase, color: "#00CED1" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS", icon: SiAmazon, color: "#FF9900" },
    { name: "Airflow", icon: SiApacheairflow, color: "#017CEE" },
    { name: "Databricks", icon: SiDatabricks, color: "#FF3621" },
    { name: "Rust", icon: SiRust, color: "#DEA584" },
];

export function Hero() {
    const { language } = useLanguage();
    const t = DATA[language].hero;
    const edu = DATA[language].education;
    const [showSocials, setShowSocials] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [uptimeDays, setUptimeDays] = useState(0);
    const bottomZoneRef = useRef<HTMLDivElement>(null);

    // Live clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Uptime
    useEffect(() => {
        const start = new Date("2026-05-01");
        const now = new Date();
        setUptimeDays(Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    }, []);

    // Scroll wheel → show socials
    const handleWheel = useCallback((e: WheelEvent) => {
        if (e.deltaY > 0) {
            setShowSocials(true);
        } else if (e.deltaY < 0) {
            setShowSocials(false);
        }
    }, []);

    // Touch support for mobile
    useEffect(() => {
        let startY = 0;
        const onTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };
        const onTouchEnd = (e: TouchEvent) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            if (diff > 30) {
                setShowSocials(true);
            } else if (diff < -30) {
                setShowSocials(false);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [handleWheel]);

    return (
        <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-4 text-center bg-black font-mono selection:bg-white selection:text-black" >

            {/* Digital Night Background */}
            < div className="absolute inset-0 bg-black" >
                {/* Subtle Grid */}
                < div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* "Moon" / Glow Source */}
                < div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
            </div >

            {/* ====== LEFT EDGE — Skills trigger zone (hidden on mobile) ====== */}
            <div
                className="hidden md:block absolute left-0 top-0 h-full w-24 z-30"
                onMouseEnter={() => setShowSkills(true)}
                onMouseLeave={() => setShowSkills(false)}
            />

            {/* ====== RIGHT EDGE — Education trigger zone (hidden on mobile) ====== */}
            <div
                className="hidden md:block absolute right-0 top-0 h-full w-24 z-30"
                onMouseEnter={() => setShowEducation(true)}
                onMouseLeave={() => setShowEducation(false)}
            />

            {/* ====== BOTTOM EDGE — Social trigger zone ====== */}
            <div
                ref={bottomZoneRef}
                className="absolute bottom-0 left-0 right-0 h-16 z-30"
                onMouseEnter={() => setShowSocials(true)}
                onMouseLeave={() => setShowSocials(false)}
            />

            {/* ====== LEFT PANEL — Skills ====== */}
            <AnimatePresence>
                {showSkills && (
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 flex-col"
                        onMouseEnter={() => setShowSkills(true)}
                        onMouseLeave={() => setShowSkills(false)}
                    >
                        {/* Panel header */}
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-zinc-400 uppercase tracking-[0.2em] font-medium">
                                {language === "pt" ? "Habilidades" : "Skills"}
                            </span>
                            <div className="h-px flex-1 bg-zinc-700" />
                        </div>

                        {/* Skills list — icon + label, 2 columns */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                            {SKILL_ITEMS.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                                    className="group/skill flex items-center gap-3 rounded-lg border border-zinc-800/60 bg-black/70 backdrop-blur-sm px-4 py-3 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/80 cursor-default"
                                >
                                    <item.icon
                                        size={20}
                                        style={{ color: item.color }}
                                        className="opacity-60 group-hover/skill:opacity-100 transition-all duration-300 flex-shrink-0"
                                    />
                                    <span className="text-sm text-zinc-400 group-hover/skill:text-zinc-200 transition-colors duration-300 whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== RIGHT PANEL — Education ====== */}
            <AnimatePresence>
                {showEducation && (
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 w-96"
                        onMouseEnter={() => setShowEducation(true)}
                        onMouseLeave={() => setShowEducation(false)}
                    >
                        {/* Panel header */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-px flex-1 bg-zinc-700" />
                            <span className="text-sm text-zinc-400 uppercase tracking-[0.2em] font-medium">
                                {edu.title}
                            </span>
                            <GraduationCap className="h-4 w-4 text-zinc-500" />
                        </div>

                        {edu.items.map((item: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.12, duration: 0.4 }}
                                className="rounded-lg border border-zinc-800/60 bg-black/70 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/50"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h4 className="text-base font-bold text-white leading-snug">{item.institution}</h4>
                                    <span className="text-[11px] text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded bg-zinc-950 whitespace-nowrap flex-shrink-0">{item.period}</span>
                                </div>
                                <p className="text-base text-zinc-300 leading-snug mb-2">{item.degree}</p>
                                <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== MAIN CONTENT ====== */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0 }}
                className="relative z-10 max-w-5xl w-full"
            >
                {/* System Status Badge */}
                <div className="flex justify-center mb-8 md:mb-14">
                    <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-800 bg-black text-[11px] md:text-xs text-zinc-500 uppercase tracking-widest">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                        {t.badge}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6 md:space-y-8">
                    {/* Prompt */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-zinc-500 font-mono mb-4"
                    >
                        {t.greeting} <span className="text-zinc-300">{t.name}</span>
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-white whitespace-nowrap cursor-default flex justify-center"
                    >
                        <div className="group flex items-center">
                            <span>Brendo&nbsp;</span>
                            <span className="relative flex items-center">
                                <span>B</span>
                                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1000px] group-hover:opacity-100 transition-all duration-700 ease-in-out whitespace-nowrap">
                                    ittencourt
                                </span>
                                <span className="max-w-[100px] group-hover:max-w-0 group-hover:opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                                    .
                                </span>
                            </span>
                        </div>
                    </motion.h1>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-4 text-zinc-500 text-base md:text-xl mt-6 md:mt-8"
                    >
                        <span>{t.description}</span>
                        <span className="animate-blink">_</span>
                    </motion.div>
                </div>

                {/* Email */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mt-10 md:mt-14"
                >
                    <a
                        href={`mailto:${t.email}`}
                        className="text-zinc-300 hover:text-white transition-colors text-xl md:text-2xl font-mono flex items-center gap-2 group"
                    >
                        <span>{t.email}</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            ←
                        </span>
                    </a>
                </motion.div>

            </motion.div>

            {/* ====== Live system clock (bottom-left) ====== */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-4 left-5 z-20 hidden md:flex items-center gap-3 text-[10px] text-zinc-700 uppercase tracking-widest font-mono"
            >
                <span className="tabular-nums">{currentTime}</span>
                <span className="text-zinc-800">|</span>
                <span>uptime: {uptimeDays}d</span>
            </motion.div>

            {/* ====== LEFT EDGE INDICATOR — Skills ====== */}
            <AnimatePresence>
                {!showSkills && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3"
                    >
                        <ChevronLeft className="h-4 w-4 text-zinc-600 animate-pulse-subtle" />
                        <div className="h-8 w-[1px] bg-zinc-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-400 animate-scroll-line-x-left" />
                        </div>
                        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono writing-vertical">
                            {language === "pt" ? "habilidades" : "skills"}
                        </span>
                        <div className="h-8 w-[1px] bg-zinc-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-400 animate-scroll-line-x-left" />
                        </div>
                        <Code className="h-3.5 w-3.5 text-zinc-700" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== RIGHT EDGE INDICATOR — Education ====== */}
            <AnimatePresence>
                {!showEducation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3"
                    >
                        <GraduationCap className="h-3.5 w-3.5 text-zinc-700" />
                        <div className="h-8 w-[1px] bg-zinc-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-400 animate-scroll-line-x-right" />
                        </div>
                        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono writing-vertical">
                            {language === "pt" ? "formação" : "education"}
                        </span>
                        <div className="h-8 w-[1px] bg-zinc-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-400 animate-scroll-line-x-right" />
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-600 animate-pulse-subtle" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== BOTTOM SCROLL INDICATOR ====== */}
            <AnimatePresence>
                {!showSocials && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">scroll</span>
                        <div className="w-[1px] h-6 bg-zinc-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-zinc-400 animate-scroll-line" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== SOCIAL LINKS ====== */}
            <AnimatePresence>
                {showSocials && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
                        onMouseEnter={() => setShowSocials(true)}
                        onMouseLeave={() => setShowSocials(false)}
                    >
                        <div className="flex items-center gap-3 sm:gap-5">
                            {SOCIALS.map((item, idx) => (
                                <motion.a
                                    key={item.name}
                                    href={item.link}
                                    target={item.name === "Email" ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.07, duration: 0.4 }}
                                    className="group/icon relative flex flex-col items-center justify-center"
                                >
                                    <div className="relative z-10 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-lg border border-zinc-800 bg-black transition-all duration-300 group-hover/icon:border-zinc-600 group-hover/icon:bg-zinc-900 cursor-pointer group-hover/icon:shadow-lg group-hover/icon:shadow-white/5">
                                        <item.icon
                                            className="w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 group-hover/icon:scale-110 opacity-60 group-hover/icon:opacity-100"
                                            style={{ color: item.color }}
                                        />
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute -top-10 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 z-50 pointer-events-none whitespace-nowrap">
                                        <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 border border-zinc-700 rounded shadow-xl">
                                            {item.name}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}
