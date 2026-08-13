const $ = id => document.getElementById(id);

const PASSWORD = "2917";

const lock = $("lock");
const chatScreen = $("chatScreen");
const end = $("end");
const password = $("password");
const unlock = $("unlock");
const error = $("error");
const chat = $("chat");
const choices = $("choices");
const progress = $("progress");

const scenes = [
  {
    boy: "Hi! 👋 I wanted to tell you something today.",
    boyImg: "assets/boy1.png",
    replies: [
      ["What is it? 😄", "Nothing serious 😄 I just wanted to tell you something nice."],
      ["You sound serious 😅", "Haha, don't worry. It's actually a good thing."]
    ]
  },
  {
    boy: "Good... then let me start with the obvious. You're seriously beautiful.",
    boyImg: "assets/boy2.png",
    replies: [
      ["Aww, what !", " I'm only saying what I honestly think."],
      ["Are you sure? 😅", "Very sure. You don't have to question that one."]
    ]
  },
  {
    boy: "And it's not only your looks. Your smile is the kind that can make a normal day feel a little better.",
    boyImg: "assets/boy3.png",
    replies: [
      ["i was not knowing it😅", " i hope you got it now 😁"],
      ["I didn't know my smile did that 😄", "Well... now you know. So don't stop smiling."]
    ]
  },
  {
    boy: "Then there's your personality. You're  not easy to talk , and somehow even simple conversations with you become memorable.",
    boyImg: "assets/boy4.png",
    replies: [
      ["That's actually sweet ❤️", "I mean it. Talking to you  feels  so special."],
      [" you're always behind me, what to do 🙄", "May be that's true too. I think we just have a nice vibe."]
    ]
  },
  {
    boy: "And I really respect how caring you are, You notice  every little things ,even when you don't make a big deal about it.",
    boyImg: "assets/boy5.png",
    replies: [
      ["I just do what feels right ❤️", "And that's exactly what makes it special."],
      ["You actually noticed that? 😅", "Of course. Sometimes the smallest things tell you the most."]
    ]
  },

  /* MISUNDERSTANDING / ANGRY MOMENT */
  {
    angry: true,
    boy: "You always say you're fine so quickly... sometimes I feel like you don't really want to tell me what's going on.",
    boyImg: "assets/boy6.png",
    replies: [
      ["So you think I don't trust you? 😒", "No, no... that's not what I meant. I don't want to sound like that."],
      ["Then may be I shouldn't tell you anything. 😠", "Please don't say that. I asked because I care about you"]
    ]
  },
  {
    boy: "Okay, let me say it properly. I wasn't blaming you. I just wanted you to know that if something is bothering you 🤔, you never have to hide it from me 😄.",
    boyImg: "assets/boy6.png",
    replies: [
      ["Hmm... okay. I understand now. ❤️", "  you know sometimes, i fail in explaining and reaching you."],
      ["You're lucky ,i am still talking to you 😌", "I know 😂 I'll be more careful with my words next time."]
    ]
  },
  {
    boy: "That's one of the things I like about you. Even when you're annoyed, you're still you. And honestly, I wouldn't change those little things.",
    boyImg: "assets/boy1.png",
    replies: [
      ["Okay, i don't mind 😄", "i was trying to get into your mind actually😂"],
      ["You're still trying to impress me? 😂", "Maybe a little. But mostly I just wanted to make you smile again."]
    ]
  },
  {
    boy: "So if someone asked me what makes you special, I couldn't give one answer. It's your smile, your kindness, your personality, your little habits... it's all of it together.",
    boyImg: "assets/boy2.png",
    replies: [
      ["That's really beautiful to hear. ❤️", "I'm glad you liked hearing it. You deserve to know how people see you."],
      ["You really notice all that? 🥹", "The good things are hard not to notice."]
    ]
  },
  {
    boy: "And most importantly, I hope you always stay exactly as genuine as you are. That's the part of you I hope never changes. ❤️",
    boyImg: "assets/boy3.png",
    replies: [
      ["I'll remember that. ❤️", "Then that's enough for me."],
      ["You made me smile today. 😊", "Then Chapter 29 did exactly what it was supposed to do."]
    ]
  }
];

let sceneIndex = 0;
let locked = false;

function show(screen){
  [lock, chatScreen, end].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addMessage(person, text, image, angry=false){
  return new Promise(resolve => {
    const row = document.createElement("div");
    row.className = `message ${person}${angry ? " angry" : ""}`;

    const character = document.createElement("div");
    character.className = "character";

    const img = document.createElement("img");
    img.src = image;
    img.alt = person === "boy" ? "Boy character" : "Girl character";
    character.appendChild(img);

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const who = document.createElement("span");
    who.className = "who";
    who.textContent = person === "boy" ? "HIM" : "HER";

    const p = document.createElement("p");
    p.textContent = text;

    bubble.append(who, p);

    if(person === "boy"){
      row.append(character, bubble);
    }else{
      row.append(bubble, character);
    }

    chat.appendChild(row);
    row.scrollIntoView({behavior:"smooth", block:"center"});

    setTimeout(resolve, 650);
  });
}

function setReplyChoices(scene){
  choices.innerHTML = "";
  choices.className = "choices";

  scene.replies.forEach((reply) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = reply[0];

    button.onclick = async () => {
      if(locked) return;
      locked = true;
      choices.innerHTML = "";

      // Girl reply: shown once.
      await addMessage(
        "girl",
        reply[0],
        sceneIndex >= 5 && sceneIndex <= 7 ? "assets/girl5.png" : "assets/girl1.png"
      );

      // Boy's matching response: shown once.
      await wait(300);
      await addMessage("boy", reply[1], scene.boyImg);

      locked = false;

      if(sceneIndex < scenes.length - 1){
        sceneIndex++;
        await wait(350);
        showNextScene();
      }else{
        await wait(500);
        progress.textContent = "SONG";
        show(end);
      }
    };

    choices.appendChild(button);
  });
}

async function showNextScene(){
  const scene = scenes[sceneIndex];

  progress.textContent =
    `${String(sceneIndex + 1).padStart(2,"0")} / ${String(scenes.length).padStart(2,"0")}`;

  if(scene.angry){
    const note = document.createElement("div");
    note.className = "angry-note";
    note.textContent = "Hey moon 💭";
    chat.appendChild(note);
  }

  await addMessage("boy", scene.boy, scene.boyImg, scene.angry);
  setReplyChoices(scene);
}

function unlockPage(){
  if(password.value.trim() !== PASSWORD){
    error.textContent = "Hmm... that's not the right password 😅";
    password.value = "";
    password.focus();
    return;
  }

  error.textContent = "";
  chat.innerHTML = "";
  choices.innerHTML = "";
  sceneIndex = 0;
  locked = false;

  show(chatScreen);
  showNextScene();
}

unlock.onclick = unlockPage;

password.addEventListener("keydown", event => {
  if(event.key === "Enter") unlockPage();
});


/* INLINE SONG PLAYER */
(function(){
  const audio = document.getElementById("songAudio");
  const button = document.getElementById("playSong");
  const icon = document.getElementById("playIcon");
  const status = document.getElementById("playerStatus");
  const seek = document.getElementById("seekBar");
  const current = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const player = document.getElementById("inlinePlayer");

  if(!audio || !button) return;

  function formatTime(seconds){
    if(!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2,"0");
    return `${m}:${s}`;
  }

  button.addEventListener("click", async function(){
    try{
      if(audio.paused){
        await audio.play();
      }else{
        audio.pause();
      }
    }catch(e){
      status.textContent = "Add your song as song.mp3 in this folder.";
    }
  });

  audio.addEventListener("play",()=>{
    icon.textContent="❚❚";
    status.textContent="Now playing... 🎵";
    player.classList.add("playing");
  });

  audio.addEventListener("pause",()=>{
    icon.textContent="▶";
    player.classList.remove("playing");
    if(audio.currentTime > 0 && audio.currentTime < audio.duration){
      status.textContent="Paused";
    }
  });

  audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate",()=>{
    current.textContent=formatTime(audio.currentTime);
    if(audio.duration){
      seek.value=(audio.currentTime/audio.duration)*100;
    }
  });

  seek.addEventListener("input",()=>{
    if(audio.duration){
      audio.currentTime=(Number(seek.value)/100)*audio.duration;
    }
  });

  audio.addEventListener("ended",()=>{
    icon.textContent="▶";
    seek.value=0;
    current.textContent="0:00";
    status.textContent="That was the song I picked for you. ♡";
    player.classList.remove("playing");
  });
})();
