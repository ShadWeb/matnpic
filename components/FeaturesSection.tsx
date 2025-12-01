// components/FeaturesSection.tsx
import {
  Smile,
  Languages,
  Eye,
  Tv,
  Droplets,
  Contrast,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "تبدیل متن به عکس آنلاین رایگان",
    desc: "ابزاری سریع و رایگان برای ساخت تصویر از متن بدون نیاز به نصب برنامه.",
  },
  {
    icon: Languages,
    title: "تبدیل متن به عکس فارسی",
    desc: "پشتیبانی کامل از زبان فارسی و فونت‌های محبوب برای خروجی حرفه‌ای.",
  },
  {
    icon: Eye,
    title: "پیش‌نمایش زنده هوش مصنوعی",
    desc: "پیش از دانلود، تصویر نهایی را با هوش مصنوعی به‌صورت زنده مشاهده کنید.",
  },
  {
    icon: Tv,
    title: "دانلود با کیفیت 4K",
    desc: "امکان تبدیل متن به عکس آنلاین با بالاترین رزولوشن و خروجی 4K.",
  },
  {
    icon: Droplets,
    title: "خروجی بدون واترمارک",
    desc: "تمام تصاویر بدون واترمارک و کاملاً قابل استفاده در پروژه‌های حرفه‌ای.",
  },
  {
    icon: Contrast,
    title: "لایت و دارک مود",
    desc: "ظاهر مدرن با پشتیبانی از حالت تاریک برای تجربه کاربری بهتر.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-20"
      id="features"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black">
          چرا ابزار تبدیل متن به عکس ما؟
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-sm mt-2">
          اگر به دنبال بهترین راه برای <strong>تبدیل متن به عکس آنلاین</strong>،
          خروجی باکیفیت، و امکانات هوش مصنوعی هستید—این بخش ویژگی‌های اصلی ابزار
          ما را معرفی می‌کند.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-primary-light/5 border border-border-light dark:border-border-dark transition hover:shadow-lg hover:bg-primary-light/10 duration-200"
          >
            <div className="flex items-center justify-center size-14 rounded-full bg-primary-light/10 text-primary-light">
              <feature.icon size={28} />
            </div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
