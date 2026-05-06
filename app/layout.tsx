import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Brendo Bittencourt",
  description: "Engenheiro de Dados — Python, SQL, AWS, Linux & Automação",
  keywords: ["engenheiro de dados", "data engineer", "python", "sql", "aws", "linux", "automação", "brendo bittencourt"],
  authors: [{ name: "Brendo Bittencourt", url: "https://brendo.dev" }],
  creator: "Brendo Bittencourt",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: "https://brendo.dev",
    title: "Brendo Bittencourt",
    description: "Engenheiro de Dados — Python, SQL, AWS, Linux & Automação",
    siteName: "Brendo Bittencourt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendo Bittencourt",
    description: "Engenheiro de Dados — Python, SQL, AWS, Linux & Automação",
  },
  metadataBase: new URL("https://brendo.dev"),
};

import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/lib/language-context";

// JSON-LD structured data (Schema.org Person)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brendo Bittencourt",
  url: "https://brendo.dev",
  email: "oi@brendo.dev",
  jobTitle: "Engenheiro de Dados",
  sameAs: [
    "https://linkedin.com/in/brdneo",
    "https://github.com/brdneo",
    "https://instagram.com/brdneo",
    "https://wakatime.com/@brendo",
  ],
  knowsAbout: ["Python", "SQL", "PostgreSQL", "AWS", "Linux", "Docker", "ETL", "Databricks", "Airflow", "Rust"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-[#D4A373]/20 selection:text-[#3D2C1E] font-sans`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
