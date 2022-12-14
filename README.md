# TV Series Search for AstraZeneca

This is the home assignment for AstraZeneca. A demo can be accessed [here](https://tv.banjoanton.com).

## Run

This application is built with `pnpm`, but should have no problems running with `npm` either.

```bash

# install
pnpm install

# run dev locally
pnpm run dev

# preview prod locally
pnpm run build
pnpm run preview

```

## Features

- Search input with debounce effect of 500ms for a smoother experience.
- Keyboard navigation once the result has been presented.
- Entry animation for the result
- Request caching, which will save and re-use repeated requests.
- Error toast with animations (search for "error" to trigger an example).
- Warning toast with animation for slow internet connection.
  - The threshold is set arbitrarily for 1000ms to load a specific image, I could trigger the toast myself by setting throttling to "regular 3g" in the dev tools.
- Responsive design that works on both mobile screens and larger screens.
- Loading animation when searching.
- Tv show information page with a fade-in animation.
- Page navigation with React Router which allows for shareable links.
- Add / remove favorites from card and show page.
- Page for favorites.
- Spring animations on hoverable elements for a more dynamic UI.

## Technologies

- React with TypeScript
- React Router for client routing
- react-spring for a simple hover effect with spring physics
- localStorage to save and maintain favorites
- react-icons for icons
- DOMPurify for string sanitation
- ESLint for linting
- Prettier for formatting
- Vite as developer environment (dev server, build, typescript, etc)
- pnpm as a package manager

## What I would do if I had more time

- Refactor the code to be more modular, with more features added in the end I found myself not having enough time to spend on that and just focused on functionality.
- Tests. A lot of tests could've been added, due to the limited time I choose to spend my time on functionality and design instead of tests. Even though both components, helpers and hooks should've been tested.
- Re-work the state system. The current one works, but it scales quite messy. If I had time I would probably re-work it to use useReducer or Redux or some other neat framework.
- Re-work the Maze API hook, whilst adding feature after feature it got a bit messy towards the end.
- Re-write the application to Svelte ;)