import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MD3TimePicker from "materialui-react-time-picker";
import "../src/style.css";
import "./demo.css";

function formatTime(value) {
  if (!value) return "No time selected";

  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatClockLabel(value, format = "12h") {
  if (!value) return "--:--";

  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: format === "12h",
  });
}

function createCurrentTime() {
  return new Date();
}

const demoTheme = {
  overlayBackground: "rgba(60, 33, 18, 0.28)",
  dialogBackground: "#fff7ef",
  textColor: "#241611",
  dialogBorderRadius: "30px",
  dialogShadow: "0 28px 80px rgba(96, 58, 27, 0.28)",
  labelColor: "#8c5e38",
  segmentBackground: "#f0dfcf",
  segmentTextColor: "#3f261b",
  segmentActiveBackground: "#8e5636",
  segmentActiveTextColor: "#fff7f0",
  segmentHoverBackground: "#e7d2bf",
  borderColor: "#b99172",
  ampmActiveBackground: "#f1d7bf",
  ampmActiveTextColor: "#6b3c21",
  ampmHoverBackground: "#f8e7d8",
  clockFaceBackground: "#f4e2d3",
  accentColor: "#8e5636",
  tickColor: "#362017",
  tickActiveColor: "#fff7f0",
  buttonColor: "#8e5636",
  buttonHoverBackground: "#f3e0cf",
  fontFamily: "\"Space Grotesk\", \"Segoe UI\", sans-serif",
  tickFontSize: "13px",
};

const defaultDemoProps = {
  format: "12h",
  clockSize: 240,
  theme: demoTheme,
};

function buildSampleCode({ format, clockSize, theme }) {
  return `const pickerProps = {
  format: "${format}",
  clockSize: ${clockSize},
  theme: ${JSON.stringify(theme, null, 2)}
};

<MD3TimePicker
  value={value}
  onChange={setValue}
  onClose={() => setOpen(false)}
  {...pickerProps}
/>`;
}

function parseSampleCode(source) {
  const formatMatch = source.match(/format:\s*"(12h|24h)"/);
  const clockSizeMatch = source.match(/clockSize:\s*(\d+)/);
  const themeMatch = source.match(/theme:\s*({[\s\S]*?})\s*};/);

  if (!formatMatch) {
    throw new Error('Missing `format: "12h"` or `format: "24h"`.');
  }

  if (!clockSizeMatch) {
    throw new Error("Missing `clockSize: <number>`.");
  }

  if (!themeMatch) {
    throw new Error("Missing `theme: { ... }`.");
  }

  const parsedTheme = Function(`"use strict"; return (${themeMatch[1]});`)();

  if (!parsedTheme || typeof parsedTheme !== "object" || Array.isArray(parsedTheme)) {
    throw new Error("`theme` must evaluate to an object.");
  }

  return {
    format: formatMatch[1],
    clockSize: Number(clockSizeMatch[1]),
    theme: parsedTheme,
  };
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(() => createCurrentTime());
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [pickerProps, setPickerProps] = useState(defaultDemoProps);
  const [sampleCode, setSampleCode] = useState(() => buildSampleCode(defaultDemoProps));
  const [codeError, setCodeError] = useState("");
  const [preset] = useState(() => {
    const nextValue = new Date();
    nextValue.setHours(9, 30, 0, 0);
    return nextValue;
  });

  useEffect(() => {
    if (isManualSelection) return undefined;

    const syncCurrentTime = () => {
      setValue(createCurrentTime());
    };

    syncCurrentTime();
    const timer = window.setInterval(syncCurrentTime, 1000);

    return () => window.clearInterval(timer);
  }, [isManualSelection]);

  const handleApplyCode = () => {
    try {
      const nextProps = parseSampleCode(sampleCode);
      setPickerProps(nextProps);
      setCodeError("");
    } catch (error) {
      setCodeError(error instanceof Error ? error.message : "Invalid sample code.");
    }
  };

  const handleResetCode = () => {
    const nextCode = buildSampleCode(defaultDemoProps);
    setPickerProps(defaultDemoProps);
    setSampleCode(nextCode);
    setCodeError("");
  };

  return (
    <main className="demo-shell">
      <div className="backdrop-orb orb-one" />
      <div className="backdrop-orb orb-two" />

      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Live Demo</p>
          <h1>Material UI React Time Picker</h1>
          <p className="lead">
            A focused React time picker with a Material Design 3 clock face,
            touch-friendly interactions, and npm-ready packaging.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="open-button"
              onClick={() => setIsOpen(true)}
            >
              Open Picker
            </button>
            <div className="code-card">
              <span className="code-label">Install</span>
              <code>npm install materialui-react-time-picker</code>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-panel">
            <span className="panel-label">Selected time</span>
            <p className="preview-time">{formatClockLabel(value, pickerProps.format)}</p>
            <p className="preview-copy">
              {pickerProps.format === "12h"
                ? formatTime(value)
                : `${formatClockLabel(value, "24h")} in 24-hour format`}
            </p>
          </div>

          <div className="preview-grid">
            <article className="mini-card">
              <span className="mini-label">Preset example</span>
              <strong>{formatClockLabel(preset, pickerProps.format)}</strong>
              <p>Useful for booking flows and schedule forms.</p>
            </article>
            <article className="mini-card">
              <span className="mini-label">Interaction</span>
              <strong>
                {pickerProps.format === "12h" ? "Clock + AM/PM" : "Direct 00-23 clock"}
              </strong>
              <p>
                {pickerProps.format === "12h"
                  ? "Tap, click, or drag across the dial to choose time."
                  : "Use the two-ring hour dial to select 00-23 directly."}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="details-grid">
        <article className="detail-card">
          <span className="detail-kicker">Why this package</span>
          <h2>Built for clean embeds</h2>
          <p>
            Drop it into a React app, control it with state, and let the
            component handle the visual clock experience.
          </p>
        </article>

        <article className="detail-card">
          <span className="detail-kicker">Live props editor</span>
          <p>
            Edit the sample code, apply it, and reopen the picker to preview the
            new styling live.
          </p>
          <textarea
            className="snippet-editor"
            value={sampleCode}
            onChange={(event) => setSampleCode(event.target.value)}
            spellCheck={false}
          />
          <div className="editor-actions">
            <button type="button" className="editor-button" onClick={handleApplyCode}>
              Apply code
            </button>
            <button type="button" className="editor-button ghost" onClick={handleResetCode}>
              Reset
            </button>
          </div>
          {codeError ? <p className="editor-error">{codeError}</p> : null}
        </article>

        <article className="detail-card">
          <span className="detail-kicker">Current demo state</span>
          <ul className="stat-list">
            <li>Selection: {formatClockLabel(value, pickerProps.format)}</li>
            <li>Dialog: {isOpen ? "Open" : "Closed"}</li>
            <li>
              Format: {pickerProps.format === "12h" ? "12-hour with AM/PM" : "24-hour direct selection"}
            </li>
            <li>Clock size: {pickerProps.clockSize}px</li>
          </ul>
        </article>
      </section>

      {isOpen ? (
        <MD3TimePicker
          value={value}
          format={pickerProps.format}
          clockSize={pickerProps.clockSize}
          theme={pickerProps.theme}
          onChange={(nextValue) => {
            setIsManualSelection(true);
            setValue(nextValue);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
