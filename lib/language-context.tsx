"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("pt");

    // Optional: Persist language choice
    useEffect(() => {
        const saved = localStorage.getItem("language") as Language;
        if (saved) setLanguage(saved);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === "pt" ? "en" : "pt";
        setLanguage(newLang);
        localStorage.setItem("language", newLang);
    };

    // Simple translation helper for static UI text
    const t = (key: string) => {
        return key; // Placeholder for now, components will handle data selection
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
