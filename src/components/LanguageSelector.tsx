"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇨🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check localStorage first for saved preference
    const saved = localStorage.getItem("preferred_lang");
    if (saved) {
      const match = LANGUAGES.find((l) => l.code === saved);
      if (match) {
        setCurrentLang(match);
      }
    } else {
      // 2. Check existing googtrans cookie
      const cookies = document.cookie.split(";");
      for (const c of cookies) {
        const trimmed = c.trim();
        if (trimmed.startsWith("googtrans=")) {
          const val = trimmed.substring("googtrans=".length);
          const code = val.split("/").filter(Boolean).pop();
          const match = LANGUAGES.find((l) => l.code === code);
          if (match) {
            setCurrentLang(match);
            localStorage.setItem("preferred_lang", match.code);
            break;
          }
        }
      }
    }

    // Close on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);

    // Save choice in localStorage
    localStorage.setItem("preferred_lang", lang.code);

    // Set Google Translate cookie
    const domain = window.location.hostname;
    if (lang.code === "en") {
      // Clear cookies for returning to English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=/en/en; path=/;";
      if (domain && domain !== "localhost") {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        document.cookie = `googtrans=/en/en; path=/; domain=.${domain};`;
        document.cookie = `googtrans=/en/en; path=/; domain=${domain};`;
      }
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/;`;
      if (domain && domain !== "localhost") {
        document.cookie = `googtrans=/en/${lang.code}; path=/; domain=.${domain};`;
        document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${domain};`;
      }
    }

    // Reload so Google Translate applies
    window.location.reload();
  };

  return (
    <div
      ref={dropdownRef}
      className="notranslate"
      translate="no"
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        type="button"
        className="notranslate"
        translate="no"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-full)",
          padding: "0.4rem 0.85rem",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--color-text-main)",
          cursor: "pointer",
          transition: "all var(--transition-fast)",
        }}
        aria-label="Select language"
      >
        <span style={{ fontSize: "1rem" }}>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <ChevronDown size={14} color="var(--color-text-muted)" />
      </button>

      {isOpen && (
        <div
          className="notranslate"
          translate="no"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "#FFFFFF",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            minWidth: "150px",
            zIndex: 100,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className="notranslate"
                translate="no"
                onClick={() => changeLanguage(lang)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.65rem 1rem",
                  background: isSelected ? "var(--color-accent-light)" : "transparent",
                  color: isSelected ? "var(--color-accent)" : "var(--color-text-main)",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "0.875rem",
                  transition: "background var(--transition-fast)",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
