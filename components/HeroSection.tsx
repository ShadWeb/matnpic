// components/HeroSectionKonva.tsx
import { useState, useRef, useEffect } from "react";
import { Download, Maximize2, Settings } from "lucide-react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Transformer,
  Image as KonvaImage,
} from "react-konva";
import { useImage } from "react-konva-utils";
import Konva from "konva";

// TextBox Component with Transformer
const TextBox = ({
  text,
  textProps,
  isSelected,
  onSelect,
  onChange,
}: {
  text: string;
  textProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}) => {
  const textRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && textRef.current && trRef.current) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={textRef}
        {...textProps}
        text={text || "متن شما اینجا نمایش داده می‌شود"}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...textProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = textRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...textProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(30, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size
            if (Math.abs(newBox.width) < 30 || Math.abs(newBox.height) < 20) {
              return oldBox;
            }
            return newBox;
          }}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
          enabledAnchors={[
            "top-left",
            "top-center",
            "top-right",
            "middle-left",
            "middle-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ]}
          resizeEnabled={true}
          rotateEnabled={true}
        />
      )}
    </>
  );
};

export default function HeroSectionKonva() {
  // Text state
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Vazir");

  // Color state
  const [bgcolor, setbgcolor] = useState("#ffffff");
  const [textcolor, settextcolor] = useState("#000000");

  // File/Image state
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);

  // Canvas/Image state
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [imageFormat, setImageFormat] = useState("png");
  const [imageQuality, setImageQuality] = useState(1);

  // Text box state - now as an object for Transformer compatibility
  const [textBoxProps, setTextBoxProps] = useState({
    x: 300,
    y: 280,
    width: 200,
    height: 40,
    rotation: 0,
    fill: "#000000",
    fontSize: 32,
    fontFamily: "Vazir",
    align: "center" as const,
    verticalAlign: "middle" as const,
    wrap: "word" as const,
  });

  // Selection state
  const [selectedId, setSelectedId] = useState<string | null>("textBox");

  // Stage ref
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load background image
  const [bgImage] = useImage(imageUrl);

  // Preset sizes
  const presetSizes = [
    { name: "مربع (1:1)", width: 800, height: 800 },
    { name: "مستطیل (4:3)", width: 800, height: 600 },
    { name: "لنداسکیپ (16:9)", width: 1200, height: 675 },
    { name: "پرتره (9:16)", width: 675, height: 1200 },
    { name: "استوری اینستاگرام", width: 1080, height: 1920 },
    { name: "پست اینستاگرام", width: 1080, height: 1080 },
  ];

  // Calculate preview scale
  const getPreviewScale = () => {
    if (!containerRef.current) return 1;
    const containerWidth = containerRef.current.offsetWidth;
    const maxScale = containerWidth / imageSize.width;
    return Math.min(maxScale, 1);
  };

  const previewScale = getPreviewScale();
  const previewWidth = Math.round(imageSize.width * previewScale);
  const previewHeight = Math.round(imageSize.height * previewScale);

  // Apply preset size
  const applyPresetSize = (width: number, height: number) => {
    const scaleX = width / imageSize.width;
    const scaleY = height / imageSize.height;

    setTextBoxProps((prev) => ({
      ...prev,
      x: prev.x * scaleX,
      y: prev.y * scaleY,
      width: prev.width * scaleX,
      height: prev.height * scaleY,
    }));

    setImageSize({ width, height });
  };

  // Reset everything
  const resetPreview = () => {
    setText("");
    setFontSize(32);
    setIsBold(false);
    setIsItalic(false);
    setSelectedFont("Vazir");
    setbgcolor("#ffffff");
    settextcolor("#000000");
    setFile(null);
    setImageUrl("");
    setImageSize({ width: 800, height: 600 });
    setTextBoxProps({
      x: 300,
      y: 280,
      width: 200,
      height: 40,
      rotation: 0,
      fill: "#000000",
      fontSize: 32,
      fontFamily: "Vazir",
      align: "center",
      verticalAlign: "middle",
      wrap: "word",
    });
  };

  // Handle file upload
  const getimagebackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // Handle text box changes
  const handleTextBoxChange = (newAttrs: any) => {
    setTextBoxProps((prev) => ({
      ...prev,
      ...newAttrs,
    }));
  };

  // Handle stage click for deselection
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  // Export image
  const handleCapture = async () => {
    setLoading(true);

    try {
      if (!stageRef.current) {
        console.error("Stage ref not available");
        return;
      }

      // Create a temporary stage for export (full size)
      const tempStage = new Konva.Stage({
        width: imageSize.width,
        height: imageSize.height,
        container: document.createElement("div"),
      });

      const tempLayer = new Konva.Layer();
      tempStage.add(tempLayer);

      // Add background
      if (bgImage) {
        const bgImg = new Konva.Image({
          image: bgImage,
          width: imageSize.width,
          height: imageSize.height,
        });
        tempLayer.add(bgImg);
      } else {
        const bgRect = new Konva.Rect({
          width: imageSize.width,
          height: imageSize.height,
          fill: bgcolor,
        });
        tempLayer.add(bgRect);
      }

      // Add text with current font style
      const textNode = new Konva.Text({
        x: textBoxProps.x,
        y: textBoxProps.y,
        width: textBoxProps.width,
        height: textBoxProps.height,
        text: text || "متن شما اینجا نمایش داده می‌شود",
        fontSize: fontSize,
        fontFamily: selectedFont,
        fill: textcolor,
        align: "center",
        verticalAlign: "middle",
        fontStyle: (isBold ? "bold " : "") + (isItalic ? "italic" : ""),
        wrap: "word",
      });
      tempLayer.add(textNode);

      // Add watermark
      const watermark = new Konva.Text({
        x: 8,
        y: imageSize.height - 20,
        text: "matnpic.ir",
        fontSize: 12,
        fontFamily: "Arial",
        fill: "#000000",
        opacity: 0.3,
      });
      tempLayer.add(watermark);

      tempLayer.draw();

      // Export
      const dataURL = tempStage.toDataURL({
        mimeType:
          imageFormat === "jpg"
            ? "image/jpeg"
            : imageFormat === "webp"
            ? "image/webp"
            : "image/png",
        quality: imageQuality,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `matnpic.ir.${imageFormat}`;
      link.click();

      // Cleanup
      tempStage.destroy();
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update text box props when font/color changes
  useEffect(() => {
    setTextBoxProps((prev) => ({
      ...prev,
      fill: textcolor,
      fontSize: fontSize,
      fontFamily: selectedFont,
    }));
  }, [textcolor, fontSize, selectedFont]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Font weight and style
  const fontStyle = (isBold ? "bold " : "") + (isItalic ? "italic" : "");

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
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="w-12 h-12 rounded-full border-2 border-border-light dark:border-border-dark ring-2 ring-transparent ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark has-[:checked]:ring-primary cursor-pointer flex items-center justify-center text-xs text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                {!imageUrl && "انتخاب"}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={getimagebackground}
                className="hidden"
              />
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
              disabled={loading}
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

          <div
            ref={containerRef}
            className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
              margin: "0 auto",
            }}
          >
            <Stage
              ref={stageRef}
              width={previewWidth}
              height={previewHeight}
              scaleX={previewScale}
              scaleY={previewScale}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
            >
              <Layer>
                {/* Background */}
                {bgImage ? (
                  <KonvaImage
                    image={bgImage}
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                ) : (
                  <Rect
                    width={imageSize.width}
                    height={imageSize.height}
                    fill={bgcolor}
                  />
                )}

                {/* Text Box */}
                <TextBox
                  text={text}
                  textProps={{
                    ...textBoxProps,
                    fontStyle: fontStyle,
                  }}
                  isSelected={selectedId === "textBox"}
                  onSelect={() => setSelectedId("textBox")}
                  onChange={handleTextBoxChange}
                />

                {/* Watermark */}
                <Text
                  x={8}
                  y={imageSize.height - 20}
                  text="matnpic.ir"
                  fontSize={12}
                  fontFamily="Arial"
                  fill="#000000"
                  opacity={0.3}
                />
              </Layer>
            </Stage>
          </div>

          {/* Preview Controls */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-text-light/70 dark:text-text-dark/70">
              متن را می‌توانید با ماوس جابجا، تغییر اندازه و چرخش دهید
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
