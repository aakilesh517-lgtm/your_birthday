# Chapter Folder Structure

Each chapter is now self-contained in a standard folder:

chapters/chapter01/ through chapters/chapter30/

Every chapter folder should contain an `index.html` as its entry page. You may include any CSS, JS, images, audio, fonts, or other assets inside that chapter folder.

To replace a placeholder chapter later, replace the entire corresponding folder, keeping the folder name unchanged.

Example:

chapters/chapter05/
  index.html
  style.css
  script.js
  assets/...

The main project opens chapters through `chapters.js`, so the folder names are the stable connection points.
