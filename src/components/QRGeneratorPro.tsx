import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { DotType, CornerSquareType, CornerDotType } from "qr-code-styling";

const QRGeneratorPro: React.FC = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);

  // QR content
  const [text, setText] = useState<string>("");

  // Style settings
  const [dotStyle, setDotStyle] = useState<DotType>("square");
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotType>("square");
  const [cornerSquareStyle, setCornerSquareStyle] =
    useState<CornerSquareType>("square");

  // Colors
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  // Logo
  const [logo, setLogo] = useState<string | null>(null);

  // QR Code instance
  const qr = useRef(
    new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      image: undefined,
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      cornersDotOptions: {
        type: "square",
      },
      cornersSquareOptions: {
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
    })
  ).current;

  /** Append QR instance to DOM */
  useEffect(() => {
    if (qrRef.current) {
      qr.append(qrRef.current);
    }
  }, []);

  /** Update QR code when settings change */
  useEffect(() => {
    qr.update({
      data: text,
      image: logo || undefined,
      dotsOptions: {
        color: fgColor,
        type: dotStyle,
      },
      cornersDotOptions: {
        type: cornerDotStyle,
      },
      cornersSquareOptions: {
        type: cornerSquareStyle,
      },
      backgroundOptions: {
        color: bgColor,
      },
    });
  }, [
    text,
    logo,
    dotStyle,
    cornerDotStyle,
    cornerSquareStyle,
    fgColor,
    bgColor,
  ]);

  /** Handle logo upload */
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /** Download QR code in selected format */
  const download = (format: "png" | "jpeg" | "svg") => {
    qr.download({ name: "qrcode", extension: format });
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Professional QR Code Generator (Logo • Colors • Styles)</h2>

      {/* QR Content Input */}
      <input
        type="text"
        placeholder="Enter text or URL (auto-detects URLs)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20 }}
      />

      {/* Style Settings */}
      <h3>Style Settings</h3>

      <label>Dot Style:</label>
      <select
        value={dotStyle}
        onChange={(e) => setDotStyle(e.target.value as DotType)}
      >
        <option value="square">Square</option>
        <option value="dots">Dots</option>
        <option value="rounded">Rounded</option>
        <option value="classy">Classy</option>
        <option value="classy-rounded">Classy Rounded</option>
        <option value="extra-rounded">Extra Rounded</option>
      </select>

      <br />
      <br />

      <label>Corner Dot Style:</label>
      <select
        value={cornerDotStyle}
        onChange={(e) => setCornerDotStyle(e.target.value as CornerDotType)}
      >
        <option value="square">Square</option>
        <option value="dot">Dot</option>
      </select>

      <br />
      <br />

      <label>Corner Square Style:</label>
      <select
        value={cornerSquareStyle}
        onChange={(e) =>
          setCornerSquareStyle(e.target.value as CornerSquareType)
        }
      >
        <option value="square">Square</option>
        <option value="extra-rounded">Extra Rounded</option>
      </select>

      {/* Colors */}
      <br />
      <br />
      <h3>Color Settings</h3>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <label>Foreground Color</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </div>

        <div>
          <label>Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>

      {/* Logo Upload */}
      <br />
      <h3>Upload Logo (optional)</h3>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />

      {/* QR Preview */}
      <br />
      <br />

      <div
        ref={qrRef}
        style={{ margin: "auto", width: 300, height: 300 }}
      />

      {/* Download Buttons */}
      <h3>Download QR Code</h3>
      <button onClick={() => download("png")}>Download PNG</button>
      <button onClick={() => download("jpeg")}>Download JPG</button>
      <button onClick={() => download("svg")}>Download SVG</button>
    </div>
  );
};

export default QRGeneratorPro;
