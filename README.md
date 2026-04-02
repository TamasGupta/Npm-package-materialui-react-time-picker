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
          format="24h"
          clockSize={240}
          theme={{
            accentColor: "#8e5636",
            dialogBackground: "#fff7ef",
            clockFaceBackground: "#f4e2d3",
            buttonColor: "#8e5636"
          }}
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

## Styling

You can customize the picker through the `theme` prop and resize the clock with `clockSize`.

Set `format="12h"` for an AM/PM picker or `format="24h"` for direct `00-23` selection.

Available theme keys include:

- `accentColor`
- `dialogBackground`
- `textColor`
- `clockFaceBackground`
- `segmentBackground`
- `segmentActiveBackground`
- `buttonColor`
- `overlayBackground`
- `fontFamily`

## Demo Page

```

The generated demo site is written to `demo-dist/`.
```
