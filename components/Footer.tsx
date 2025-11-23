// components/Footer.tsx
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-10 border-t border-border-light dark:border-border-dark"
      id="contact"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="size-5 text-primary">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
          </div>
          <p className="text-sm text-text-light/70 dark:text-text-dark/70">
            © 2024 متن به تصویر. تمام حقوق محفوظ است.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            className="text-primary hover:text-primary-light transition-colors"
            href="#"
          >
            <Facebook size={24} />
          </a>
          <a
            className="text-primary hover:text-primary-light transition-colors"
            href="#"
          >
            <Twitter size={24} />
          </a>
          <a
            className="text-primary hover:text-primary-light transition-colors"
            href="#"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
