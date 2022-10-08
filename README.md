# TV Series Search for AstraZeneca

This is the home assignment for AstraZeneca.

## Run

```bash

# install
npm install

# run dev locally
npm run dev

# preview prod locally
npm run build
npm run preview

```

## Features

- Search input with debounce effect of 500ms for a smoother experience
- Keyboard navigation once the result has been presented
- Request caching, which will save and re-use repeated requests
- Error toast with animations (search for "error" to trigger an example)
- Warning toast with animation for slow internet connection
  - The threshold is set arbitrarily for 1000ms to load a specific image, I could trigger the toast myself by setting throttling to "regular 3g" in the dev tools.
- Responsive design that works on both mobile screens and larger screens.
- Loading animation when searching.
- Tv show information page with a fade-in animation.
- Page navigation with React Router which allows for shareable links.
