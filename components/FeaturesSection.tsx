// components/FeaturesSection.tsx
import { Smile, Languages, Eye, Tv, Droplets, Contrast } from "lucide-react";

const features = [
  { icon: Smile, title: "کاملاً رایگان" },
  { icon: Languages, title: "پشتیبانی کامل فارسی" },
  { icon: Eye, title: "پیش‌نمایش زنده" },
  { icon: Tv, title: "دانلود 4K" },
  { icon: Droplets, title: "بدون واترمارک" },
  { icon: Contrast, title: "لایت و دارک مود" },
];

export default function FeaturesSection() {
  return (
    <section
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-20"
      id="features"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black">چرا ما؟</h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-primary-light/5 border border-border-light dark:border-border-dark"
          >
            <div className="flex items-center justify-center size-14 rounded-full bg-primary-light/10 text-primary-light">
              <feature.icon size={28} />
            </div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
