// components/Header.tsx
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky  dark:shadow-soft shadow shadow-primary top-0 rounded-2xl z-50 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 backdrop-blur-lg bg-background-light/80 dark:bg-background-dark/80 border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <div className="">
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ترکیب متن و عکس */}
              <rect
                x="8"
                y="8"
                width="24"
                height="24"
                rx="4"
                stroke={"#5D3FD3"}
                strokeWidth="2"
              />

              {/* نماد متن */}
              <path
                d="M12 16H20M12 20H18M12 24H16"
                stroke={"#5D3FD3"}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* نماد عکس */}
              <circle cx="28" cy="16" r="1.5" fill={"#5D3FD3"} />
              <path
                d="M24 28L28 24L30 26"
                stroke={"#5D3FD3"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* فلش تبدیل */}
              <path
                d="M32 20L36 20M36 20L34 18M36 20L34 22"
                stroke={"#5D3FD3"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary leading-tight tracking-[-0.015em]">
            Matnpic
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors"
            href="#home"
          >
            خانه
          </a>
          <a
            className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors"
            href="#gallery"
          >
            نمونه‌ها
          </a>
          <a
            className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors"
            href="#about"
          >
            درباره ما
          </a>
          <a
            className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors"
            href="#contact"
          >
            تماس
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:text-primary transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
