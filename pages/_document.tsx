// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html dir="rtl" lang="fa">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* --- SEO META TAGS --- */}
        <title>تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن</title>
        <title>
          تبدیل عکس به پی دی اف آنلاین | تبدیل چند عکس به یک فایل PDF در گوشی و
          آیفون
        </title>
        <meta
          property="og:title"
          content="تبدیل عکس به PDF آنلاین | ساخت چند عکس در یک فایل PDF"
        />
        <meta
          name="title"
          content="تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن"
        />

        <meta
          name="description"
          content="تبدیل متن به عکس آنلاین هوش مصنوعی با بهترین کیفیت. ابزار حرفه‌ای و رایگان برای تبدیل متن به عکس فارسی، ساخت تصویر از نوشته‌ها و ربات تبدیل متن به عکس آنلاین."
        />

        <meta
          name="keywords"
          content="تبدیل متن به عکس, تبدیل متن به عکس آنلاین, تبدیل متن به عکس فارسی, تبدیل متن به عکس هوش مصنوعی, ساخت تصویر از متن, ربات تبدیل متن به عکس رایگان, text to image"
        />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="fa" />

        {/* --- OpenGraph (برای سوشال مدیا) --- */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن"
        />
        <meta
          property="og:description"
          content="سریع‌ترین و بهترین ابزار تبدیل متن به عکس فارسی و هوش مصنوعی. کاملاً رایگان."
        />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="Text To Image AI" />
        {/* در صورت داشتن عکس کاور این را تغییر بده */}

        {/* --- Twitter Card --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن"
        />
        <meta
          name="twitter:description"
          content="ابزار حرفه‌ای تبدیل متن به عکس آنلاین با کیفیت بالا و پشتیبانی از زبان فارسی."
        />
        <meta name="twitter:image" content="/cover.jpg" />

        {/* --- JSON-LD Structured Data (SEO حرفه‌ای) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "تبدیل متن به عکس آنلاین رایگان",
              alternateName: "ساخت تصویر از متن",
              url: "https://your-domain.com",
              description:
                "ابزار تبدیل متن به عکس آنلاین هوش مصنوعی با بالاترین کیفیت و پشتیبانی از متن فارسی.",
              keywords:
                "تبدیل متن به عکس آنلاین, تبدیل متن به عکس فارسی, ساخت تصویر از متن, تبدیل متن به عکس هوش مصنوعی",
            }),
          }}
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>

      <body className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark font-display">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
