/* CONFIG — EDIT ME! Personalize everything here */
const CONFIG = {
  nameA: "Aarav",
  nameB: "Diya",
  anniversaryDate: "2021-06-14T00:00:00",
  anniversaryLabel: "June 14, 2021",
  signature: "— Aarav ❤",
  letterDate: "June 14th • Forever Yours",
  letterText: `My dearest Diya,

Another year, another chapter of us — and my heart still skips exactly the way it did on day one.

Thank you for your laugh that fixes bad days, for holding my hand through storms, for dreaming with me even when the world felt heavy. You are my home, my best friend, and my greatest adventure.

I promise to keep choosing you — in slow Sunday mornings, in silly fights, in big dreams. To love you louder, listen deeper, and dance with you in the kitchen forever.

Happy anniversary, my love. Here's to us — past, present, and every lifetime after.`,
  secretMessage: "You are my home, my adventure, my calm and my chaos — I choose you in every lifetime. Meet me under our stars tonight? I have a surprise… 💍✨",
  memories: [
    { emoji: "☕", title: "Chai & 2am talks", text: "Where we solved the world, one cup at a time." },
    { emoji: "🌧️", title: "That rainy walk", text: "Soaked, laughing, and never wanting it to end." },
    { emoji: "🎬", title: "Movie marathons", text: "You steal popcorn and my whole heart." },
    { emoji: "✈️", title: "Dream trip", text: "Next stop: wherever you are. Always you." }
  ],
  loveNotes: [
    ["You + Me = Forever 💘", "No math ever felt this right."],
    ["You are my favorite hello 🌸", "And hardest goodbye, every single time."],
    ["Hug coupon inside 🤗", "Redeemable anytime, anywhere, unlimited."],
    ["Warning: cute overload 🥰", "Caused entirely by thinking of you."],
    ["You make ordinary magical ✨", "Even Mondays feel like festivals with you."]
  ]
};
const $ = (s) => document.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function applyConfig(){
  $("#name-a").textContent = CONFIG.nameA;
  $("#name-b").textContent = CONFIG.nameB;
  $("#anniv-date-label").textContent = CONFIG.anniversaryLabel;
  $("#signature-name").textContent = CONFIG.signature;
  $("#letter-date").textContent = CONFIG.letterDate;
  $("#secret-blur").textContent = CONFIG.secretMessage;
  $("#foot-names").textContent = CONFIG.nameA + " & " + CONFIG.nameB;
  $("#foot-year").textContent = new Date().getFullYear();
  const y = Math.floor((Date.now()-new Date(CONFIG.anniversaryDate))/31557600000);
  $("#years-together").textContent = y>0 ? y+(y===1?" year":" years") : "day one";
  const g=$("#memory-grid"); g.innerHTML="";
  CONFIG.memories.forEach(m=>{
    const d=document.createElement("div"); d.className="memory-card";
    d.innerHTML="<span class='emoji'>"+m.emoji+"</span><h3></h3><p></p>";
    d.querySelector("h3").textContent=m.title; d.querySelector("p").textContent=m.text; g.appendChild(d);
  });
}
/* Envelope open / close */
let opened=false;
function openEnvelope(){
  const env=$("#envelope");
  if(opened) return; opened=true;
  env.classList.add("open");
  $("#seal-btn").setAttribute("aria-expanded","true");
  $("#envelope-status").textContent="Opened with love 💖";
  $("#love-letter").classList.add("revealed");
  $("#love-letter").setAttribute("aria-hidden","false");
  startTyping();
  const c = envelopeCenter();
  // 💥 Heart explosion from the envelope + sparkles
  heartBurst(c.x, c.y, 42);
  setTimeout(() => heartBurst(c.x, c.y - 20, 24), 350);
  setTimeout(() => heartBurst(c.x, c.y - 40, 18), 750);
  sparkleBurst(c.x, c.y);
  // 🎵 Auto-play music (user clicked/tapped, so browsers allow it)
  autoStartMusic();
  showToast("💌 The seal is broken!", "Hearts burst + our song begins…");
  setTimeout(()=>$("#love-letter").scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"center"}),900);
}
function resetEnvelope(){
  opened=false;
  $("#envelope").classList.remove("open");
  $("#seal-btn").setAttribute("aria-expanded","false");
  $("#envelope-status").textContent="Sealed with love 💌";
}
/* Typing animation */
let typeTimer=null;
function startTyping(){
  const box=$("#typed-letter"), caret=$("#typing-caret");
  clearInterval(typeTimer); box.textContent=""; caret.classList.remove("done");
  if(reduceMotion){ box.textContent=CONFIG.letterText; caret.classList.add("done"); return; }
  let i=0; const txt=CONFIG.letterText;
  typeTimer=setInterval(()=>{
    box.textContent=txt.slice(0,++i);
    if(i>=txt.length){ clearInterval(typeTimer); caret.classList.add("done"); showToast("💖 Letter complete","Replay it anytime with ↻ button."); }
  },38);
}
/* Anniversary live counter */
function tickCounter(){
  const start=new Date(CONFIG.anniversaryDate); let diff=Date.now()-start;
  if(diff<0) diff=0;
  const d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
  $("#c-days").textContent=d; $("#c-hours").textContent=h;
  $("#c-mins").textContent=m; $("#c-secs").textContent=s;
  const notes=["and every second still feels like magic","still falling for you daily","my favorite forever countdown","home is wherever you are"];
  $("#counter-note").textContent=notes[d%notes.length];
}
/* Floating hearts + sparkles */
function spawnHearts(){
  if(reduceMotion) return;
  const bg=$("#hearts-bg"); const hearts=["❤️","💖","💕","💗","❣️"];
  setInterval(()=>{
    if(document.hidden) return;
    const s=document.createElement("span");
    s.textContent=hearts[Math.floor(Math.random()*hearts.length)];
    s.style.left=Math.random()*100+"vw"; s.style.fontSize=(12+Math.random()*22)+"px";
    s.style.animationDuration=(6+Math.random()*6)+"s";
    bg.appendChild(s); setTimeout(()=>s.remove(),12000);
  },1400);
  const sp=$("#sparkles-bg");
  for(let i=0;i<28;i++){
    const t=document.createElement("span"); t.textContent="✦";
    t.style.left=Math.random()*100+"vw"; t.style.top=Math.random()*100+"vh";
    t.style.fontSize=(8+Math.random()*14)+"px";
    t.style.animationDuration=(2+Math.random()*3)+"s";
    t.style.animationDelay=(Math.random()*3)+"s"; sp.appendChild(t);
  }
}
/* Envelope heart burst — big romantic explosion on open */
function heartBurst(x, y, count) {
  if (reduceMotion) return;
  count = count || 36;
  const hearts = ["❤️", "💖", "💕", "💗", "💘", "❣️", "💓", "🥰"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "heart-particle";
    h.setAttribute("aria-hidden", "true");
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.fontSize = (16 + Math.random() * 28) + "px";
    const angle = Math.random() * Math.PI * 2;
    // Up-biased burst so hearts fountain out of the envelope
    const dist = 90 + Math.random() * 260;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 140 - Math.random() * 120;
    const rot = (Math.random() * 160 - 80) + "deg";
    const dur = (1.2 + Math.random() * 1.4) + "s";
    h.style.setProperty("--hdx", dx + "px");
    h.style.setProperty("--hdy", dy + "px");
    h.style.setProperty("--hrot", rot);
    h.style.animationDuration = dur;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2800);
  }
}

function envelopeCenter() {
  const env = $("#envelope");
  if (env) {
    const r = env.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

/* Auto-play music on envelope open (allowed because open is a user gesture) */
function autoStartMusic() {
  const btn = $("#btn-music");
  const audioEl = $("#romantic-music");
  if (audioEl && audioEl.querySelector("source")) {
    try {
      audioEl.volume = 0.7;
      const p = audioEl.play();
      if (p && p.then) {
        p.then(() => {
          musicOn = true;
          if (btn) { btn.textContent = "🎵 Music: On"; btn.setAttribute("aria-pressed", "true"); }
          showToast("🎵 Music on", "Our song starts when your heart opens.");
        }).catch(() => startLullabyMusic(btn));
        return;
      }
    } catch (e) { /* fall through to lullaby */ }
  }
  startLullabyMusic(btn);
}

function startLullabyMusic(btn) {
  if (musicOn) return;
  musicOn = true;
  if (btn) { btn.textContent = "🎵 Music: On"; btn.setAttribute("aria-pressed", "true"); }
  playLullaby(btn, true);
  showToast("🎵 Music on", "Our song starts when your heart opens.");
}
function startPetals(){
  const c=$("#petals-canvas"); const ctx=c.getContext("2d");
  function size(){ c.width=innerWidth; c.height=innerHeight; }
  size(); addEventListener("resize",size);
  if(reduceMotion) return;
  const P=Array.from({length:26},()=>({
    x:Math.random()*innerWidth, y:Math.random()*-innerHeight,
    w:8+Math.random()*10, h:6+Math.random()*8,
    vy:.6+Math.random()*1.4, vx:-.4+Math.random()*.8,
    r:Math.random()*Math.PI*2, vr:-.03+Math.random()*.06,
    col:["#ff8fab","#ffb3c6","#ff4d7e","#ffc2d4"][Math.floor(Math.random()*4)]
  }));
  (function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{
      p.y+=p.vy; p.x+=p.vx+Math.sin(p.y/60)*.4; p.r+=p.vr;
      if(p.y>c.height+20){ p.y=-20; p.x=Math.random()*c.width; }
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle=p.col; ctx.globalAlpha=.85;
      ctx.beginPath(); ctx.ellipse(0,0,p.w/2,p.h/2,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  })();
}
/* Playful pop-up love messages */
let noteIdx=0;
function showToast(title,sub){
  const stack=$("#toast-stack");
  const t=document.createElement("div"); t.className="toast"; t.setAttribute("role","status");
  t.style.setProperty("--tilt",(Math.random()*6-3)+"deg");
  const b=document.createElement("div"); b.textContent=title;
  const s=document.createElement("small"); s.textContent=sub||"";
  t.append(b,s); stack.appendChild(t);
  while(stack.children.length>3) stack.firstChild.remove();
  setTimeout(()=>{ t.classList.add("out"); setTimeout(()=>t.remove(),450); },4200);
}
function popLoveNote(){
  const n=CONFIG.loveNotes[noteIdx%CONFIG.loveNotes.length]; noteIdx++;
  showToast(n[0],n[1]); sparkleBurst(innerWidth-80,innerHeight-120);
}
/* Secret message */
function revealSecret(){
  const p=$("#secret-blur"); const btn=$("#btn-reveal");
  const open=p.classList.toggle("unblurred");
  btn.textContent=open?"Hide secret 🙈":"Reveal secret message 🤫";
  if(open){ showToast("🤫 Shhh…","That one is just for you."); sparkleBurst(innerWidth/2,innerHeight/2); }
}
/* Kiss animation */
let kissing=false;
function sendKiss(){
  if(kissing) return; kissing=true;
  const o=$("#kiss-overlay"); const mark=$("#kiss-mark");
  const kisses=["💋","😘","💏","❤️‍🔥"];
  mark.textContent=kisses[Math.floor(Math.random()*kisses.length)];
  mark.style.animation="none"; void mark.offsetWidth; mark.style.animation="";
  o.classList.add("show");
  setTimeout(()=>{ o.classList.remove("show"); kissing=false; },1450);
  showToast("💋 Kiss sent!","Caught it? Here is another one.");
}
/* Sparkle burst (no libs) */
function sparkleBurst(x,y){
  if(reduceMotion) return;
  const colors=["#ff4d7e","#ffd166","#ff8fab","#ffffff","#ffb3c6"];
  for(let i=0;i<26;i++){
    const d=document.createElement("div"); d.className="burst";
    d.style.left=x+"px"; d.style.top=y+"px";
    d.style.background=colors[i%colors.length];
    const a=Math.random()*Math.PI*2, dist=60+Math.random()*140;
    d.style.setProperty("--dx",Math.cos(a)*dist+"px");
    d.style.setProperty("--dy",Math.sin(a)*dist+"px");
    document.body.appendChild(d); setTimeout(()=>d.remove(),1050);
  }
}
/* Optional music — WebAudio lullaby, OFF by default, never autoplay */
let audioCtx=null, musicOn=false, musicNodes=[];
function playLullaby(btn, silent){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
    const master = audioCtx.createGain(); master.gain.value = .12; master.connect(audioCtx.destination);
    const notes = [523.25,587.33,659.25,783.99,880,783.99,659.25,587.33];
    let t = audioCtx.currentTime + .05;
    try{ musicNodes.forEach(function(n){ try{ n.stop(); }catch(e){} }); clearTimeout(musicNodes.loopTimer); }catch(e){}
    musicNodes = [];
    notes.forEach(function(f,i){
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * .5);
      g.gain.linearRampToValueAtTime(1, t + i * .5 + .05);
      g.gain.linearRampToValueAtTime(0, t + i * .5 + .48);
      o.connect(g); g.connect(master); o.start(t + i * .5); o.stop(t + i * .5 + .5);
      musicNodes.push(o);
    });
    musicNodes.loopTimer = setTimeout(function(){ if(musicOn) playLullaby(btn, true); }, notes.length * 500 + 400);
    if(!silent) showToast("🎵 Now playing","A tiny lullaby, just for us.");
  }catch(e){ showToast("🎵 Audio blocked","Tap again to enable sound."); musicOn = false; }
}
function toggleMusic(btn){
  const audioEl = $("#romantic-music");
  const hasSong = audioEl && audioEl.querySelector("source");
  if(!musicOn){
    musicOn = true; btn.textContent = "🎵 Music: On"; btn.setAttribute("aria-pressed","true");
    // Prefer real song file if present
    if (hasSong) {
      try {
        audioEl.volume = 0.7;
        const p = audioEl.play();
        if (p && p.then) {
          p.then(()=>{}).catch(()=> playLullaby(btn, true));
          return;
        }
      } catch(e){}
    }
    playLullaby(btn, false);
  }
  else {
    musicOn = false;
    try{
      if (hasSong) audioEl.pause();
      musicNodes.forEach(function(n){ try{ n.stop(); }catch(e){} }); clearTimeout(musicNodes.loopTimer);
    }catch(e){}
    if(audioCtx) audioCtx.suspend();
    btn.textContent = "🎵 Music: Off"; btn.setAttribute("aria-pressed","false");
  }
}
/* Wire everything + init */
document.addEventListener("DOMContentLoaded",()=>{
  applyConfig(); tickCounter(); setInterval(tickCounter,1000);
  spawnHearts(); startPetals();
  $("#seal-btn").addEventListener("click",openEnvelope);
  $("#btn-open").addEventListener("click",()=>{ opened?$("#love-letter").scrollIntoView({behavior:"smooth"}):openEnvelope(); });
  $("#btn-replay").addEventListener("click",()=>{ if(!opened) openEnvelope(); else startTyping(); });
  $("#btn-lovenote").addEventListener("click",popLoveNote);
  $("#btn-secret").addEventListener("click",()=>{ $("#secret-blur").scrollIntoView({behavior:"smooth",block:"center"}); revealSecret(); });
  $("#btn-reveal").addEventListener("click",revealSecret);
  $("#btn-kiss").addEventListener("click",sendKiss);
  $("#btn-confetti").addEventListener("click",(e)=>{ const r=e.target.getBoundingClientRect(); sparkleBurst(r.left+r.width/2,r.top); showToast("✨ Sparkles!","The universe is blushing."); });
  $("#btn-music").addEventListener("click",(e)=>toggleMusic(e.currentTarget));
  $("#btn-print").addEventListener("click",()=>{ if($("#typed-letter").textContent.length<20) { $("#typed-letter").textContent=CONFIG.letterText; } window.print(); });
  $("#btn-copy").addEventListener("click",async(e)=>{
    try{ await navigator.clipboard.writeText(CONFIG.letterText); e.target.textContent="✅ Copied!"; setTimeout(()=>e.target.textContent="📋 Copy Letter",2000); }
    catch(err){ showToast("📋 Copy failed","Select the letter text manually."); }
  });
  document.addEventListener("keydown",(e)=>{ if(e.key.toLowerCase()==="k") sendKiss(); if(e.key.toLowerCase()==="l") popLoveNote(); });
  setTimeout(()=>showToast("💘 Psst… tap the heart seal","Something handwritten is waiting."),2500);
});


