// components/GallerySection.tsx
import { GalleryItem } from "@/types";
import Link from "next/link";

const galleryItems: GalleryItem[] = [
  {
    id: "pdf-ax",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/337/337946.png", // placeholder icon
    alt: "سایت تبدیل عکس به PDF - pdf-ax",
    description: "سایت حرفه‌ای تبدیل عکس به PDF. سریع، ساده و رایگان.",
    link: "https://www.pdf-ax.com/",
  },
  {
    id: "ax-matn",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // placeholder icon
    alt: "سایت تبدیل عکس به متن - ax-matn",
    description:
      "تبدیل عکس به متن فارسی و انگلیسی با دقت بالا. مناسب محتوای متنی.",
    link: "https://ax-matn.com/",
  },
  {
    id: "ax-pdf",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/337/337946.png", // placeholder icon
    alt: "سایت تبدیل عکس به PDF - ax-pdf",
    description: "تبدیل سریع و آسان عکس به PDF. نسخه سبک و سریع.",
    link: "https://ax-pdf.ir/",
  },
];

export default function GallerySection() {
  const handleUseText = (description: string) => {
    // Implement text usage functionality
    console.log("Using text:", description);
  };

  return (
    <section
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-20"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black">نمونه‌های آماده</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col shadow-soft shadow-primary gap-4 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark backdrop-blur-md overflow-hidden"
          >
            <div
              className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
              style={{ backgroundImage: `url('${item.imageUrl}')` }}
              aria-label={item.alt}
            />
            <p className="text-sm font-normal flex-grow">{item.description}</p>
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-colors hover:bg-primary/90"
            >
              ورود به سایت
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
