# materialui-react-time-picker

A Material Design 3 style React time picker packaged for npm distribution.

## Install

```bash
npm install materialui-react-time-picker
```

This package expects `react` and `react-dom` to already exist in the consuming app.

## Usage

```jsx
import { useState } from "react";
import MD3TimePicker from "materialui-react-time-picker";

export default function Example() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Pick time
      </button>

      {open ? (
        <MD3TimePicker
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
```

The package imports its own stylesheet automatically.
