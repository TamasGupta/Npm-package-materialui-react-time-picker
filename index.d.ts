import type { JSX } from "react";

export interface MD3TimePickerTheme {
  overlayBackground?: string;
  dialogBackground?: string;
  textColor?: string;
  dialogBorderRadius?: string;
  dialogShadow?: string;
  labelColor?: string;
  segmentBackground?: string;
  segmentTextColor?: string;
  segmentActiveBackground?: string;
  segmentActiveTextColor?: string;
  segmentHoverBackground?: string;
  borderColor?: string;
  ampmActiveBackground?: string;
  ampmActiveTextColor?: string;
  ampmHoverBackground?: string;
  clockFaceBackground?: string;
  accentColor?: string;
  tickColor?: string;
  tickActiveColor?: string;
  buttonColor?: string;
  buttonHoverBackground?: string;
  fontFamily?: string;
  tickFontSize?: string;
}

export interface MD3TimePickerProps {
  value?: Date | null;
  onChange?: (value: Date) => void;
  onClose?: () => void;
  className?: string;
  style?: JSX.IntrinsicElements["div"]["style"];
  clockSize?: number;
  theme?: MD3TimePickerTheme;
}

declare function MD3TimePicker(props: MD3TimePickerProps): JSX.Element;

export default MD3TimePicker;
