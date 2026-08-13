document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("envelopeWrap");
  const wax = document.getElementById("waxButton");
  const hint = document.getElementById("sealHint");
  const letter = document.getElementById("letterWrap");
  const writing = document.getElementById("handwriting");
  const cursor = document.getElementById("cursor");
  const quill = document.getElementById("quill");
  const caption = document.getElementById("sceneCaption");
  const continueBtn = document.getElementById("continueBtn");

  let opened = false;

  wax.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    wrap.classList.remove("sealed");
    wrap.classList.add("opening");
    hint.style.opacity = "0";
    caption.textContent = "The seal has been broken...";
    setTimeout(() => {
      letter.classList.add("show");
      caption.textContent = "A few words, written just for you.";
      startWriting();
    }, 850);
  });

  function startWriting() {
    quill.classList.add("writing");
    const lines = BIRTHDAY_CONFIG.envelopeLetter;
    const full = lines.join("\n\n");
    const duration = 10000;
    const interval = Math.max(18, Math.floor(duration / Math.max(full.length, 1)));
    let i = 0;
    const startedAt = performance.now();

    function moveQuillToWritingEnd() {
      if (!writing.textContent.length) return;

      const range = document.createRange();
      const textNode = writing.firstChild;
      if (!textNode) return;

      const endOffset = Math.min(i, textNode.textContent.length);
      range.setStart(textNode, endOffset);
      range.setEnd(textNode, endOffset);

      let rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) {
        range.setStart(textNode, Math.max(0, endOffset - 1));
        range.setEnd(textNode, Math.max(0, endOffset - 1));
        rect = range.getBoundingClientRect();
      }

      const letterRect = letter.getBoundingClientRect();
      const x = rect.left - letterRect.left + 2;
      const y = rect.top - letterRect.top + rect.height * 0.72;

      // The quill tip is near its lower-left side, so place that tip on the
      // current writing position and rotate it naturally as the line changes.
      const nearRightEdge = rect.left > letterRect.left + letterRect.width * 0.68;
      const angle = nearRightEdge ? -10 : -18;
      quill.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    }

    function frame(now) {
      i = Math.min(full.length, Math.floor((now - startedAt) / interval));
      writing.textContent = full.slice(0, i);
      moveQuillToWritingEnd();

      if (i < full.length) requestAnimationFrame(frame);
      else finish();
    }
    requestAnimationFrame(frame);

    function finish() {
      cursor.style.display = "none";
      quill.classList.remove("writing");
      quill.classList.add("finished");
      letter.classList.add("finished");
      caption.textContent = "Keep going. There are 30 chapters waiting.";
      setTimeout(() => { continueBtn.hidden = false; }, 450);
    }
  }

  continueBtn.addEventListener("click", () => {
    window.location.href = "chapters.html";
  });
});
