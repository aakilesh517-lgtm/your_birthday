document.addEventListener("DOMContentLoaded", () => {
  const C = BIRTHDAY_CONFIG;
  const U = BirthdayUtils;
  const title = document.getElementById("introTitle");
  const subtitle = document.getElementById("introSubtitle");
  const countdown = document.getElementById("journeyCountdown");
  const card = document.getElementById("prestartCard");
  const btn = document.getElementById("beginBtn");
  const started = document.getElementById("alreadyStarted");

  subtitle.textContent = C.introSubtitle;

  let i = 0;
  const text = C.introTitle;
  const type = () => {
    title.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(type, 55);
  };
  type();

  function tick() {
    const state = U.state();
    if (state === "prestart") {
      card.hidden = false;
      countdown.textContent = U.formatCountdown(U.countdownTo(U.startInstant()));
      btn.innerHTML = "<span>Preview The Journey</span><i>✦</i>";
    } else {
      card.hidden = true;
      started.hidden = false;
      btn.innerHTML = "<span>Enter The Journey</span><i>✦</i>";
    }
  }
  tick();
  setInterval(tick, 1000);

  btn.addEventListener("click", () => {
    window.location.href = "envelope.html";
  });
});
