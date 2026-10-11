/* CONFIG — EDIT ME! Personalize everything here */
const CONFIG = {
  nameA: "Justin",
  nameB: "Marjorie",
  anniversaryDate: "2026-10-16T00:00:00",
  anniversaryLabel: "October 16, 2026",
  signature: "— Justin ❤",
  letterDate: "October 16th • Forever Yours",
  letterText: `My dearest Marjorie,

Another year, another chapter of us — and my heart still skips exactly the way it did on day one.

Thank you for your laugh that fixes bad days, for holding my hand through storms, for dreaming with me even when the world felt heavy. You are my home, my best friend, and my greatest adventure.

I promise to keep choosing you — in slow Sunday mornings, in silly fights, in big dreams. To love you louder, listen deeper, and dance with you in the kitchen forever.

Happy anniversary, my love. Here's to us — past, present, and every lifetime after.`,
  secretMessage: "Marjorie, you are my home, my adventure, my calm and my chaos — I choose you in every lifetime. Meet me under our stars tonight? I have a surprise… ✨💖",
  memories: [
    { emoji: "🌙", title: "Late-night talks", text: "Where we solved the world, one whisper at a time." },
    { emoji: "🌧️", title: "That rainy walk", text: "Soaked, laughing, never wanting it to end." },
    { emoji: "🎬", title: "Movie nights", text: "You steal popcorn and my whole heart." },
    { emoji: "🌸", title: "Oct 16, 2026", text: "The day I celebrate you, my Marjorie. Always you." }
  ],
  reasons: [
    { emoji: "😄", title: "Your laugh", text: "My favorite sound in the whole world." },
    { emoji: "🤗", title: "Your warmth", text: "Every hug feels like coming home." },
    { emoji: "💪", title: "Your strength", text: "You lift me higher than I ever could alone." },
    { emoji: "🌟", title: "Your dreams", text: "Dreaming beside you is my greatest adventure." },
    { emoji: "💖", title: "Your heart", text: "Kind, brave, and mine to cherish." },
    { emoji: "🎶", title: "Your voice", text: "Even ordinary words sound like music." }
  ],
  promises: [
    { emoji: "☕", title: "Morning coffee", text: "I will always make your cup first." },
    { emoji: "👂", title: "Deep listening", text: "Your feelings first — always, no rushing." },
    { emoji: "💃", title: "Kitchen dances", text: "Silly slow dances whenever the song hits." },
    { emoji: "🌧️", title: "Through storms", text: "Hand in hand, no matter the weather." }
  ],
  loveNotes: [
    ["You + Me = Forever 💘", "No math ever felt this right."],
    ["You are my favorite hello 🌸", "And hardest goodbye, every single time."],
    ["Hug coupon inside 🤗", "Redeemable anytime, anywhere, unlimited."],
    ["You make ordinary magical ✨", "Even Mondays feel like festivals with you."],
    ["Home is wherever you are 🏡", "And I never want to leave."],
    ["Forever looks good on us 💖", "Past, present, and always."]
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
  // years-together text is set by tickCounter() (countdown vs count-up aware)
  function renderCards(gridId, list){
    const g=$("#"+gridId); if(!g) return; g.innerHTML="";
    (list||[]).forEach(m=>{
      const d=document.createElement("div"); d.className="memory-card";
      d.innerHTML="<span class='emoji'>"+m.emoji+"</span><h3></h3><p></p>";
      d.querySelector("h3").textContent=m.title; d.querySelector("p").textContent=m.text; g.appendChild(d);
    });
  }
  renderCards("memory-grid", CONFIG.memories);
  renderCards("reasons-grid", CONFIG.reasons);
  renderCards("promises-grid", CONFIG.promises);
}
/* Envelope open -> pop the swipeable card deck */
let opened=false;
function showCard() {
  const overlay = $("#card-overlay");
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
  $("#love-card").setAttribute("aria-hidden", "false");
  goDeck(0); // always start at the countdown card 💖
}
function hideCard() {
  const overlay = $("#card-overlay");
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
}
function openEnvelope(){
  const env=$("#envelope");
  if(opened) { showCard(); return; }
  opened=true;
  env.classList.add("open");
  $("#seal-btn").setAttribute("aria-expanded","true");
  $("#envelope-status").textContent="Opened with love 💖";
  $("#love-letter").classList.add("revealed");
  $("#love-letter").setAttribute("aria-hidden","false");
  startTyping();
  const c = envelopeCenter();
  // 💥 Heart explosion from the envelope + sparkles (staggered, capped for smoothness)
  heartBurst(c.x, c.y, 34);
  setTimeout(() => heartBurst(c.x, c.y - 20, 22), 320);
  setTimeout(() => heartBurst(c.x, c.y - 40, 16), 700);
  sparkleBurst(c.x, c.y);
  // 🎵 Auto-play music (user clicked/tapped, so browsers allow it)
  autoStartMusic();
  showToast("💌 The seal is broken!", "Hearts burst + our song begins…");
  // Pop the swipeable card deck after the flap animation
  setTimeout(showCard, 900);
}
function resetEnvelope(){
  opened=false;
  $("#envelope").classList.remove("open");
  $("#seal-btn").setAttribute("aria-expanded","false");
  $("#envelope-status").textContent="Sealed with love 💌";
}
/* Typing animation — chunked per frame for butter-smooth typing */
let typeTimer=null;
function startTyping(){
  const box=$("#typed-letter"), caret=$("#typing-caret");
  if(!box) return;
  cancelAnimationFrame(typeTimer); box.textContent=""; if(caret) caret.classList.remove("done");
  if(reduceMotion){ box.textContent=CONFIG.letterText; if(caret) caret.classList.add("done"); return; }
  const txt=CONFIG.letterText; let i=0, last=performance.now();
  const step=(now)=>{
    if(now-last>24){ box.textContent=txt.slice(0,i+=2); last=now; }
    if(i<txt.length){ typeTimer=requestAnimationFrame(step); }
    else { box.textContent=txt; if(caret) caret.classList.add("done"); }
  };
  typeTimer=requestAnimationFrame(step);
}
/* Anniversary live counter — counts DOWN if date is in the future 💖 */
function tickCounter(){
  const target=new Date(CONFIG.anniversaryDate);
  const now=Date.now();
  const isFuture = target.getTime() > now;
  let diff = isFuture ? target.getTime()-now : now-target.getTime();
  const d=Math.floor(diff/86400000), h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60, s=Math.floor(diff/1000)%60;
  $("#c-days").textContent=d; $("#c-hours").textContent=h;
  $("#c-mins").textContent=m; $("#c-secs").textContent=s;
  // Label: "countdown to" vs "loving you for"
  const labelEl = document.querySelector(".counter-label");
  if (labelEl) {
    labelEl.innerHTML = isFuture
      ? "Counting down to <span id=\"years-together\"></span> • <span id=\"anniv-date-label\"></span>"
      : "Loving you for <span id=\"years-together\"></span> • since <span id=\"anniv-date-label\"></span>";
    $("#anniv-date-label").textContent = CONFIG.anniversaryLabel;
    if (isFuture) {
      $("#years-together").textContent = d>0 ? d+(d===1?" day":" days")+" to go" : "today's the day";
    } else {
      const y = Math.floor((now-target.getTime())/31557600000);
      $("#years-together").textContent = y>0 ? y+(y===1?" year":" years") : "day one";
    }
  }
  const notes = isFuture
    ? ["until I get to celebrate you 💖","almost time, my love ✨","counting heartbeats till then 💘","get ready for forever 🥰"]
    : ["and every second still feels like magic","still falling for you daily","my favorite forever countdown","home is wherever you are"];
  $("#counter-note").textContent=notes[d%notes.length];
}
/* Floating hearts + sparkles — capped counts, pause offscreen for smoothness */
function spawnHearts(){
  if(reduceMotion) return;
  const bg=$("#hearts-bg"); const hearts=["❤️","💖","💕","💗","❣️"];
  const maxHearts = window.innerWidth < 600 ? 10 : 18;
  setInterval(()=>{
    if(document.hidden) return;
    if(bg.childElementCount >= maxHearts) return;
    const s=document.createElement("span");
    s.textContent=hearts[Math.floor(Math.random()*hearts.length)];
    s.style.left=Math.random()*100+"vw"; s.style.fontSize=(12+Math.random()*22)+"px";
    s.style.animationDuration=(6+Math.random()*6)+"s";
    bg.appendChild(s); setTimeout(()=>s.remove(),12000);
  },1500);
  const sp=$("#sparkles-bg");
  const nSpark = window.innerWidth < 600 ? 16 : 26;
  for(let i=0;i<nSpark;i++){
    const t=document.createElement("span"); t.textContent="✦";
    t.style.left=Math.random()*100+"vw"; t.style.top=Math.random()*100+"vh";
    t.style.fontSize=(8+Math.random()*14)+"px";
    t.style.animationDuration=(2.4+Math.random()*3)+"s";
    t.style.animationDelay=(Math.random()*3)+"s"; sp.appendChild(t);
  }
}
/* Envelope heart burst — smooth Web Animations API, GPU-friendly, capped for perf */
function heartBurst(x, y, count) {
  if (reduceMotion) return;
  count = Math.min(count || 30, 40);
  const hearts = ["❤️", "💖", "💕", "💗", "💘", "❣️", "💓", "🥰"];
  const vw = window.innerWidth, vh = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "heart-particle";
    h.setAttribute("aria-hidden", "true");
    h.textContent = hearts[(Math.random() * hearts.length) | 0];
    const size = 16 + Math.random() * 26;
    h.style.fontSize = size + "px";
    h.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%) scale(0)";
    h.style.opacity = "0";
    document.body.appendChild(h);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 130 - Math.random() * 110;
    const rot = (Math.random() * 140 - 70);
    const dur = 1300 + Math.random() * 1200;
    // Clamp so hearts stay mostly on-screen
    const endX = Math.max(-40, Math.min(vw + 40, x + dx));
    const endY = Math.max(-60, Math.min(vh + 60, y + dy));
    try {
      const anim = h.animate([
        { transform: "translate(" + x + "px," + y + "px) translate(-50%,-50%) scale(0) rotate(0deg)", opacity: 0 },
        { transform: "translate(" + (x + dx * .18) + "px," + (y + dy * .18) + "px) translate(-50%,-50%) scale(1.35) rotate(" + (rot * .3) + "deg)", opacity: 1, offset: .18 },
        { transform: "translate(" + endX + "px," + endY + "px) translate(-50%,-50%) scale(.6) rotate(" + rot + "deg)", opacity: 0 }
      ], { duration: dur, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
      anim.onfinish = () => h.remove();
      setTimeout(() => h.remove(), dur + 300);
    } catch (e) { setTimeout(() => h.remove(), 100); }
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
/* Sparkle burst — smooth WAAPI, capped count */
function sparkleBurst(x,y){
  if(reduceMotion) return;
  const colors=["#ff4d7e","#ffd166","#ff8fab","#ffffff","#ffb3c6"];
  const n = window.innerWidth < 600 ? 16 : 24;
  for(let i=0;i<n;i++){
    const d=document.createElement("div"); d.className="burst";
    d.style.background=colors[i%colors.length];
    d.style.transform="translate("+x+"px,"+y+"px) scale(1)";
    d.style.opacity="1";
    document.body.appendChild(d);
    const a=Math.random()*Math.PI*2, dist=60+Math.random()*130;
    const dx=Math.cos(a)*dist, dy=Math.sin(a)*dist;
    try{
      const anim=d.animate([
        { transform:"translate("+x+"px,"+y+"px) scale(1)", opacity:1 },
        { transform:"translate("+(x+dx)+"px,"+(y+dy)+"px) scale(0)", opacity:0 }
      ],{ duration:700+Math.random()*400, easing:"cubic-bezier(.22,1,.36,1)", fill:"forwards" });
      anim.onfinish=()=>d.remove();
      setTimeout(()=>d.remove(),1300);
    }catch(e){ setTimeout(()=>d.remove(),100); }
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
/* ---------- Swipeable deck: touch swipe + drag + dots + arrows ---------- */
let deckIdx = 0;
function deckCount() { return document.querySelectorAll("#deck-track .deck-card").length; }
function goDeck(i) {
  const n = deckCount(); if (!n) return;
  deckIdx = Math.max(0, Math.min(n - 1, i));
  const track = $("#deck-track");
  track.style.transform = "translateX(-" + (deckIdx * 100) + "%)";
  document.querySelectorAll("#deck-dots button").forEach((d, k) => {
    d.classList.toggle("active", k === deckIdx);
    d.setAttribute("aria-selected", k === deckIdx ? "true" : "false");
  });
  // Typing the letter feels magical when its card slides in
  if (deckIdx === 1 && opened) startTyping();
}
function initDeck() {
  const deck = $("#deck"), track = $("#deck-track"), dots = $("#deck-dots");
  dots.innerHTML = "";
  for (let i = 0; i < deckCount(); i++) {
    const b = document.createElement("button");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Go to card " + (i + 1));
    b.addEventListener("click", () => goDeck(i));
    dots.appendChild(b);
  }
  goDeck(0);
  $("#deck-prev").addEventListener("click", () => goDeck(deckIdx - 1));
  $("#deck-next").addEventListener("click", () => goDeck(deckIdx + 1));
  // Touch / mouse drag to swipe — velocity-aware, buttery snap
  let startX = 0, curX = 0, startT = 0, dragging = false;
  const threshold = 48;
  function onStart(x) {
    dragging = true; startX = x; curX = x; startT = performance.now();
    track.classList.add("dragging");
  }
  function onMove(x) {
    if (!dragging) return; curX = x;
    const dx = curX - startX;
    // Soft resistance at the ends so it never feels stuck
    let eased = dx;
    if ((deckIdx === 0 && dx > 0) || (deckIdx === deckCount() - 1 && dx < 0)) eased = dx * .35;
    const base = -(deckIdx * deck.clientWidth);
    track.style.transform = "translateX(" + (base + eased) + "px)";
  }
  function onEnd() {
    if (!dragging) return; dragging = false; track.classList.remove("dragging");
    const dx = curX - startX;
    const dt = Math.max(1, performance.now() - startT);
    const velocity = dx / dt; // px per ms — fast flicks switch cards
    if (dx < -threshold || velocity < -0.45) goDeck(deckIdx + 1);
    else if (dx > threshold || velocity > 0.45) goDeck(deckIdx - 1);
    else goDeck(deckIdx);
  }
  deck.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
  deck.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
  deck.addEventListener("touchend", onEnd);
  deck.addEventListener("mousedown", (e) => onStart(e.clientX));
  window.addEventListener("mousemove", (e) => onMove(e.clientX));
  window.addEventListener("mouseup", onEnd);
  // Arrow keys swipe when card is open
  document.addEventListener("keydown", (e) => {
    if (!$("#card-overlay").classList.contains("show")) return;
    if (e.key === "ArrowRight") goDeck(deckIdx + 1);
    if (e.key === "ArrowLeft") goDeck(deckIdx - 1);
  });
}
/* Wire everything + init */
document.addEventListener("DOMContentLoaded",()=>{
  applyConfig(); tickCounter(); setInterval(tickCounter,1000);
  spawnHearts(); startPetals(); initDeck();
  $("#seal-btn").addEventListener("click",openEnvelope);
  $("#btn-open").addEventListener("click",openEnvelope);
  $("#btn-close-card").addEventListener("click",hideCard);
  // Click dimmed backdrop to close, ESC too
  $("#card-overlay").addEventListener("click",(e)=>{ if(e.target.id==="card-overlay") hideCard(); });
  $("#btn-replay").addEventListener("click",()=>{ if(!opened) openEnvelope(); else { goDeck(1); startTyping(); } });
  $("#btn-lovenote").addEventListener("click",popLoveNote);
  $("#btn-secret").addEventListener("click",()=>{ goDeck(5); setTimeout(revealSecret, 450); });
  $("#btn-reveal").addEventListener("click",revealSecret);
  $("#btn-kiss").addEventListener("click",sendKiss);
  $("#btn-confetti").addEventListener("click",(e)=>{ const r=e.target.getBoundingClientRect(); sparkleBurst(r.left+r.width/2,r.top); showToast("✨ Sparkles!","The universe is blushing."); });
  $("#btn-music").addEventListener("click",(e)=>toggleMusic(e.currentTarget));
  $("#btn-print").addEventListener("click",()=>{ if($("#typed-letter").textContent.length<20) { $("#typed-letter").textContent=CONFIG.letterText; } window.print(); });
  $("#btn-copy").addEventListener("click",async(e)=>{
    try{ await navigator.clipboard.writeText(CONFIG.letterText); e.target.textContent="✅ Copied!"; setTimeout(()=>e.target.textContent="📋 Copy Letter",2000); }
    catch(err){ showToast("📋 Copy failed","Select the letter text manually."); }
  });
  document.addEventListener("keydown",(e)=>{ const k=e.key.toLowerCase(); if(k==="k") sendKiss(); if(k==="l") popLoveNote(); if(e.key==="Escape") hideCard(); if(e.key==="Enter" && !opened && document.activeElement===$("#seal-btn")) openEnvelope(); });
  setTimeout(()=>showToast("💘 Psst… tap the heart seal","Something handwritten is waiting."),2500);
});


