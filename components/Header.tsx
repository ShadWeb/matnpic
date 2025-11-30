// components/Header.tsx
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
  return (
    <header className="sticky  dark:shadow-soft shadow shadow-primary top-0 rounded-2xl z-50 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py- backdrop-blur-lg mb bg-background-light/80 dark:bg-background-dark/80 border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex justify-center items-center gap-">
          <h2 className="text-2xl font-bold text-primary leading-tight tracking-[-0.015em]">
            Matnpic
          </h2>
          <div className="">
            <div className=" text-primary">
              <Image
                src={"images/matnpic.png"}
                width={50}
                height={50}
                alt="تبدیل متن به عکس آنلاین رایگان"
              />
            </div>
          </div>
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
