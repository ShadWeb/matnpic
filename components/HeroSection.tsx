// components/HeroSection.tsx
import { useState, useRef, useEffect } from "react";
import { Download, Maximize2, Settings } from "lucide-react";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Vazir");

  const [bgcolor, setbgcolor] = useState("#ffffff");
  const [textcolor, settextcolor] = useState("#000000");

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [imageFormat, setImageFormat] = useState("png");
  const [imageQuality, setImageQuality] = useState(1);
  const [imageScale, setImageScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  type FileEvent = React.ChangeEvent<HTMLInputElement>;

  // ------------ state for text box position & size ------------
  const [box, setBox] = useState({
    x: Math.round(800 / 2 - 100),
    y: Math.round(600 / 2 - 20),
    width: 200,
    height: 40,
  });

  // presets
  const presetSizes = [
    { name: "مربع (1:1)", width: 800, height: 800 },
    { name: "مستطیل (4:3)", width: 800, height: 600 },
    { name: "لنداسکیپ (16:9)", width: 1200, height: 675 },
    { name: "پرتره (9:16)", width: 675, height: 1200 },
    { name: "استوری اینستاگرام", width: 1080, height: 1920 },
    { name: "پست اینستاگرام", width: 1080, height: 1080 },
  ];

  const applyPresetSize = (width: number, height: number) => {
    // scale box position/size proportionally to new canvas size
    setBox((prev) => {
      const wRatio = width / imageSize.width;
      const hRatio = height / imageSize.height;
      return {
        x: Math.round(prev.x * wRatio),
        y: Math.round(prev.y * hRatio),
        width: Math.round(prev.width * wRatio),
        height: Math.round(prev.height * hRatio),
      };
    });
    setImageSize({ width, height });
  };

  const resetPreview = () => {
    setText("");
    setFontSize(32);
    setIsBold(false);
    setIsItalic(false);
    setSelectedFont("Vazir");
    setbgcolor("#ffffff");
    settextcolor("#000000");
    setFile("");
    setImageSize({ width: 800, height: 600 });
    setBox({
      x: Math.round(800 / 2 - 100),
      y: Math.round(600 / 2 - 20),
      width: 200,
      height: 40,
    });
  };

  // ----------- اسکیل پیش‌نمایش -----------
  const getPreviewScale = () => {
    const maxW = 500;
    const maxH = 400;
    return Math.min(maxW / imageSize.width, maxH / imageSize.height, 1);
  };

  const previewScale = getPreviewScale();
  const previewWidth = Math.round(imageSize.width * previewScale);
  const previewHeight = Math.round(imageSize.height * previewScale);

  // wait for image to be loaded before export
  const waitForImageLoad = (src: string) =>
    new Promise<void>((resolve) => {
      if (!src) return resolve();
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });

  // cross-browser fullscreen
  const handleFullscreen = () => {
    const el = previewRef.current;
    if (!el) return;
    // @ts-ignore
    if (el.requestFullscreen) el.requestFullscreen();
    // @ts-ignore
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    // @ts-ignore
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  // ----------- فیکس اصلی برای خروجی دقیق ----------
  const handleCapture = async () => {
    setLoading(true);
    try {
      // ensure fonts loaded
      if ((document as any).fonts && (document as any).fonts.ready) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await (document as any).fonts.ready;
        } catch {
          // ignore
        }
      }

      // wait for background image to load
      if (file) {
        await waitForImageLoad(file);
      }

      const exportEl = exportRef.current;
      if (!exportEl) {
        console.error("exportRef not available");
        setLoading(false);
        return;
      }

      // use html2canvas on the export container
      const canvas = await html2canvas(exportEl, {
        scale: imageScale,
        useCORS: true,
        backgroundColor: file ? null : bgcolor || "#ffffff",
        allowTaint: true,
        logging: false,
        width: imageSize.width,
        height: imageSize.height,
      });

      // MIME
      let mime = "image/png";
      let ext = "png";
      if (imageFormat === "jpg") {
        mime = "image/jpeg";
        ext = "jpg";
      } else if (imageFormat === "webp") {
        mime = "image/webp";
        ext = "webp";
      }

      const link = document.createElement("a");
      link.href = canvas.toDataURL(mime, imageQuality);
      link.download = `matnpic.ir.${ext}`;
      link.click();
    } catch (e) {
      console.error("ERROR in handleCapture:", e);
    } finally {
      setLoading(false);
    }
  };

  const getimagebackground = (e: FileEvent) => {
    const f = e.target.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setFile(url);
    }
  };

  // cleanup created object URLs on unmount
  useEffect(() => {
    return () => {
      if (file && file.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(file);
        } catch {
          /* ignore */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="px-4 mt-2 sm:px-8 md:px-16 lg:px-24 xl:px-40 md:py-20"
      id="home"
    >
      <h1
        className="mx-auto text-center 
               text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
               font-bold leading-snug"
      >
        تبدیل متن به عکس آنلاین رایگان | ساخت تصویر از متن
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Controls Panel */}
        <div className="flex flex-col dark:shadow-soft shadow shadow-primary gap-6 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark backdrop-blur-md">
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
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium">رنگ پس‌زمینه</p>
              <label
                className="size-12 rounded-full border-2 bg-[] border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer overflow-hidden"
                style={{ backgroundColor: `${bgcolor}` }}
              >
                <input
                  value={bgcolor}
                  onChange={(e) => setbgcolor(e.target.value)}
                  className="invisible"
                  name="bg-color"
                  type="color"
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium">تصویر پس‌زمینه</p>
              <label
                style={{
                  backgroundImage: file ? `url(${file})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="w-12 h-12 rounded-full border-2 border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer flex items-center justify-center text-xs text-center"
              >
                {!file && "انتخاب"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={getimagebackground}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium">رنگ متن</p>
              <label
                className="size-12 rounded-full border-2 border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer overflow-hidden"
                style={{ backgroundColor: `${textcolor}` }}
              >
                <input
                  className="invisible"
                  value={textcolor}
                  onChange={(e) => settextcolor(e.target.value)}
                  name="text-color"
                  type="color"
                />
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
              {/* Dana */}
              <option value="Dana-Regular">دانا Regular</option>
              <option value="Dana-Medium">دانا Medium</option>
              <option value="Dana-DemiBold">دانا DemiBold</option>

              {/* IRANSans */}
              <option value="IRANSans-Regular">ایران‌سن‌س Regular</option>
              <option value="IRANSans-Light">ایران‌سن‌س Light</option>
              <option value="IRANSans-Medium">ایران‌سن‌س Medium</option>
              <option value="IRANSans-Bold">ایران‌سن‌س Bold</option>
              <option value="IRANSans-Black">ایران‌سن‌س Black</option>
              <option value="IRANSans-UltraLight">ایران‌سن‌س UltraLight</option>

              {/* Kalameh */}
              <option value="Kalameh-Regular">کلمه Regular</option>
              <option value="Kalameh-Black">کلمه Black</option>

              {/* Morabba */}
              <option value="Morabba-Light">مربع Light</option>
              <option value="Morabba-Medium">مربع Medium</option>
              <option value="Morabba-Bold">مربع Bold</option>

              {/* Vazir */}
              <option value="Vazir">وزیر</option>
              <option value="Arial">Arial</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Times New Roman">Times New Roman</option>
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
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="text-sm font-medium">Bold</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isItalic}
                  onChange={(e) => setIsItalic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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

          {/* Advanced Settings */}
          <div className="border-t border-border-light dark:border-border-dark pt-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-primary transition-colors"
            >
              <Settings size={18} />
              <span>تنظیمات پیشرفته تصویر</span>
            </button>

            {showSettings && (
              <div className="mt-4 space-y-4 p-4 bg-background-light/50 dark:bg-background-dark/50 rounded-lg">
                {/* Image Size */}
                <div>
                  <p className="text-base font-medium pb-2">سایز تصویر</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="text-sm">عرض (پیکسل)</label>
                      <input
                        type="number"
                        value={imageSize.width}
                        onChange={(e) =>
                          setImageSize({
                            ...imageSize,
                            width: parseInt(e.target.value) || 800,
                          })
                        }
                        className="w-full rounded-lg p-2 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
                      />
                    </div>
                    <div>
                      <label className="text-sm">ارتفاع (پیکسل)</label>
                      <input
                        type="number"
                        value={imageSize.height}
                        onChange={(e) =>
                          setImageSize({
                            ...imageSize,
                            height: parseInt(e.target.value) || 600,
                          })
                        }
                        className="w-full rounded-lg p-2 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {presetSizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => applyPresetSize(size.width, size.height)}
                        className="text-xs px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-primary/10 transition-colors"
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Format */}
                <div>
                  <p className="text-base font-medium pb-2">فرمت تصویر</p>
                  <div className="flex gap-4">
                    {["png", "jpg", "webp"].map((format) => (
                      <label
                        key={format}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="image-format"
                          value={format}
                          checked={imageFormat === format}
                          onChange={(e) => setImageFormat(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{format.toUpperCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Image Quality */}
                {imageFormat !== "png" && (
                  <div>
                    <p className="text-base font-medium pb-2">
                      کیفیت تصویر:{" "}
                      <span className="font-bold text-accent">
                        {Math.round(imageQuality * 100)}%
                      </span>
                    </p>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={imageQuality}
                      onChange={(e) =>
                        setImageQuality(parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-primary-light"
                    />
                  </div>
                )}

                {/* Image Scale */}
                <div>
                  <p className="text-base font-medium pb-2">
                    رزولوشن (مقیاس):{" "}
                    <span className="font-bold text-accent">{imageScale}x</span>
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={imageScale}
                    onChange={(e) => setImageScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-primary-light"
                  />
                  <p className="text-xs text-text-light/70 dark:text-text-dark/70 mt-1">
                    رزولوشن بالاتر = کیفیت بهتر اما حجم فایل بیشتر
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={resetPreview}
              className="flex-1 rounded-2xl h-14 px-5 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              بازنشانی
            </button>
            <button
              onClick={handleCapture}
              className="flex-1 flex items-center justify-center rounded-2xl h-14 px-5 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-glow transition-shadow"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  در حال تولید...
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download size={20} />
                  تولید تصویر
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">پیش‌نمایش</h3>
            <div className="text-sm text-text-light/70 dark:text-text-dark/70">
              {imageSize.width} × {imageSize.height} پیکسل
              {previewScale < 1 &&
                ` (مقیاس: ${Math.round(previewScale * 100)}%)`}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              id="preview"
              ref={previewRef}
              style={{
                backgroundColor: `${bgcolor}`,
                backgroundImage: file ? `url(${file})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
                position: "relative",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "hidden",
              }}
              className="flex items-center justify-center"
            >
              {/* Rnd in preview */}
              <Rnd
                bounds="parent"
                size={{
                  width: Math.max(50, Math.round(box.width * previewScale)),
                  height: Math.max(30, Math.round(box.height * previewScale)),
                }}
                position={{
                  x: Math.round(box.x * previewScale),
                  y: Math.round(box.y * previewScale),
                }}
                enableResizing={{
                  bottomRight: true,
                  bottomLeft: true,
                  topRight: true,
                  topLeft: true,
                }}
                minWidth={Math.max(30, Math.round(50 * previewScale))}
                minHeight={Math.max(20, Math.round(30 * previewScale))}
                onDragStop={(_e, d) => {
                  setBox((prev) => ({
                    ...prev,
                    x: Math.round(d.x / previewScale),
                    y: Math.round(d.y / previewScale),
                  }));
                }}
                onResizeStop={(_e, _direction, ref, _delta, position) => {
                  setBox({
                    x: Math.round(position.x / previewScale),
                    y: Math.round(position.y / previewScale),
                    width: Math.round(ref.offsetWidth / previewScale),
                    height: Math.round(ref.offsetHeight / previewScale),
                  });
                }}
              >
                <p
                  style={{
                    fontFamily: selectedFont,
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    color: textcolor,
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    margin: 0,
                    cursor: "move",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                    wordBreak: "break-word",
                    lineHeight: 1.2,
                  }}
                >
                  {text || "متن شما اینجا نمایش داده می‌شود"}
                </p>
              </Rnd>

              {/* Watermark */}
              <div className="absolute bottom-2 left-2 text-xs opacity-30">
                matnpic.ir
              </div>
            </div>
          </div>

          {/* Preview Controls */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-text-light/70 dark:text-text-dark/70">
              متن را می‌توانید با ماوس جابجا و اندازه‌گیری کنید
            </div>
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-1 text-primary hover:text-primary-light transition-colors"
            >
              <Maximize2 size={16} />
              نمایش تمام صفحه
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Hidden export container ---------------- */}
      <div
        ref={exportRef}
        aria-hidden
        style={{
          position: "absolute",
          left: -99999,
          top: -99999,
          width: imageSize.width,
          height: imageSize.height,
          overflow: "hidden",
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: imageSize.width,
            height: imageSize.height,
            backgroundColor: bgcolor,
            backgroundImage: file ? `url(${file})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* متن در exportRef باید دقیقاً مانند پریویو باشد */}
          <div
            style={{
              position: "absolute",
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
              boxSizing: "border-box",
              // ضروری برای مطابقت با Rnd
              cursor: "move",
              userSelect: "none",
            }}
          >
            <p
              style={{
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? "bold" : "normal",
                fontStyle: isItalic ? "italic" : "normal",
                color: textcolor,
                margin: 0,
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                wordBreak: "break-word",
                lineHeight: 1.2,
                boxSizing: "border-box",
              }}
            >
              {text || "متن شما اینجا نمایش داده می‌شود"}
            </p>
          </div>

          {/* watermark */}
          <div
            style={{
              position: "absolute",
              left: 8,
              bottom: 8,
              fontSize: 12,
              opacity: 0.3,
              pointerEvents: "none",
              fontFamily: "Arial, sans-serif",
            }}
          >
            matnpic.ir
          </div>
        </div>
      </div>
    </section>
  );
}
