// components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section
      className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-20"
      id="about"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 p-8 md:p-12 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-3xl font-black">متن به تصویر، ساده و قدرتمند</h2>
        <p className="text-base text-text-light/80 dark:text-text-dark/80">
          ما معتقدیم که خلاقیت نباید پیچیده باشد. هدف ما ارائه ابزاری است که به
          هر کسی، از طراحان حرفه‌ای تا کاربران عادی، اجازه می‌دهد تا ایده‌های
          خود را به سرعت و به زیبایی به تصویر بکشند.
        </p>
        <a
          href="#home"
          className="flex items-center justify-center rounded-2xl h-12 px-5 bg-gradient-to-r from-primary to-primary-light text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-glow transition-shadow mt-4"
        >
          <span className="truncate">شروع کنید</span>
        </a>
      </div>
    </section>
  );
}
