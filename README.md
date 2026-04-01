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

The package injects its own stylesheet automatically. If your app prefers explicit CSS imports, this also works:

```jsx
import "materialui-react-time-picker/style.css";
```

## Demo Page

Run the demo locally:

```bash
npm run demo
```

Build the static demo page:

```bash
npm run build:demo
```

The generated demo site is written to `demo-dist/`. You can deploy that folder to GitHub Pages, Netlify, Vercel static hosting, or any static web host.

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-demo.yml` that deploys the demo automatically to GitHub Pages on every push to `main`.

To enable it:

1. Push this repo to GitHub.
2. Open the repository settings.
3. Go to `Pages`.
4. Set `Source` to `GitHub Actions`.

After that, each push to `main` will rebuild and publish the demo site automatically.
