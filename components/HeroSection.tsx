// components/HeroSection.tsx
import { useState } from "react";
import { Download } from "lucide-react";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedFont, setSelectedFont] = useState("vazir");

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download functionality to be implemented");
  };

  return (
    <section
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 md:py-20"
      id="home"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Controls Panel */}
        <div className="flex flex-col  dark:shadow-soft shadow shadow-primary gap-6 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark backdrop-blur-md">
          {/* Text Input */}
          <label className="flex flex-col w-full">
            <p className="text-base font-medium pb-2">متن خود را وارد کنید</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex w-full resize-none rounded-lg bg-primary/10 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark dark:bg-background-dark focus:border-primary/50 min-h-36 p-4 text-base font-normal leading-normal placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
              placeholder="هر چیزی که تصور می‌کنی را اینجا بنویس..."
            />
          </label>

          {/* Color Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium">رنگ پس‌زمینه</p>
              <label
                className="size-12 rounded-full border-2 border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer"
                style={{ backgroundColor: "rgb(255, 251, 254)" }}
              >
                <input
                  checked
                  className="invisible"
                  name="bg-color"
                  type="radio"
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium">رنگ متن</p>
              <label
                className="size-12 rounded-full border-2 border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer"
                style={{ backgroundColor: "rgb(30, 30, 46)" }}
              >
                <input className="invisible" name="text-color" type="radio" />
              </label>
            </div>
          </div>

          {/* Font Selection */}
          <label className="flex flex-col w-full">
            <p className="text-base font-medium pb-2">فونت</p>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="flex w-full rounded-lg text-text-light dark:text-text-dark focus:outline-none ring ring-primary/40 focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary/50 h-14 p-4 text-base font-normal appearance-none pr-12 bg-no-repeat bg-[center_left_1rem]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fill='rgb(167,139,250)' viewBox='0 0 256 256'%3e%3cpath d='M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48-48A8,8,0,0,0,85.66,85.66Z'%3e%3c/path%3e%3c/svg%3e")`,
              }}
            >
              <option value="vazir">وزیرمتن</option>
              <option value="sahel">ساحل</option>
              <option value="lalezar">لاله‌زار</option>
            </select>
          </label>

          {/* Style Controls */}
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBold}
                  onChange={(e) => setIsBold(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="text-sm font-medium">Bold</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isItalic}
                  onChange={(e) => setIsItalic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="text-sm font-medium">Italic</span>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium" htmlFor="font-size">
                سایز فونت:{" "}
                <span className="font-bold text-accent">{fontSize}</span>
              </label>
              <input
                id="font-size"
                type="range"
                min="8"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-primary-light"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button className="w-full flex items-center justify-center rounded-2xl h-14 px-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-glow transition-shadow">
            <span className="truncate">تولید تصویر</span>
          </button>
        </div>

        {/* Preview Panel */}
        <div
          className="relative min-h-[400px] bg-accent  lg:min-h-full flex items-center justify-center p-0 rounded-2xl  shadow-soft"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(93, 63, 211, 0.3), rgba(93, 63, 211, 0))",
          }}
        >
          <div className="absolute inset-0.5 rounded-[19px] bg-background-light dark:bg-background-dark"></div>
          <div className="relative w-full h-full max-h-[580px]  flex items-center justify-center rounded-2xl overflow-hidden p-8">
            <button
              onClick={handleDownload}
              className="absolute top-4 left-4 flex items-center justify-center size-10 rounded-full bg-primary text-white hover:bg-primary-light transition-colors z-10"
            >
              <Download size={20} />
            </button>
            <p
              className="text-center text-nowrap text-text-light dark:text-text-dark"
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
              }}
            >
              {text || "متن شما اینجا نمایش داده می‌شود"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
