# Research: Enhanced UI & UX Implementation

## Localization (i18n) & RTL

- **Approach**: A global Alpine.js store `app` will hold `lang: 'en' | 'ar'`.
- **Direction**: Use `:dir="lang === 'ar' ? 'rtl' : 'ltr'"` on the root element.
- **Translations**: Strings mapped by key: `i18n[lang].title`.

## Theme Support

- **Approach**: Tailwind `dark:` variant combined with a `theme` variable in Alpine.js.
- **Persistence**: Store `theme` in `localStorage`. Apply `.dark` class to `html` element.

## Playlist Range Filtering

- **Input**: Two number fields (Start, End).
- **Backend Logic**:
    - Fetch all items as before.
    - Slice the items array: `items.slice(start - 1, end)`.
    - Sum the sliced durations.
- **Caveat**: Range applies to the order returned by the YouTube API (usually position).

## Auto Paste Detection

- **Logic**: Use `@paste` event on the textarea.
- **regex**: Scan the pasted text for `list=([^#&?]+)` and trigger calculation if match found.

## Performance Optimization

- **Skeleton Loaders**: Use CSS pulsing animations for results and breakdown table during `loading = true`.
- **Gzip**: Ensure the total weight remains low by avoiding large i18n libraries (vanilla JS is enough).
