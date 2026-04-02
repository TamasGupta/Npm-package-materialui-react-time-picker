# materialui-react-time-picker

A Material Design 3 style React time picker packaged for npm distribution.

## Live Demo

https://tamasgupta.github.io/Npm-package-materialui-react-time-picker/

## Repository

https://github.com/tamasgupta/Npm-package-materialui-react-time-picker

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

The package injects its own stylesheet automatically. If your app prefers explicit CSS imports, this also works:

```jsx
import "materialui-react-time-picker/style.css";
```

## Demo Page

```

The generated demo site is written to `demo-dist/`.
```
