const points = [
  {
    title: "Earrings",
    text: "There is something about the way those earrings frame your face... They add the tiniest sparkle, yet somehow make your whole look feel even more graceful.",
    image: "images/01-earrings.png"
  },
  {
    title: "Bangles",
    text: "Those bangles on your hands have their own kind of charm... especially when they move with you and create that little sound that makes you even more beautiful.",
    image: "images/02-bangles.png"
  },
  {
    title: "Bindi",
    text: "It is just a tiny little dot... but the moment you wear a bindi, your entire face feels different. Simple, graceful, and incredibly beautiful.",
    image: "images/03-bindi.png"
  },
  {
    title: "Anklets",
    text: "And those little anklets... there is something beautiful about the way they rest around your feet, turning even your simplest steps into something I could watch forever.",
    image: "images/04-anklets.png"
  },
  {
    title: "Flowers in your hair",
    text: "But when you put flowers in your hair... somehow everything changes. You look soft, graceful, traditional, and completely unforgettable.",
    image: "images/05-flowers-in-hair.png"
  },
  {
    title: "That beautiful saree",
    text: "And then there is the saree. The way you carry it, the way it falls around you, and the way all those little details come together... you make traditional beauty look effortless.",
    image: "images/06-saree.png"
  }
];

const introScreen = document.getElementById("introScreen");
const momentsScreen = document.getElementById("momentsScreen");
const combinationScreen = document.getElementById("combinationScreen");

const beginButton = document.getElementById("beginButton");
const nextButton = document.getElementById("nextButton");

const imagePlaceholder = document.getElementById("imagePlaceholder");
const momentImage = document.getElementById("momentImage");
const pointNumber = document.getElementById("pointNumber");
const pointTitle = document.getElementById("pointTitle");
const pointText = document.getElementById("pointText");

const progressDots = [...document.querySelectorAll("#progress span")];

let currentPoint = 0;
let typingTimer = null;

function typeText(text) {
  clearInterval(typingTimer);

  pointText.textContent = "";
  nextButton.classList.remove("show");

  let character = 0;

  typingTimer = setInterval(() => {
    pointText.textContent += text[character];
    character += 1;

    if (character >= text.length) {
      clearInterval(typingTimer);
      nextButton.classList.add("show");
    }
  }, 28);
}

function updatePoint(index, firstLoad = false) {
  currentPoint = index;

  const point = points[index];

  pointNumber.textContent = String(index + 1).padStart(2, "0");
  pointTitle.textContent = point.title;

  progressDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  /*
    Images are intentionally optional for now.
    When the image files are added, the image appears automatically.
  */
  if (point.image) {
    const testImage = new Image();

    testImage.onload = () => {
      momentImage.src = point.image;
      momentImage.alt = point.title;
      momentImage.classList.add("loaded");
      imagePlaceholder.style.display = "none";
    };

    testImage.onerror = () => {
      momentImage.classList.remove("loaded");
      imagePlaceholder.style.display = "grid";
    };

    testImage.src = point.image;
  }

  typeText(point.text);
}

beginButton.addEventListener("click", () => {
  introScreen.classList.remove("active");

  setTimeout(() => {
    momentsScreen.classList.add("active");
    updatePoint(0, true);
  }, 450);
});

nextButton.addEventListener("click", () => {
  if (currentPoint < points.length - 1) {
    updatePoint(currentPoint + 1);
    return;
  }

  /*
    Six points are complete.
    Move to the balanced grand reveal.
  */
  momentsScreen.classList.remove("active");

  setTimeout(() => {
    combinationScreen.classList.add("active");

    // Let the merge and final reveal finish before showing the music card.
    setTimeout(showMusicCard, 7200);
  }, 500);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && nextButton.classList.contains("show")) {
    nextButton.click();
  }
});


/* Final image is optional until the artwork is added. */
const finalGirl = document.getElementById("girlImage");
const finalPlaceholder = document.querySelector(".girl-placeholder");

if (finalGirl) {
  const finalTest = new Image();
  finalTest.onload = () => {
    finalGirl.src = "images/traditional-girl-final.png";
    finalGirl.classList.add("loaded");
    finalGirl.style.display = "block";
    if (finalPlaceholder) finalPlaceholder.style.display = "none";
  };
  finalTest.onerror = () => {};
  finalTest.src = "images/traditional-girl-final.png";
}


/* ================================
   FINAL MUSIC CARD
   ================================ */

const musicScreen = document.getElementById("musicScreen");
const musicPlay = document.getElementById("musicPlay");
const musicPlayIcon = document.getElementById("musicPlayIcon");
const journeyMusic = document.getElementById("journeyMusic");
const musicProgress = document.getElementById("musicProgress");

if (musicPlay && journeyMusic) {
  musicPlay.addEventListener("click", async () => {
    if (journeyMusic.paused) {
      try {
        await journeyMusic.play();
        musicPlayIcon.textContent = "Ⅱ";
      } catch (error) {
        musicPlayIcon.textContent = "▶";
      }
    } else {
      journeyMusic.pause();
      musicPlayIcon.textContent = "▶";
    }
  });

  journeyMusic.addEventListener("timeupdate", () => {
    if (!journeyMusic.duration) return;
    musicProgress.style.width =
      `${(journeyMusic.currentTime / journeyMusic.duration) * 100}%`;
  });

  journeyMusic.addEventListener("ended", () => {
    musicPlayIcon.textContent = "▶";
    musicProgress.style.width = "0%";
  });
}

function showMusicCard() {
  if (!musicScreen) return;
  combinationScreen.classList.remove("active");
  musicScreen.classList.add("active");
}


/* =========================================================
   VISIT MUSIC CARD NAVIGATION
   ========================================================= */

const visitMusicButton = document.getElementById("visitMusicButton");

if (visitMusicButton && musicScreen) {
  visitMusicButton.addEventListener("click", () => {
    combinationScreen.classList.remove("active");

    setTimeout(() => {
      musicScreen.classList.add("active");
    }, 300);
  });
}


/* =========================================================
   SHOW NEXT CHAPTER / ALL CHAPTERS ONLY AFTER MUSIC ENDS
   ========================================================= */

const finalMusicSection = document.getElementById("musicScreen");
const finalMusic = document.getElementById("journeyMusic");
const musicChapterActions = document.getElementById("musicChapterActions");

if (finalMusicSection && finalMusic && musicChapterActions) {
    // Keep the final navigation hidden until the song is completely finished.
    finalMusicSection.classList.remove("music-complete");

    finalMusic.addEventListener("ended", () => {
        finalMusicSection.classList.add("music-complete");

        // Make the buttons visible and bring them into view.
        requestAnimationFrame(() => {
            musicChapterActions.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });
}
