# TV Series Search for Astra Zeneca

This is the home assignment for Astra Zeneca. 

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
  - Threshold is set arbitrarily for 1000ms to load a specific image, I could trigger it myself by setting throttle to "regular 3g" in the dev tools.
