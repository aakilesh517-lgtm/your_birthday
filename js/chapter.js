document.addEventListener("DOMContentLoaded", () => {
  const U = BirthdayUtils;
  const n = Number(document.body.dataset.chapter);
  const title = document.getElementById("chapterTitle");
  const date = document.getElementById("chapterDate");
  const message = document.getElementById("chapterMessage");
  const lock = document.getElementById("lockedNotice");

  const unlocked = U.isChapterUnlocked(n);
  if (!unlocked) {
    lock.hidden = false;
    message.textContent = `This chapter is still waiting for its moment. It unlocks on ${U.chapterDateText(n)}.`;
  } else {
    lock.hidden = true;
  }

  date.textContent = `${U.chapterDateText(n)} • IST`;
  document.title = `Chapter ${U.chapterLabel(n)} — Your Journey`;

  if (n === 1) {
    document.querySelector(".chapter-page").classList.add("final-page");
  }
});
