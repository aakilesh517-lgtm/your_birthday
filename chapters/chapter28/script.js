const $=s=>document.querySelector(s);
const screens=["#intro","#show","#message","#song","#end"].map($);
const data=[
["image1.png","JUST ANOTHER STATUS","I was just randomly watching a WhatsApp status…","I had no idea that an ordinary moment would stay with me."],
["image2.png","THE JOURNEY","A group of friends. A trip. Greenery everywhere.","Just a normal day, filled with laughter and little moments."],
["image 3.png","THE STOP","They stopped to enjoy the beauty of nature.","And then one boy decided to tease her…"],
["image4.png","THE TEASE","He teased her.","She definitely didn't like it one bit. 😂"],
["image5.png","THE CHASE","She got angry… and chased him.","He ran for his life. Somehow, that silly moment became unforgettable."],
["image6.png","THE MOMENT","And that's when I noticed you.","Out of everything happening around me, somehow… I noticed you."],
["image7.png","LIFE KEPT MOVING","Days became months.","Months became years. And life kept moving."],
["imahe8.png","SOMEWHERE ALONG THE WAY","The person I noticed that day…","…slowly became someone I could talk to, laugh with, and call my friend."],
["image9.png","THE FIRST MEMORY","Funny how one random moment…","…can become the beginning of something you never expected."]
];
let i=0,touch=0;
function section(n){screens.forEach((s,k)=>s.classList.toggle("active",k===n))}
data.forEach((_,k)=>{let d=document.createElement("span");d.className="dot"+(!k?" on":"");$("#dots").appendChild(d)});
function render(){let d=data[i];$("#pic").src="images/"+d[0];$("#tag").textContent=d[1];$("#title").textContent=d[2];$("#desc").textContent=d[3];$("#n").textContent=String(i+1).padStart(2,"0");[...$("#dots").children].forEach((x,k)=>x.classList.toggle("on",k===i))}
function next(){if(i<data.length-1){i++;render()}else section(2)}
function prev(){if(i>0){i--;render()}}
$("#begin").onclick=()=>{section(1);render()};$("#next").onclick=next;$("#prev").onclick=prev;$("#toSong").onclick=()=>section(3);$("#toEnd").onclick=()=>section(4);
document.onkeydown=e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()};
document.ontouchstart=e=>touch=e.changedTouches[0].clientX;
document.ontouchend=e=>{let dx=e.changedTouches[0].clientX-touch;if(Math.abs(dx)>60)dx<0?next():prev()};
const audio=$("#audio"),play=$("#play");
play.onclick=async()=>{try{if(audio.paused){await audio.play();play.textContent="❚❚"}else{audio.pause();play.textContent="▶"}}catch{$("#status").innerHTML='Add <b>chapter28-song.mp3</b> to this folder, then press play.'}};
audio.ontimeupdate=()=>$("#time").textContent=`${String(Math.floor(audio.currentTime/60)).padStart(2,"0")}:${String(Math.floor(audio.currentTime%60)).padStart(2,"0")}`;
