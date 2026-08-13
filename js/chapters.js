document.addEventListener("DOMContentLoaded", () => {
  const U = BirthdayUtils;
  const board = document.getElementById("chapterBoard");
  const statusKicker = document.getElementById("statusKicker");
  const statusTitle = document.getElementById("statusTitle");
  const statusDetail = document.getElementById("statusDetail");
  const timerLabel = document.getElementById("timerLabel");
  const mainTimer = document.getElementById("mainTimer");
  const birthdayBanner = document.getElementById("birthdayBanner");
  const preview = new URLSearchParams(location.search).get("preview") === "1";

  for (let n = 1; n <= 30; n++) {
    const card = document.createElement("button");
    card.className = "chapter-card";
    card.dataset.chapter = n;
    card.innerHTML = `<span class="num">${U.chapterLabel(n)}</span><span class="date">${U.chapterDateText(n)}</span>`;
    card.addEventListener("click", () => openChapter(n));
    board.appendChild(card);
  }

  function openChapter(n) {
    if (!preview && !U.isChapterUnlocked(n)) {
      const start = U.chapterStartInstant(n);
      const d = U.diffParts(start.getTime() - Date.now());
      alert(`🔒 Chapter ${U.chapterLabel(n)} is locked.\nCome back when its countdown reaches zero.\n\nUnlocks in ${U.formatCountdown(d)}.`);
      return;
    }
    const folder = `chapter${U.chapterLabel(n)}`;
    window.location.href = `chapters/${folder}/index.html${preview ? "?preview=1" : ""}`;
  }

  function render() {
    const state = U.state();
    const current = U.chapterNumber();
    document.querySelectorAll(".chapter-card").forEach(card => {
      const n = Number(card.dataset.chapter);
      const unlocked = preview || U.isChapterUnlocked(n);
      card.classList.toggle("unlocked", unlocked);
      card.classList.toggle("locked", !unlocked);
      card.classList.toggle("current", current === n);
      card.setAttribute("aria-label", unlocked ? `Chapter ${n}, unlocked` : `Chapter ${n}, locked`);
    });

    if (preview) {
      statusKicker.textContent = "DESIGN PREVIEW";
      statusTitle.textContent = "30 chapters — visual preview";
      statusDetail.textContent = "Preview mode • real IST unlock dates are unchanged";
      timerLabel.textContent = "PREVIEW";
      mainTimer.textContent = "CHAPTER 30 READY";
      birthdayBanner.hidden = true;
    } else if (state === "prestart") {
      statusKicker.textContent = "THE JOURNEY STARTS IN";
      statusTitle.textContent = "Chapter 30 is waiting";
      statusDetail.textContent = "13 August • 12:00 AM IST";
      timerLabel.textContent = "UNTIL CHAPTER 30";
      mainTimer.textContent = U.formatCountdown(U.countdownTo(U.startInstant()));
      birthdayBanner.hidden = true;
    } else if (state === "birthday") {
      statusKicker.textContent = "THE FINAL MOMENT";
      statusTitle.textContent = "Today is the birthday 🎂";
      statusDetail.textContent = "13 September • All 30 chapters are unlocked";
      timerLabel.textContent = "THE JOURNEY";
      mainTimer.textContent = "COMPLETE";
      birthdayBanner.hidden = false;
    } else {
      statusKicker.textContent = "YOUR CHAPTER FOR TODAY";
      statusTitle.textContent = `Chapter ${U.chapterLabel(current)} is unlocked`;
      statusDetail.textContent = `${U.chapterDateText(current)} • Come back tomorrow for the next chapter`;
      timerLabel.textContent = "NEXT CHAPTER IN";
      const next = current > 1 ? U.chapterStartInstant(current - 1) : U.birthdayInstant();
      mainTimer.textContent = U.formatCountdown(U.countdownTo(next));
      birthdayBanner.hidden = true;
    }
  }
  render();
  setInterval(render, 1000);
});
