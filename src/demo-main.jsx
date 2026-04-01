import React, { StrictMode } from "react";
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

function DemoApp() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  return (
    <main className="demo-shell">
      <section className="demo-panel">
        <p className="demo-eyebrow">Local Playground</p>
        <h1>materialui-react-time-picker</h1>
        <p className="demo-copy">
          This demo runs from the package repo and imports the component through
          the package name.
        </p>
        <p className="demo-value">{formatTime(value)}</p>
        <button type="button" className="demo-button" onClick={() => setIsOpen(true)}>
          Open Time Picker
        </button>
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
    <DemoApp />
  </StrictMode>,
);
