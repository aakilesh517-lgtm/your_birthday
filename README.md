# 30-Day Birthday Journey

## Main flow

index.html
  -> envelope.html
  -> chapters.html
  -> chapters/chap30.html ... chapters/chap01.html

## Important rule

The board displays 01 → 30, but unlocking is reversed:
30 on Aug 13, 29 on Aug 14, ... 01 on Sep 12.
Sep 13 is the birthday/finale state.

All schedule calculations are fixed to IST (Asia/Kolkata) and use 2026.

## Files

- index.html / css/index.css / js/index.js
  Cinematic moon introduction and journey-start countdown.
- envelope.html / css/envelope.css / js/envelope.js
  Envelope, Luna wax seal, seal-breaking animation, 10-second letter-writing animation, continue button.
- chapters.html / css/chapters.css / js/chapters.js
  01–30 visual board, reversed unlock logic, locked chapter alerts, next-chapter timer, birthday boom banner.
- chapters/chapXX.html
  Completely separate chapter HTML files.
- chapters/chapXX.css
  Completely separate chapter CSS files. Use these for unique chapter designs.
- css/chapter.css / js/chapter.js
  Shared chapter mechanics only.
- js/config.js
  One place for global dates and envelope text.
- js/utils.js
  Shared date/time and storage helpers.
- assets/
  moon1.jpg, envelope.png, letter.png, waxseal.png

## Future chapter editing

For Chapter 17, for example:
1. Edit chapters/chap17.html for structure/content.
2. Edit chapters/chap17.css for its design.
3. If Chapter 17 needs special JavaScript, create chapters/chap17.js and add it only to chap17.html.
Do not change other chapter files.

## Audio

Put future audio files inside /audio and add an <audio> element only to the page that needs it.
No audio file is required by the base build.

## Persistence

The schedule is calculated from real IST date/time, so refreshing does not reset the journey.
The project does not depend on a "day counter" stored in localStorage.

## Local testing

Recommended: run a local server from this folder because browsers can restrict some behavior under file://.

Examples:
- VS Code + Live Server
- Python: python -m http.server 8000

Then open http://localhost:8000/


## Chapter 30 design

Chapter 30 is the opening chapter of the daily journey and intentionally has its own visual system:

1. Cinematic night background using `assets/moon1.jpg` at low opacity.
2. Two independently moving star fields.
3. Large outlined `30` behind the content.
4. Two slow orbital rings around the chapter number.
5. "The First Spark" title and a gold cinematic CTA.
6. Clicking "Begin Chapter 30" transitions into a private letter-style message.
7. Chapter 30 has its own `chap30.css` and `chap30.js`.
8. Other chapter pages do not depend on Chapter 30's design.

For development preview, open:
`chapters/chap30.html?preview=1`

The preview parameter is visual-only. The chapter board's real IST unlock schedule is unchanged.


## Development workflow
- Preview the whole chapter board with `chapters.html?preview=1`.
- Preview Chapter 30 with `chapters/chap30/index.html?preview=1`.
- Preview mode never changes the real IST unlock schedule.
- Individual chapters live in their own folders and should be edited independently.
- For future changes, update only the specific chapter/file that needs changing.
