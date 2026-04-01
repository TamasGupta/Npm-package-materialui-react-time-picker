import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import MD3TimePicker from "materialui-react-time-picker";
import "./demo.css";

function formatTime(value) {
  if (!value) return "No time selected";

  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <main className="demo-shell">
      <section className="hero-card">
        <p className="eyebrow">Live Demo</p>
        <h1>Material UI React Time Picker</h1>
        <p className="lead">
          This page demonstrates the published package behavior in a plain React
          app. Open the picker, choose a time, and confirm the selection.
        </p>

        <div className="status-row">
          <div>
            <span className="status-label">Selected time</span>
            <p className="status-value">{formatTime(value)}</p>
          </div>
          <button
            type="button"
            className="open-button"
            onClick={() => setIsOpen(true)}
          >
            Open Demo
          </button>
        </div>

        <div className="code-card">
          <span className="code-label">Install</span>
          <code>npm install materialui-react-time-picker</code>
        </div>
      </section>

      {isOpen ? (
        <MD3TimePicker
          value={value}
          onChange={(nextValue) => {
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
