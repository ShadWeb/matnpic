import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

export const metadata = {
  title: "تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن",
  description:
    "تبدیل متن به عکس آنلاین هوش مصنوعی با بهترین کیفیت؛ ابزار حرفه‌ای برای تبدیل متن به عکس آنلاین و رایگان. پشتیبانی از تبدیل متن به عکس فارسی و ارائه ربات تبدیل متن به عکس رایگان برای تولید سریع تصویر از نوشته‌های شما",
};
export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // بررسی ذخیره‌سازی تم در localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component
        isDark={darkMode}
        toggleTheme={toggleDarkMode}
        {...pageProps}
      />
    </>
  );
}
