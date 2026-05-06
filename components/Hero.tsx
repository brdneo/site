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
import { Code, GraduationCap, ChevronLeft, ChevronRight, X } from "lucide-react";

const SOCIALS = [
    { name: "Email", icon: SiGmail, color: "#B54A32", link: "mailto:oi@brendo.dev" },
    { name: "WakaTime", icon: SiWakatime, color: "#6B8E6B", link: "https://wakatime.com/@brendo" },
    { name: "LinkedIn", icon: SiLinkedin, color: "#5A7FA0", link: "https://linkedin.com/in/brdneo" },
    { name: "GitHub", icon: SiGithub, color: "#5C4A3A", link: "https://github.com/brdneo" },
    { name: "Instagram", icon: SiInstagram, color: "#B5614E", link: "https://instagram.com/brdneo" },
    { name: "WhatsApp", icon: SiWhatsapp, color: "#5A8C5A", link: "https://wa.me/5571996070108" },
];

const SKILL_ITEMS = [
    { name: "Python", icon: SiPython, color: "#5A7FA0" },
    { name: "SQL", icon: TbSql, color: "#6B7B8D" },
    { name: "Modelagem", icon: TbDatabase, color: "#8B7BAA" },
    { name: "Linux", icon: SiLinux, color: "#8A7A40" },
    { name: "Git", icon: SiGit, color: "#B5614E" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#5A7080" },
    { name: "ETL", icon: GrDatabase, color: "#5A8A8A" },
    { name: "Docker", icon: SiDocker, color: "#5A7FA0" },
    { name: "AWS", icon: SiAmazon, color: "#B5864A" },
    { name: "Airflow", icon: SiApacheairflow, color: "#5A7FA0" },
    { name: "Databricks", icon: SiDatabricks, color: "#B54A32" },
    { name: "Rust", icon: SiRust, color: "#8A7060" },
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
    // Parallax
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    // Typewriter
    const [typedChars, setTypedChars] = useState(0);
    const [typewriterReady, setTypewriterReady] = useState(false);
    // Mobile tabs
    const [mobilePanel, setMobilePanel] = useState<null | "skills" | "education">(null);

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

    // Typewriter effect
    useEffect(() => {
        setTypedChars(0);
        const timer = setTimeout(() => setTypewriterReady(true), 800);
        return () => { clearTimeout(timer); setTypewriterReady(false); };
    }, [language]);

    useEffect(() => {
        if (!typewriterReady || !t.description) return;
        if (typedChars >= t.description.length) return;
        const timer = setTimeout(() => setTypedChars(c => c + 1), 40);
        return () => clearTimeout(timer);
    }, [typedChars, typewriterReady, t.description]);

    // Keyboard shortcuts
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") { setShowSkills(p => !p); setShowEducation(false); }
            else if (e.key === "ArrowRight") { setShowEducation(p => !p); setShowSkills(false); }
            else if (e.key === "ArrowDown") setShowSocials(true);
            else if (e.key === "ArrowUp") setShowSocials(false);
            else if (e.key === "Escape") { setShowSkills(false); setShowEducation(false); setShowSocials(false); setMobilePanel(null); }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // Parallax mouse handler
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
        });
    }, []);

    return (
        <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-4 text-center selection:bg-[#D4A373]/20 selection:text-[#3D2C1E] grain" onMouseMove={handleMouseMove}>

            {/* ====== BACKGROUND — Retro minimalist layers ====== */}
            <div className="absolute inset-0">

                {/* Base — warm cream gradient with subtle variation */}
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(165deg, #FEFAE0 0%, #FAEDCD 25%, #FEFAE0 45%, #E9EDC9 70%, #FEFAE0 100%)"
                }} />

                {/* Topographic contour rings — parallax enabled */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none">
                    <g style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`, transition: "transform 0.3s ease-out" }}>
                        <circle cx="75%" cy="25%" r="180" fill="none" stroke="#CCD5AE" strokeWidth="0.8" />
                        <circle cx="75%" cy="25%" r="140" fill="none" stroke="#CCD5AE" strokeWidth="0.6" />
                        <circle cx="75%" cy="25%" r="100" fill="none" stroke="#CCD5AE" strokeWidth="0.5" />
                        <circle cx="75%" cy="25%" r="60" fill="none" stroke="#CCD5AE" strokeWidth="0.4" />
                    </g>
                    <g style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)`, transition: "transform 0.4s ease-out" }}>
                        <circle cx="20%" cy="70%" r="120" fill="none" stroke="#D4A373" strokeWidth="0.7" />
                        <circle cx="20%" cy="70%" r="85" fill="none" stroke="#D4A373" strokeWidth="0.5" />
                        <circle cx="20%" cy="70%" r="50" fill="none" stroke="#D4A373" strokeWidth="0.4" />
                    </g>
                    <g style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * -12}px)`, transition: "transform 0.5s ease-out" }}>
                        <circle cx="10%" cy="40%" r="45" fill="none" stroke="#CCD5AE" strokeWidth="0.5" />
                        <circle cx="10%" cy="40%" r="25" fill="none" stroke="#CCD5AE" strokeWidth="0.3" />
                    </g>
                    <g style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * 18}px)`, transition: "transform 0.35s ease-out" }}>
                        <circle cx="90%" cy="55%" r="70" fill="none" stroke="#D4A373" strokeWidth="0.4" />
                        <circle cx="90%" cy="55%" r="40" fill="none" stroke="#D4A373" strokeWidth="0.3" />
                    </g>
                </svg>

                {/* Fine horizontal lines — like vintage paper texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #CCD5AE 39px, #CCD5AE 40px)",
                }} />

                {/* Warm ambient glows — depth and warmth */}
                <div className="absolute top-[15%] right-[20%] h-[500px] w-[500px] rounded-full bg-[#FAEDCD]/40 blur-[160px]" />
                <div className="absolute bottom-[20%] left-[15%] h-[400px] w-[400px] rounded-full bg-[#E9EDC9]/30 blur-[140px]" />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#FEFAE0]/60 blur-[100px]" />

                {/* Soft edge vignette */}
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(204, 213, 174, 0.15) 100%)"
                }} />
            </div>

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
                            <Code className="h-4 w-4 text-[#D4A373]" />
                            <span className="text-sm text-[#7A6B5A] uppercase tracking-[0.2em] font-medium">
                                {language === "pt" ? "Habilidades" : "Skills"}
                            </span>
                            <div className="h-px flex-1 bg-[#CCD5AE]/60" />
                        </div>

                        {/* Skills list — icon + label, 2 columns */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                            {SKILL_ITEMS.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                                    className="group/skill flex items-center gap-3 rounded-lg border border-[#CCD5AE]/50 bg-[#FAEDCD]/40 backdrop-blur-sm px-4 py-3 transition-all duration-300 hover:border-[#CCD5AE] hover:bg-[#FAEDCD]/70 hover:shadow-sm cursor-default"
                                >
                                    <item.icon
                                        size={20}
                                        style={{ color: item.color }}
                                        className="opacity-50 group-hover/skill:opacity-90 transition-all duration-300 flex-shrink-0"
                                    />
                                    <span className="text-sm text-[#7A6B5A] group-hover/skill:text-[#3D2C1E] transition-colors duration-300 whitespace-nowrap">
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
                            <div className="h-px flex-1 bg-[#CCD5AE]/60" />
                            <span className="text-sm text-[#7A6B5A] uppercase tracking-[0.2em] font-medium">
                                {edu.title}
                            </span>
                            <GraduationCap className="h-4 w-4 text-[#D4A373]" />
                        </div>

                        {edu.items.map((item: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.12, duration: 0.4 }}
                                className="rounded-lg border border-[#CCD5AE]/50 bg-[#FAEDCD]/40 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:border-[#CCD5AE] hover:bg-[#FAEDCD]/70 hover:shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h4 className="text-base font-semibold text-[#3D2C1E] leading-snug">{item.institution}</h4>
                                    <span className="text-[11px] text-[#7A6B5A] border border-[#CCD5AE]/60 px-2.5 py-1 rounded-full bg-[#E9EDC9]/40 whitespace-nowrap flex-shrink-0 font-mono">{item.period}</span>
                                </div>
                                <p className="text-base text-[#5C4A3A] leading-snug mb-2">{item.degree}</p>
                                <p className="text-sm text-[#7A6B5A] leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====== MAIN CONTENT — crossfade on language change ====== */}
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 max-w-5xl w-full"
              >
                {/* Status Badge */}
                <div className="flex justify-center mb-8 md:mb-14">
                    <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#CCD5AE]/60 bg-[#FAEDCD]/30 text-[11px] md:text-xs text-[#7A6B5A] uppercase tracking-widest backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-[#CCD5AE] shadow-[0_0_6px_rgba(204,213,174,0.5)] animate-pulse" />
                        {t.badge}
                    </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-[#7A6B5A] font-mono mb-4">
                        {t.greeting} <span className="text-[#5C4A3A]">{t.name}</span>
                    </motion.p>

                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-4xl sm:text-7xl md:text-9xl font-light tracking-tight text-[#3D2C1E] whitespace-nowrap cursor-default flex justify-center font-display">
                        <div className="group flex items-center">
                            <span>Brendo&nbsp;</span>
                            <span className="relative flex items-center">
                                <span>B</span>
                                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[1000px] group-hover:opacity-100 transition-all duration-700 ease-in-out whitespace-nowrap">ittencourt</span>
                                <span className="max-w-[100px] group-hover:max-w-0 group-hover:opacity-0 overflow-hidden transition-all duration-500 ease-in-out text-[#D4A373]">.</span>
                            </span>
                        </div>
                    </motion.h1>

                    {/* Description — typewriter */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-1 text-[#7A6B5A] text-base md:text-xl mt-6 md:mt-8">
                        <span>{t.description ? t.description.slice(0, typedChars) : ""}</span>
                        <span className="animate-blink text-[#D4A373]">|</span>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-center mt-10 md:mt-14">
                    <a href={`mailto:${t.email}`} className="relative text-[#7A6B5A] hover:text-[#3D2C1E] transition-colors text-xl md:text-2xl font-mono group">
                        <span>{t.email}</span>
                        <span className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4A373]">→</span>
                    </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ====== Live system clock + working on (bottom-left) ====== */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-4 left-5 z-20 hidden md:flex items-center gap-3 text-[10px] text-[#7A6B5A]/70 uppercase tracking-widest font-mono"
            >
                <span className="tabular-nums">{currentTime}</span>
                <span className="text-[#CCD5AE]">·</span>
                <span>uptime: {uptimeDays}d</span>
                <span className="text-[#CCD5AE]">·</span>
                <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A373] animate-pulse" />
                    working on: <span className="text-[#D4A373]/80">data pipelines</span>
                </span>
            </motion.div>

            {/* ====== MOBILE BUTTONS — icon-only, corners (md:hidden) ====== */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                onClick={() => setMobilePanel(mobilePanel === "skills" ? null : "skills")}
                className={`md:hidden fixed bottom-5 left-5 z-40 flex items-center justify-center h-10 w-10 rounded-full border backdrop-blur-md transition-all duration-300 ${
                    mobilePanel === "skills" ? "bg-[#D4A373]/20 border-[#D4A373]/40" : "bg-[#FAEDCD]/70 border-[#CCD5AE]/60"
                }`}
            >
                <Code className={`h-4 w-4 transition-colors duration-300 ${mobilePanel === "skills" ? "text-[#D4A373]" : "text-[#7A6B5A]"}`} />
            </motion.button>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                onClick={() => setMobilePanel(mobilePanel === "education" ? null : "education")}
                className={`md:hidden fixed bottom-5 right-5 z-40 flex items-center justify-center h-10 w-10 rounded-full border backdrop-blur-md transition-all duration-300 ${
                    mobilePanel === "education" ? "bg-[#D4A373]/20 border-[#D4A373]/40" : "bg-[#FAEDCD]/70 border-[#CCD5AE]/60"
                }`}
            >
                <GraduationCap className={`h-4 w-4 transition-colors duration-300 ${mobilePanel === "education" ? "text-[#D4A373]" : "text-[#7A6B5A]"}`} />
            </motion.button>

            {/* ====== MOBILE PANEL DRAWER ====== */}
            <AnimatePresence>
                {mobilePanel && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="md:hidden fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-[#CCD5AE]/50 bg-[#FEFAE0]/95 backdrop-blur-xl p-6 pb-24"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                {mobilePanel === "skills" ? <Code className="h-4 w-4 text-[#D4A373]" /> : <GraduationCap className="h-4 w-4 text-[#D4A373]" />}
                                <span className="text-sm text-[#7A6B5A] uppercase tracking-[0.2em] font-medium">
                                    {mobilePanel === "skills" ? (language === "pt" ? "Habilidades" : "Skills") : edu.title}
                                </span>
                            </div>
                            <button onClick={() => setMobilePanel(null)} className="p-1.5 rounded-full bg-[#FAEDCD]/60 border border-[#CCD5AE]/40"><X className="h-4 w-4 text-[#7A6B5A]" /></button>
                        </div>
                        {mobilePanel === "skills" ? (
                            <div className="grid grid-cols-2 gap-2.5">
                                {SKILL_ITEMS.map((item) => (
                                    <div key={item.name} className="flex items-center gap-3 rounded-lg border border-[#CCD5AE]/50 bg-[#FAEDCD]/40 px-4 py-3">
                                        <item.icon size={18} style={{ color: item.color }} className="opacity-60 flex-shrink-0" />
                                        <span className="text-sm text-[#5C4A3A]">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {edu.items.map((item: any, idx: number) => (
                                    <div key={idx} className="rounded-lg border border-[#CCD5AE]/50 bg-[#FAEDCD]/40 p-5 text-left">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <h4 className="text-sm font-semibold text-[#3D2C1E]">{item.institution}</h4>
                                            <span className="text-[10px] text-[#7A6B5A] border border-[#CCD5AE]/60 px-2 py-0.5 rounded-full bg-[#E9EDC9]/40 font-mono">{item.period}</span>
                                        </div>
                                        <p className="text-sm text-[#5C4A3A] mb-1">{item.degree}</p>
                                        <p className="text-xs text-[#7A6B5A]">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

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
                        <ChevronLeft className="h-4 w-4 text-[#CCD5AE] animate-pulse-subtle" />
                        <div className="h-8 w-[1px] bg-[#CCD5AE]/60 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4A373]/60 animate-scroll-line-x-left" />
                        </div>
                        <span className="text-[10px] text-[#7A6B5A]/60 uppercase tracking-widest font-mono writing-vertical">
                            {language === "pt" ? "habilidades" : "skills"}
                        </span>
                        <div className="h-8 w-[1px] bg-[#CCD5AE]/60 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4A373]/60 animate-scroll-line-x-left" />
                        </div>
                        <Code className="h-3.5 w-3.5 text-[#CCD5AE]" />
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
                        <GraduationCap className="h-3.5 w-3.5 text-[#CCD5AE]" />
                        <div className="h-8 w-[1px] bg-[#CCD5AE]/60 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4A373]/60 animate-scroll-line-x-right" />
                        </div>
                        <span className="text-[10px] text-[#7A6B5A]/60 uppercase tracking-widest font-mono writing-vertical">
                            {language === "pt" ? "formação" : "education"}
                        </span>
                        <div className="h-8 w-[1px] bg-[#CCD5AE]/60 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4A373]/60 animate-scroll-line-x-right" />
                        </div>
                        <ChevronRight className="h-4 w-4 text-[#CCD5AE] animate-pulse-subtle" />
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
                        <span className="text-[10px] text-[#7A6B5A]/60 uppercase tracking-widest font-mono">scroll</span>
                        <div className="w-[1px] h-6 bg-[#CCD5AE]/60 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4A373]/60 animate-scroll-line" />
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
                                    <div className="relative z-10 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-[#CCD5AE]/50 bg-[#FAEDCD]/40 backdrop-blur-sm transition-all duration-300 group-hover/icon:border-[#CCD5AE] group-hover/icon:bg-[#FAEDCD]/70 cursor-pointer group-hover/icon:shadow-md group-hover/icon:shadow-[#D4A373]/10">
                                        <item.icon
                                            className="w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 group-hover/icon:scale-110 opacity-40 group-hover/icon:opacity-80"
                                            style={{ color: item.color }}
                                        />
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute -top-10 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 z-50 pointer-events-none whitespace-nowrap">
                                        <span className="bg-[#3D2C1E] text-[#FEFAE0] text-[10px] uppercase font-medium px-2.5 py-1 rounded-full shadow-lg">
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
