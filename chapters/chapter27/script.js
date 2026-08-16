const introScene = document.getElementById("introScene");
const beginBtn = document.getElementById("beginBtn");

const story = document.getElementById("story");
const pointScenes = document.querySelectorAll(".point-scene");
const storyNav = document.getElementById("storyNav");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const sceneNumber = document.getElementById("sceneNumber");

const songScene = document.getElementById("songScene");
const completeScene = document.getElementById("completeScene");

const song = document.getElementById("chapterSong");
const playBtn = document.getElementById("playBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const seekFill = document.getElementById("seekFill");
const songNext = document.getElementById("songNext");

const chapter26Btn = document.getElementById("chapter26Btn");
const allChaptersBtn = document.getElementById("allChaptersBtn");

let current = -1;
let storyStarted = false;
let timers = [];

function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "--:--";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes.toString().padStart(2, "0")}:${secs}`;
}

function resetPointAnimations(scene) {
    const heading = scene.querySelector(".point-heading");
    const art = scene.querySelector(".art-frame");
    const lines = Array.from(scene.querySelectorAll(".explanation p"));

    heading.style.animation = "none";
    art.style.animation = "none";

    lines.forEach(p => {
        p.classList.remove("writing", "written");
        if (!p.dataset.originalText) p.dataset.originalText = p.textContent.trim();
        p.innerHTML = "";
        p.style.opacity = "0";
    });

    requestAnimationFrame(() => {
        heading.style.animation = "";
        art.style.animation = "";

        const sleep = ms => new Promise(resolve => {
            const t = setTimeout(resolve, ms);
            timers.push(t);
        });

        async function writeLine(line) {
            const text = line.dataset.originalText;
            line.classList.add("writing");

            for (const char of text) {
                const span = document.createElement("span");
                span.className = "writing-char";
                span.textContent = char === " " ? "\u00a0" : char;
                line.appendChild(span);
                await sleep(55);
            }

            line.classList.remove("writing");
            line.classList.add("written");
            await sleep(450);
        }

        (async () => {
            await sleep(650);

            // One sentence at a time. No pencil and no overlapping lines.
            for (const line of lines) {
                await writeLine(line);
            }

            nextBtn.style.opacity = "1";
            nextBtn.style.visibility = "visible";
            nextBtn.style.pointerEvents = "auto";
            nextBtn.classList.add("next-ready");
        })();
    });
}

function showPoint(index) {
    clearTimers();

    pointScenes.forEach(scene => scene.classList.remove("active"));
    songScene.classList.remove("active");
    completeScene.classList.remove("active");

    const scene = pointScenes[index];
    scene.classList.add("active");
    resetPointAnimations(scene);

    current = index;
    sceneNumber.textContent = String(index + 1).padStart(2, "0");

    backBtn.style.opacity = index === 0 ? ".3" : "1";
    nextBtn.textContent = index === 5 ? "♪" : "→";
    nextBtn.classList.remove("next-ready");
    nextBtn.style.opacity = "0";
    nextBtn.style.visibility = "hidden";
    nextBtn.style.pointerEvents = "none";

    // Writing finishes after the final line.
}

function startStory() {
    if (storyStarted) return;
    storyStarted = true;

    introScene.classList.remove("active");
    story.setAttribute("aria-hidden", "false");

    timers.push(setTimeout(() => {
        storyNav.classList.remove("hidden");
        storyNav.style.opacity = "1";
        storyNav.style.pointerEvents = "auto";
        storyNav.style.transform = "translateX(-50%)";
        showPoint(0);
    }, 650));
}

setTimeout(() => {
    beginBtn.classList.remove("hidden");
    beginBtn.style.opacity = "1";
    beginBtn.style.pointerEvents = "auto";
    beginBtn.style.transform = "translateY(0)";
}, 5700);

beginBtn.addEventListener("click", startStory);

nextBtn.addEventListener("click", () => {
    if (current < 5) {
        showPoint(current + 1);
    } else {
        clearTimers();
        storyNav.classList.add("hidden");
        pointScenes.forEach(scene => scene.classList.remove("active"));
        songScene.classList.add("active");
    }
});

backBtn.addEventListener("click", () => {
    if (current > 0) {
        showPoint(current - 1);
    }
});

document.addEventListener("keydown", event => {
    if (!storyStarted) return;

    if (event.key === "ArrowRight") {
        if (current < 5) nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        if (current > 0) backBtn.click();
    }
});

playBtn.addEventListener("click", async () => {
    try {
        if (song.paused) {
            await song.play();
            playBtn.textContent = "❚❚";
        } else {
            song.pause();
            playBtn.textContent = "▶";
        }
    } catch (error) {
        alert("Add chapter27-song.mp3 to this folder first.");
    }
});

song.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(song.currentTime);

    if (song.duration) {
        seekFill.style.width = `${(song.currentTime / song.duration) * 100}%`;
    }
});

song.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    songNext.classList.remove("hidden");
});

songNext.addEventListener("click", () => {
    song.pause();
    song.currentTime = 0;
    songScene.classList.remove("active");
    completeScene.classList.add("active");
});

document.getElementById("chapter26Btn").addEventListener("click", () => {
    window.location.href = "../chapter26/index.html";
});

document.getElementById("allChaptersBtn").addEventListener("click", () => {
    window.location.href = "../../chapters.html";
});

/* Swipe support */
let touchStartX = 0;

story.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

story.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 60 || current < 0) return;

    if (distance > 0 && current < 5) {
        nextBtn.click();
    } else if (distance < 0 && current > 0) {
        backBtn.click();
    }
}, { passive: true });

