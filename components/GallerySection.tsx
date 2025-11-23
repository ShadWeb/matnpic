// components/GallerySection.tsx
import { GalleryItem } from "@/types";

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqpXQRhej98RoZ_mh2YJBylE2zUoi5cVQluwyQ9rZ6h79V-CrAlaiMFpeUp-fBsDHD0A3w74SaIhLI8U9c9-GZh13hFP_1SK3vTj--0B8J0i3XgqJDlzdzWexJy59uezVmyGOi-tskIEVwa6ut9uU95cBWUi6ck92li_S3iZMuAmwykRg38UxnjF8XmrfMvOvmwnQjnny0_0Fs4jMfsLcNqFqnMGHngc222dPYDhXB2cWuW6869uACCTm_0dyFKQNw5tNNTCRXd6Tt",
    alt: "Abstract colorful geometric shapes",
    description: "رنگ‌های در هم تنیده.",
  },
  // Add other gallery items here...
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
            <button
              onClick={() => handleUseText(item.description)}
              className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors"
            >
              استفاده از این متن
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
