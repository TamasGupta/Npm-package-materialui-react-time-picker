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
  });
}

function formatClockLabel(value) {
  if (!value) return "--:--";

  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createCurrentTime() {
  return new Date();
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(() => createCurrentTime());
  const [isManualSelection, setIsManualSelection] = useState(false);
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
            <p className="preview-time">{formatClockLabel(value)}</p>
            <p className="preview-copy">{formatTime(value)}</p>
          </div>

          <div className="preview-grid">
            <article className="mini-card">
              <span className="mini-label">Preset example</span>
              <strong>{formatClockLabel(preset)}</strong>
              <p>Useful for booking flows and schedule forms.</p>
            </article>
            <article className="mini-card">
              <span className="mini-label">Interaction</span>
              <strong>Clock + AM/PM</strong>
              <p>Tap, click, or drag across the dial to choose time.</p>
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
          <span className="detail-kicker">Usage shape</span>
          <pre className="snippet">
{`<MD3TimePicker
  value={value}
  onChange={setValue}
  onClose={() => setOpen(false)}
/>`}
          </pre>
        </article>

        <article className="detail-card">
          <span className="detail-kicker">Current demo state</span>
          <ul className="stat-list">
            <li>Selection: {formatTime(value)}</li>
            <li>Dialog: {isOpen ? "Open" : "Closed"}</li>
            <li>Format: 12-hour with AM/PM</li>
          </ul>
        </article>
      </section>

      {isOpen ? (
        <MD3TimePicker
          value={value}
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
