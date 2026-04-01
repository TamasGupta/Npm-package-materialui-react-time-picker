import "./style.css";
import styleText from "./style.css?inline";

const STYLE_ID = "materialui-react-time-picker-styles";

if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ID;
  styleElement.textContent = styleText;
  document.head.appendChild(styleElement);
}

export { default } from "./MD3TimePicker.jsx";
