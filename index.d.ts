import type { JSX } from "react";

export interface MD3TimePickerProps {
  value?: Date | null;
  onChange?: (value: Date) => void;
  onClose?: () => void;
}

declare function MD3TimePicker(props: MD3TimePickerProps): JSX.Element;

export default MD3TimePicker;
