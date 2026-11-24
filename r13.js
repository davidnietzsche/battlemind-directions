/* Round 13 · home rebuilt against Sue's sample drafts. Phone first: nothing captures the wheel; the only hold is one short sticky stage in analytics. */
(() => {
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches, q = new URLSearchParams(location.search), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const G = !RM && !!window.gsap, FIN = /^[abd]$/.test(q.get("ch") || "") ? q.get("ch") : "c", PHONE = () => innerWidth <= 900;
const AR = '<span class="ar" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const WA = (t) => "https://wa.me/60197707927?text=" + encodeURIComponent(t);
const rnd = (i) => { const g = Math.sin(i * 127.1 + 311.7) * 43758.5453; return g - Math.floor(g); };
// the service characters: "c" is the art-toy crew (bull, rabbit, cat, robot); ?ch=a and ?ch=b keep the earlier object mascots for comparison
// Two split-out versions (David 23 Nov): data-cast="team" uses real people everywhere, each with the tools of the job; data-cast="toy" is the art-toy crew, who travel down the page with the scroll.
const CAST = document.documentElement.dataset.cast || "";
// Content: when the CMS serves this page it puts every editable word and picture in window.R13_DATA. Anything missing falls back to the copy below.
// Text from the CMS is written into the page escaped (E), never as markup.
const AS = window.R13_ASSETS || "";   // where the design pictures live: "" on the review pages, "/" when the CMS serves a page at any depth
const D = window.R13_DATA || {}, E = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const PIC = {}; (D.svc || []).forEach((x) => { if (x && x.img) PIC[x.k] = x.img; });
const CH = (k) => CAST === "team" ? (PIC[k] || `${AS}assets7/hu_${k}.webp`) : FIN === "c" ? `${AS}assets7/ch_${k}.webp` : FIN === "d" ? `${AS}assets7/${{ perf: "m16_bull_b", video: "m16_clap_a" }[k] || "ch_" + k}.webp` : `${AS}assets5/ch_${k}_${FIN}.webp`;   // ?ch=d: the 24 Nov mascot drafts (simpler bull, clapperboard head)
const CM = FIN === "c" || FIN === "d" ? { perf: 1.5, ads: .96, video: 1.26, web: 1.42 } : { perf: 1.6, ads: 1.5, video: 1.55, web: 1.55 };   // ring size by width: the crew are taller and narrower
window.R13 = { fin: FIN, cast: CAST };
let TRV = null;   // the travelling crew, set up after the sections it moves between

// ---- nav tone, drawer ----
const nav = $("#nav"), nb = $("#nb"), drawer = $("#drawer");
function tone() { nav.style.pointerEvents = "none"; const el = document.elementFromPoint(innerWidth / 2, 36); nav.style.pointerEvents = ""; const t = el && el.closest("[data-tone]");
  if (t) nav.classList.toggle("light", t.dataset.tone === "light" && !drawer.classList.contains("open")); nav.classList.toggle("sc", scrollY > 40 && !(t && t.id === "hero") && !drawer.classList.contains("open")); }
addEventListener("scroll", () => requestAnimationFrame(tone), { passive: true }); addEventListener("resize", tone); tone(); setTimeout(tone, 120);
if (nb) { const open = (on) => { nb.setAttribute("aria-expanded", on); drawer.classList.toggle("open", on); document.body.classList.toggle("lock", on); tone(); if (on) nav.classList.remove("light", "sc"); };
  nb.onclick = () => open(nb.getAttribute("aria-expanded") !== "true"); $$("a", drawer).forEach((a) => a.addEventListener("click", () => open(false))); addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); }); }

// ---- when a click opens something, glide so it is in view; the visitor's own scroll always wins ----
let gl = null;
function glideTo(y, dur) { y = Math.max(0, Math.round(y)); if (Math.abs(y - scrollY) < 6) return; if (!G) { scrollTo({ top: y, behavior: "instant" }); return; }
  const o = { y: scrollY }; if (gl) gl.kill(); gl = gsap.to(o, { y, duration: dur || .85, ease: "power3.inOut", onUpdate: () => scrollTo({ top: o.y, behavior: "instant" }) }); }
["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { if (gl) { gl.kill(); gl = null; } }, { passive: true }));
function showBlock(top, h) { const navH = (nav ? nav.offsetHeight : 0) + 14, pad = 26, vh = innerHeight; let y = scrollY;
  if (h > vh - navH - pad) y = top - navH; else if (top + h > y + vh - pad) y = top + h + pad - vh; else if (top < y + navH) y = top - navH; glideTo(y); }
window.R13.glideTo = glideTo;
// observers can hand over several entries at once (a jump on load, a layout shift); the last one is the current state, the first can be stale
const watch = (el, cb, th) => new IntersectionObserver((e) => cb(e[e.length - 1].isIntersecting), { threshold: th || .35 }).observe(el);

// ---- titles: words rise into place when they come into view ----
function split(el) { let i = 0; const wrap = (node) => { const w = document.createElement("span"); w.className = "w"; const s = document.createElement("span"); s.style.setProperty("--i", i++); s.appendChild(node); w.appendChild(s); return w; };
  [...el.childNodes].forEach((n) => { if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach((t) => { if (!t) return; f.appendChild(/^\s+$/.test(t) ? document.createTextNode(" ") : wrap(document.createTextNode(t))); }); n.replaceWith(f); }
    else if (n.nodeType === 1) n.replaceWith(wrap(n.cloneNode(true))); }); }
if (!RM) { $$("[data-rz]").forEach(split);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .3, rootMargin: "0px 0px -6% 0px" });
  $$("[data-rz]").forEach((el) => { if (!el.closest("#hero")) io.observe(el); }); }

// ---- hero versions, for review: ?hero=1 ring, 2 team photo, 3 photo split, 4 character line-up, 5 clean type ----
const HV = document.documentElement.dataset.hero || "1"; window.R13.hero = HV;
{ const sw = $("#hsw"); if (sw) { const u = new URLSearchParams(location.search);
  sw.innerHTML = "<span>Hero</span>" + [["1", "Ring"], ["2", "Team"], ["3", "Photo"], ["4", "Line-up"], ["5", "Clean"], ["6", "Crew"], ["7", "Film"]].map(([n, t]) => { u.set("hero", n); return `<a href="?${u}"${n === HV ? ' aria-current="true"' : ""}>${t}</a>`; }).join(""); } }
if (HV !== "1") { const hero = $("#hero");
  if (HV === "4") { const line = $("#hline");
    line.innerHTML = [["perf", "Performance"], ["ads", "Advertising"], ["video", "Creative"], ["web", "Web & App"]].map(([k, t], i) => `<button type="button" class="hc" data-i="${i}" aria-label="${t}: see the service"><img src="${CH(k)}" alt="" draggable="false"><span>${t}</span></button>`).join("");
    $$(".hc", line).forEach((b) => b.addEventListener("click", () => openSvc(+b.dataset.i, true, true))); }
  // 6 · crew: one character at a time rises out of the ring, and the last words of the headline change with it. Solid moves only, nothing fades in.
  if (HV === "6") { const st = $("#hstage"), bEl = $(".h1 .b");
    const CR = [["perf", ["Digital", "marketing?"], "Performance marketing"], ["ads", ["Paid", "ads?"], "Digital advertising"], ["video", ["Your", "content?"], "Creative design & video"], ["web", ["Your", "website?"], "Web & app development"]];
    const word = (i) => `<span class="rw">${CR[i][1].map((t) => `<span>${t}</span>`).join(" ")}</span>`;
    // the character and its ring drift with the pointer for depth; the label and dots sit outside that wrapper so they never move under a finger
    st.innerHTML = `<div class="svis"><i class="sring" aria-hidden="true"></i><div class="sclip" aria-hidden="true">${CR.map(([k]) => `<img class="sch" src="${CH(k)}" alt="" draggable="false">`).join("")}</div><i class="sring fr" aria-hidden="true"></i></div>
      <div class="sfoot"><button type="button" class="stag" id="stag"><span></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="sdots" role="group" aria-label="Pick a service">${CR.map((c) => `<button type="button" aria-label="${c[2]}"></button>`).join("")}</div></div>`;
    bEl.innerHTML = `<span class="sro">digital marketing?</span><span class="roll" aria-hidden="true">${word(0)}</span>`;
    const chs = $$(".sch", st), dots = $$(".sdots button", st), tag = $("#stag span"), roll = $(".roll", bEl), rings = $$(".sring", st); let cur = 0, tl = null, timer = null, hold = false, live = true;
    const label = () => { tag.textContent = CR[cur][2]; dots.forEach((d, i) => d.setAttribute("aria-current", i === cur)); }; label();
    function go(to) { to = (to + CR.length) % CR.length; if (to === cur) return; if (tl) tl.progress(1); const a = chs[cur], b = chs[to]; cur = to;
      if (!G) { chs.forEach((c, i) => c.classList.toggle("on", i === cur)); roll.innerHTML = word(cur); label(); return; }
      const old = roll.firstElementChild; roll.insertAdjacentHTML("beforeend", word(cur)); const nw = roll.lastElementChild;
      tl = gsap.timeline({ onComplete: () => { tl = null; } });
      tl.to(a, { yPercent: 104, duration: .4, ease: "power2.in" }, 0).fromTo(b, { yPercent: 104 }, { yPercent: 0, duration: .8, ease: "back.out(1.4)" }, .36)
        .to(old, { yPercent: -110, duration: .5, ease: "power3.in", onComplete: () => old.remove() }, 0).fromTo(nw, { yPercent: 110 }, { yPercent: 0, duration: .7, ease: "power3.out" }, .3)
        .fromTo(rings, { "--gl": 1 }, { "--gl": 0, duration: 1.1, ease: "power2.out" }, .34).add(label, .36); }
    const play = () => { clearInterval(timer); if (G) timer = setInterval(() => { if (!hold && live && !document.hidden) go(cur + 1); }, 3600); };
    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); play(); }));
    $("#stag").addEventListener("click", () => openSvc(cur, true, true)); chs.forEach((c) => c.addEventListener("click", () => openSvc(cur, true, true)));
    st.addEventListener("pointerenter", () => { hold = true; }); st.addEventListener("pointerleave", () => { hold = false; });
    new IntersectionObserver((e) => { live = e[e.length - 1].isIntersecting; }, { threshold: .4 }).observe(hero);
    window.R13.crew = { go, get cur() { return cur; }, get busy() { return !!tl; } };
    if (G) { gsap.set(chs, { yPercent: 104, visibility: "visible" }); gsap.from(rings, { scaleX: .2, scaleY: .2, opacity: 0, duration: .9, ease: "back.out(1.5)", delay: .3 });
      gsap.to(chs[0], { yPercent: 0, duration: .95, ease: "back.out(1.4)", delay: .8 }); gsap.fromTo(rings, { "--gl": 1 }, { "--gl": 0, duration: 1.3, ease: "power2.out", delay: .8, immediateRender: false });
      gsap.from(roll.firstElementChild, { yPercent: 110, duration: .9, ease: "power3.out", delay: .47 }); play(); }
    else chs[0].classList.add("on"); }
  // 7 · film: the crew as one looping studio shot. It plays only while the banner is on screen; reduced motion gets the still.
  //     2 · team gets the same treatment: the campaign photograph as a short loop of small movements (a laugh, a glance, a shift of weight).
  if (HV === "7" || HV === "2") { const f = HV === "7" ? $("#hfilm") : $(".hteam"), nm = HV === "7" ? "crew_film" : "team_film";
    f.innerHTML = `<video muted loop playsinline preload="auto" poster="${AS}assets7/${nm}.webp"${RM ? "" : ` src="${AS}assets7/${nm}.mp4"`}></video>`; const v = $("video", f); v.muted = true; window.R13.film = v;
    if (!RM) new IntersectionObserver((e) => { if (e[e.length - 1].isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .15 }).observe(hero);
    if (G) gsap.from(v, { scale: 1.09, duration: 2.2, ease: "power3.out", transformOrigin: "50% 100%" }); }
  $$(".h1 .rz").forEach((el, i) => setTimeout(() => el.classList.add("in"), G ? 250 + i * 220 : 0));
  if (G) { const E = "power3.out";
    gsap.from(".hero .lead, .hero .ctas, .hproof li, .sfoot", { y: 18, opacity: 0, duration: .8, stagger: .1, delay: .8, ease: E });
    if (HV === "3") { gsap.from(".hsplit figure", { y: 60, opacity: 0, duration: 1.2, delay: .25, ease: E }); gsap.from(".hg", { scale: .7, opacity: 0, duration: .7, stagger: .16, delay: 1, ease: "back.out(1.7)" }); }
    if (HV === "4") gsap.from(".hc", { y: 90, opacity: 0, duration: .9, stagger: .09, delay: .4, ease: "back.out(1.5)" });
    // ---- depth: a light that follows the cursor, layers that move at different speeds, a zoom as you scroll away, dust in the air.
    //      Transforms and opacity only, on wrappers GSAP does not tween, and only while the banner is on screen.
    const neon = $("#neon"), copy = $(".hcopy"), vis = HV === "2" ? $(".hteam") : HV === "3" ? $(".hsplit") : HV === "6" ? $(".svis") : HV === "7" ? $("#hfilm") : null, chars = $$(".hc", hero), lean = $(".sclip", hero);
    const glow = document.createElement("i"); glow.className = "hglow"; $(".hbg").appendChild(glow);
    const dust = document.createElement("div"); dust.className = "hdust"; dust.setAttribute("aria-hidden", "true");
    dust.innerHTML = Array.from({ length: 18 }, (_, i) => `<i style="left:${(rnd(i) * 100).toFixed(1)}%;top:${(25 + rnd(i + 9) * 70).toFixed(1)}%;--s:${(.5 + rnd(i + 3) * 1.5).toFixed(2)};--d:${(9 + rnd(i + 5) * 10).toFixed(1)}s;--dl:${(-rnd(i + 7) * 14).toFixed(1)}s"></i>`).join(""); hero.appendChild(dust);
    let tx = 0, ty = 0, px = 0, py = 0, gx = hero.clientWidth / 2, gy = hero.clientHeight * .4, sgx = gx, sgy = gy, sc = 0, on = false; const intro = { k: 0 }, t0 = performance.now();
    gsap.to(intro, { k: 1, duration: 1.7, ease: E, delay: .1 }); gsap.fromTo(neon, { opacity: 0 }, { opacity: 1, duration: 1.2 });
    if (matchMedia("(pointer:fine)").matches) { hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; gx = e.clientX - r.left; gy = e.clientY - r.top; glow.style.opacity = 1; });
      hero.addEventListener("pointerleave", () => { tx = ty = 0; glow.style.opacity = 0; }); }
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", onUpdate: (s) => { sc = s.progress; } });
    const frame = () => { if (!on) return; const T = (performance.now() - t0) / 1000; px += (tx - px) * .06; py += (ty - py) * .06; sgx += (gx - sgx) * .1; sgy += (gy - sgy) * .1;
      const k = (.72 + .28 * intro.k) * (1 + Math.sin(T * .9) * .012) * (1 + sc * .3);
      neon.style.transform = `translate(-50%,-50%) translate3d(${(-px * 20).toFixed(1)}px,${(-py * 14 + sc * 40).toFixed(1)}px,0)${HV === "5" ? ` perspective(1100px) rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 11).toFixed(2)}deg)` : ""} scale(${k.toFixed(4)})`;
      copy.style.transform = `translate3d(${(px * 12).toFixed(1)}px,${(py * 8 - sc * 110).toFixed(1)}px,0)`; copy.style.opacity = Math.max(0, 1 - sc * 1.7).toFixed(3);
      glow.style.transform = `translate3d(${sgx.toFixed(0)}px,${sgy.toFixed(0)}px,0)`;
      if (HV === "2") vis.style.transform = `translate3d(${(px * -26).toFixed(1)}px,${(py * -10).toFixed(1)}px,0) scale(${(1.03 + sc * .14).toFixed(4)})`;
      if (HV === "3") vis.style.transform = `perspective(1300px) translate3d(${(px * -16).toFixed(1)}px,${(py * -10 - sc * 50).toFixed(1)}px,0) rotateY(${(px * -8).toFixed(2)}deg) rotateX(${(py * 5).toFixed(2)}deg)`;
      if (HV === "6") { vis.style.transform = `translate3d(${(px * -18).toFixed(1)}px,${(py * -8 - sc * 46).toFixed(1)}px,0)`; lean.style.transform = `rotate(${(px * 2.4).toFixed(2)}deg)`; }
      if (HV === "7") vis.style.transform = `translate3d(${(px * -14).toFixed(1)}px,${(py * -6).toFixed(1)}px,0) scale(${(1.04 + sc * .12).toFixed(4)})`;
      if (HV === "4") chars.forEach((c, i) => { const lean = px - (i - 1.5) / 3; c.style.setProperty("--lx", (lean * 10).toFixed(1)); c.style.setProperty("--ly", (Math.sin(T * 1.6 + i * 1.3) * 5 - sc * 30 * (1 + i % 2)).toFixed(1)); c.style.setProperty("--lr", (lean * 7).toFixed(2)); });
      requestAnimationFrame(frame); };
    new IntersectionObserver((e) => { const v = e[e.length - 1].isIntersecting; hero.classList.toggle("live", v); if (v && !on) { on = true; frame(); } else if (!v) on = false; }).observe(hero); } }

// ---- hero 1: the pieces ride a neon ring around the headline; the four service characters are the big ones ----
//      The Team and Avatar pages use it as "the circle" (Sue, 24 Nov): no glowing ring, the pieces packed closer on a gently wavy circle round the headline.
//      Avatar keeps its four characters in the circle (they jump down into the services from there); Team has objects only, with the two people leaning in.
if (HV === "1") { const hero = $("#hero"), ring = $("#ring"), neon = $("#neon"), WR = !!CAST;
  const ALL = [[CH("perf"), CM.perf], [AS + "assets2/heart_w.webp", .8], [AS + "assets5/laptop_k.webp", 1.05], [AS + "assets2/play_k.webp", .85], [AS + "assets2/hashtag_w.webp", .8],
    [CH("ads"), CM.ads], [AS + "assets2/bubble_w.webp", .9], [AS + "assets5/pen_w.webp", .8], [AS + "assets2/thumb_k.webp", .9], [AS + "assets2/chart_w.webp", .95],
    [CH("video"), CM.video], [AS + "assets5/swatch_k.webp", .95], [AS + "assets2/envelope_w.webp", .85], [AS + "assets2/coin_w.webp", .75], [AS + "assets2/camera_k.webp", .95],
    [CH("web"), CM.web], [AS + "assets2/magnifier_k.webp", .9], [AS + "assets2/phone_k.webp", .9], [AS + "assets2/bolt_w.webp", .7]];
  const MORE = [[AS + "assets2/bag_w.webp", .8], [AS + "assets2/cursor_w.webp", .7], [AS + "assets5/cart_k.webp", .85], [AS + "assets5/clapper_k.webp", .85], [AS + "assets5/browser_w.webp", .9]];
  const KEYS = CAST === "toy" ? ["perf", "video", "web"] : ["perf", "ads", "video", "web"], OBJ = ALL.filter((x, i) => i % 5 !== 0).concat(MORE);
  // Team and Avatar: objects only in the circle, packed tight: the set twice over at different sizes; the characters stand big outside it
  const PIECES = WR ? OBJ.concat(OBJ.map(([sr, m], i) => [sr, m * (.72 + rnd(i + 70) * .2)])).sort((a, b) => rnd(a[0].length + a[1] * 31) - rnd(b[0].length + b[1] * 17)) : ALL;   // Team: no cut-out people in the circle
  const N = PIECES.length; if (WR) ring.classList.add("fx");
  let hcx = null; if (CAST === "toy") { hcx = document.createElement("div"); hcx.className = "hcx"; hcx.setAttribute("aria-hidden", "true");
    hcx.innerHTML = KEYS.map((k, i) => `<img class="hc${["l", "c", "r"][i] || "c"}" data-k="${k}" src="${CH(k)}" alt="" draggable="false">`).join(""); hero.appendChild(hcx); }
  const P = PIECES.map(([src, m], i) => { const el = document.createElement("img"); el.className = "pc"; el.src = src; el.alt = ""; el.draggable = false; ring.appendChild(el);
    const ck = KEYS.find((kk) => CH(kk) === src); if (CAST === "toy" && ck) el.dataset.k = ck;   // a character: the crew's jump starts here
    return { el, m: WR ? m * (.82 + rnd(i + 40) * .4) : m, a: i / N * Math.PI * 2 + (WR ? (rnd(i + 9) - .5) * .12 : 0), r: WR ? .97 + rnd(i) * .08 : .98 + rnd(i) * .26, v: (rnd(i + 50) - .5) * (WR ? .04 : .12), tilt: (rnd(i + 90) - .5) * 26, px: 0, py: 0, front: null, b: RM ? 1 : 0 }; });
  let w = 0, h = 0, A = 0, B = 0, cyf = .46;
  const fit = () => { w = hero.clientWidth; h = hero.clientHeight; const ph = w <= 900; cyf = ph ? .33 : WR ? .42 : .46;
    if (WR) { const R = ph ? Math.min(w * .5, h * .27) : Math.min(h * .36, w * .3); A = R * (ph ? 1 : 1.06); B = R; }   // a true circle round the headline
    else { A = ph ? w * .6 : Math.min(w * .41, h * .8); B = ph ? h * .3 : h * .335; }
    const base = Math.min(w, h) * (WR ? (w < 700 ? .135 : .1) : w < 700 ? .15 : .122); P.forEach((p, i) => { p.el.style.width = (base * p.m) + "px"; p.el.hidden = !WR && w < 700 && i % 2 === 1 && p.m < 1.2; });
    neon.style.width = (ph ? w * 1.12 : A * 2) + "px"; neon.style.height = (ph ? h * .54 : B * 2) + "px"; neon.style.top = (cyf * 100) + "%"; };
  fit(); addEventListener("resize", fit);
  let ptr = { x: 0, y: 0 }, pt = { x: 0, y: 0 }, mouse = { x: -1e4, y: -1e4 }, lift = 0, t0 = performance.now(), run = true; const kick = { k: 0 };
  function frame() { if (!run) return; const T = (performance.now() - t0) / 1000; ptr.x += (pt.x - ptr.x) * .06; ptr.y += (pt.y - ptr.y) * .06;
    const ph = w <= 900, ex0 = 1 + lift * (WR ? 2.6 : .22) + kick.k, cx = w * .5 + ptr.x * 26, ht = WR ? hero.getBoundingClientRect().top : 0, cy0 = h * cyf + ptr.y * 18 + ht, spin = (RM ? 0 : T * (WR ? .05 : .2)) + lift * (WR ? .5 : 1.6) + ptr.x * (WR ? .08 : .22);
    for (const p of P) { const th = p.a + spin, z = WR ? .6 : Math.sin(th), d = (z + 1) / 2, ex = ex0, cy = cy0 + (WR ? lift * h * .38 : 0);   // flat circle (no depth) like the reference; on scroll it opens out and drifts down
      const wv = WR ? 1 + .075 * Math.sin(3 * th + (RM ? 0 : T * .35)) : 1;   // the wavy circle
      const x = cx + Math.cos(th) * A * ex * p.r * wv * (.9 + .1 * d); let y = cy + (WR ? Math.sin(th) : z) * B * ex * p.r * wv + p.v * h * .2 + (RM ? 0 : Math.sin(T * 1.3 + p.a * 3) * 7);
      if (ph && !WR) { const top = h * .16, bot = h * .57; if (Math.abs(x - w / 2) < w * .42 && y > top && y < bot) y = y - top < bot - y ? top - (y - top) * .2 : bot + (bot - y) * .2; }   // keep the headline clear on phones
      const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy); let tx = 0, ty = 0; if (dist < 190 && dist > 0) { const f = (190 - dist) / 190 * 46; tx = dx / dist * f; ty = dy / dist * f; }
      if (!ph && lift < .05) y = Math.max(y, 104);   // keep the nav clear
      p.px += (tx - p.px) * .12; p.py += (ty - p.py) * .12; const s = (WR ? 1 + lift * 1.1 : .62 + .48 * d) * p.b;   // the fish-eye: they grow as the circle opens
      const rot = WR ? p.tilt * .7 + Math.cos(th) * 16 + lift * Math.sign(Math.cos(th)) * 30 : p.tilt;   // the curviness: pieces lean with the circle
      p.el.style.transform = `translate(${(x + p.px).toFixed(1)}px,${(y + p.py).toFixed(1)}px) translate(-50%,-50%) rotate(${(rot + (RM ? 0 : Math.sin(T * .8 + p.a * 2) * (WR ? 3 : 7))).toFixed(1)}deg) scale(${s.toFixed(3)})`;
      const front = WR || z > -.15; if (front !== p.front) { p.front = front; p.el.classList.toggle("near", front); p.el.classList.toggle("far", !front); } }
    requestAnimationFrame(frame); }
  new IntersectionObserver((e) => { const on = e[e.length - 1].isIntersecting; ring.style.visibility = on ? "" : "hidden"; if (on && !run) { run = true; frame(); } else if (!on) run = false; }).observe(hero); frame();
  window.R13.ringPiece = (k) => (hcx && hcx.querySelector(`img[data-k="${k}"]`)) || ring.querySelector(`.pc[data-k="${k}"]`);   // the travelling crew starts its jump from here
  if (hcx && G) gsap.from($$("img", hcx), { yPercent: 70, duration: 1, stagger: .12, delay: .5, ease: "back.out(1.2)" });   // they rise into place, solid
  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); pt = { x: (e.clientX - r.left) / r.width * 2 - 1, y: (e.clientY - r.top) / r.height * 2 - 1 }; mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  hero.addEventListener("pointerleave", () => { pt = { x: 0, y: 0 }; mouse = { x: -1e4, y: -1e4 }; });
  const rise = () => $$(".h1 .rz").forEach((el, i) => setTimeout(() => el.classList.add("in"), 250 + i * 220));
  if (G) { rise(); const tl = gsap.timeline({ delay: .1 });
      tl.fromTo(neon, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: .72, opacity: 0 }, { xPercent: -50, yPercent: -50, scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" }, 0).to(P, { b: 1, duration: 1, stagger: { each: .035, from: "random" }, ease: "back.out(1.7)" }, .15)
      .from(".hero .lead, .hero .ctas", { y: 18, opacity: 0, duration: .8, stagger: .12, ease: "power3.out" }, .9)
;
    // the two people lean in from the corners as solid cut-outs (no fade: a ghosted photo over the ring read as cheap), and only once both photos are decoded.
    // When she lands with the megaphone, the ring takes the blast.
    const pl = $(".pp.l"), pr = $(".pp.r");
    gsap.set(pl, { xPercent: -105, yPercent: 10, rotation: -13, transformOrigin: "0% 100%" }); gsap.set(pr, { xPercent: 105, yPercent: 10, rotation: 13, transformOrigin: "100% 100%" }); $(".ppl").classList.add("on");
    const ready = (im) => (im.decode ? im.decode() : Promise.resolve()).catch(() => {});
    Promise.all([ready(pl), ready(pr), new Promise((r) => setTimeout(r, 600))]).then(() => {
      gsap.timeline().to(pl, { xPercent: 0, yPercent: 0, rotation: 0, duration: 1, ease: "back.out(1.15)" }, 0).to(pr, { xPercent: 0, yPercent: 0, rotation: 0, duration: 1, ease: "back.out(1.15)" }, .16)
        .fromTo(kick, { k: .085 }, { k: 0, duration: 1.4, ease: "elastic.out(1,.32)", immediateRender: false }, .78).fromTo(pr, { scale: 1.035 }, { scale: 1, duration: .7, ease: "power2.out", immediateRender: false }, .78); });
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", scrub: .4, onUpdate: (s) => { lift = s.progress; } }); }   // scroll widens the ring as you leave; no pin
  else { $$(".h1 .rz").forEach((el) => el.classList.add("in")); $(".ppl").classList.add("on"); }

  // pieces that carry on out of the banner and mingle with the next title
  const spill = CAST ? null : $("#spill"), ph = PHONE();   // the Team and Avatar pages: no separate pieces here, the circle itself flows down
  const S = ph ? [[AS + "assets2/bag_w.webp", -3, -64, 66, -14], [AS + "assets5/cart_k.webp", 76, -118, 80, 8], [AS + "assets5/card_w.webp", 44, -92, 50, 14]]
    : [[AS + "assets2/bag_w.webp", 2, -104, 122, -14], [AS + "assets2/cursor_w.webp", 44, -52, 78, -8], [AS + "assets5/cart_k.webp", 57, -6, 156, 8], [AS + "assets5/browser_w.webp", 73, -98, 176, -7], [AS + "assets5/card_w.webp", 71, 112, 98, 14], [AS + "assets5/clapper_k.webp", 88, 6, 136, 12]];
  // GSAP clears the independent rotate/translate properties on anything it tweens, so the tilt goes through GSAP when it runs
  if (spill) spill.innerHTML = S.map(([s, l, t, wd, r]) => `<img class="${RM ? "" : "fl"}" src="${s}" alt="" draggable="false" style="left:${l}%;top:${t}px;width:${ph ? wd + "px" : `clamp(${Math.round(wd * .7)}px,${(wd / 14.4).toFixed(2)}vw,${wd}px)`};${G ? "" : `rotate:${r}deg`}">`).join("");
  if (G && spill) $$("img", spill).forEach((im, i) => { gsap.set(im, { rotation: S[i][4] }); gsap.from(im, { scale: 0, duration: .9, delay: .9 + i * .08, ease: "back.out(1.6)" });
    gsap.fromTo(im, { y: 0 }, { y: ph ? 14 + i * 8 : 50 + i * 18, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }); }); }   // they lag behind the banner, so they linger beside the next title

// ---- logos: square marks in circles, the name beside; two ribbons that speed up with the scroll ----
const ribs = [];
function ribbon(row, dir, speed) { const o = { row, dir, speed, x: 0, half: 0, on: false }; const meas = () => { o.half = row.scrollWidth / 2; }; meas();
  if (window.ResizeObserver) new ResizeObserver(meas).observe(row); new IntersectionObserver((e) => { o.on = e[e.length - 1].isIntersecting; }, { rootMargin: "120px" }).observe(row); ribs.push(o); }
if (G) { let ly = scrollY, v = 0; gsap.ticker.add((t, dt) => { const d = Math.min(64, dt) / 1000, dy = Math.abs(scrollY - ly); ly = scrollY; v += (Math.min(2400, dy / d) - v) * .1;
  for (const o of ribs) { if (!o.on || !o.half) continue; o.x += (o.speed + v * .35) * o.dir * d; o.x = ((o.x % o.half) + o.half) % o.half; o.row.style.transform = `translate3d(${-o.x}px,0,0)`; } }); }
// On a phone two rows left the section thin (David 23 Nov: "should be 3/4 rows"), so it gets four shorter rows there; rebuilt if the width crosses the breakpoint.
{ const box = $("#lrib"), L = window.R13_LOGOS || []; if (box) { const build = () => { const rows = PHONE() ? 4 : 2, cut = (r) => Math.round(r * L.length / rows); box.dataset.rows = rows;
  for (let i = ribs.length - 1; i >= 0; i--) if (box.contains(ribs[i].row)) ribs.splice(i, 1);
  box.innerHTML = Array.from({ length: rows }, (_, r) => r).map((r) => { const set = L.slice(cut(r), cut(r + 1));
    return `<div class="lrw">${set.concat(set).map(([f, n, u], i) => `<div class="lcp"${i < set.length ? ' role="listitem"' : ' aria-hidden="true"'}><span class="mk"><img src="${E(u || `${AS}assets5/lm_${f}.webp`)}" alt="" loading="lazy" draggable="false"></span><span>${E(n)}</span></div>`).join("")}</div>`; }).join("");
  $$(".lrw", box).forEach((row, r) => ribbon(row, r % 2 ? -1 : 1, rows > 2 ? 26 + (r % 3) * 5 : 36)); };
  build(); matchMedia("(max-width:900px)").addEventListener("change", build); } }

// ---- services: one red banner; open one and the others fold into coloured tabs ----
const SVC4 = [
  { k: "perf", n: "Performance Marketing", tags: ["Lead generation", "Google SEM", "SEO & AI search", "Tactical campaigns"], p: "Stop paying for vanity clicks that don't pick up the phone.", st: ["37%", "lower cost per acquisition"] },
  { k: "ads", n: "Digital Advertising", tags: ["Meta Ads", "TikTok & XHS", "Marketplace Ads", "Google Ads"], p: "Traffic without purchase intent is just a utility bill.", st: ["22×", "return on ad spend"] },
  { k: "video", n: "Creative Design & Video", tags: ["Social media", "Video production", "KOL & UGC", "Branding"], p: "In saturated feeds, creative strategy is your targeting strategy.", st: ["7M+", "organic reach, nationwide"] },
  { k: "web", n: "Web & App Development", tags: ["E-Commerce", "Booking System", "Loyalty Apps", "Ad Landing Page"], p: "Most marketing fails before the ad is clicked: it dies on a slow, confusing website.", st: ["700+", "leads a week after the redesign"] }];
const SVC3 = [   // three services (24 Nov: performance marketing now includes digital advertising)
  { k: "perf", n: "Performance Marketing", tags: ["Meta Ads", "Google Ads", "TikTok & XHS", "SEO & AI search", "Lead generation"], p: "Stop paying for vanity clicks that don't pick up the phone." },
  { k: "video", n: "Creative Design & Video", tags: ["Social media", "Video production", "KOL & UGC", "Branding"], p: "In saturated feeds, creative strategy is your targeting strategy." },
  { k: "web", n: "Web & App Development", tags: ["E-Commerce", "Booking System", "Loyalty Apps", "Ad Landing Page"], p: "Most marketing fails before the ad is clicked: it dies on a slow, confusing website." }];
const SVC = D.svc || (CAST ? SVC3 : SVC4);   // the Team and Avatar pages have three services; the reference page keeps the earlier four
const TAG = (t) => (t && typeof t === "object" ? `<li><a href="${E(t.href)}">${E(t.t)}</a></li>` : `<li>${E(t)}</li>`);
let openSvc = () => {};
{ const acc = $("#acc"); if (acc) {
  acc.innerHTML = '<i class="arc" aria-hidden="true"></i>' + SVC.map((s, i) => `<article class="pn" data-k="${s.k}"><button class="pb" type="button" id="pb${i}" aria-expanded="false" aria-controls="pd${i}"><span class="pch"><img src="${CH(s.k)}" alt="" draggable="false"></span><span class="pnm">${E(s.n)}</span><span class="pvt" aria-hidden="true">${E(s.n)}</span><span class="pm" aria-hidden="true"></span></button>
    <div class="pd" id="pd${i}" role="region" aria-labelledby="pb${i}" inert><div class="pdi"><div class="pl"><h3>${E(s.n)}</h3><ul class="tags">${(s.tags || []).map(TAG).join("")}</ul><p class="pline">${E(s.p)}</p><a class="btn" href="${E(s.href || "#connect")}">${E(D.svcBtn || (s.href ? "Explore the service" : "Talk about this"))}${AR}</a></div>
    <div class="pr"><div class="pstage"><img src="${CH(s.k)}" alt="" loading="lazy" draggable="false"><span class="pm pmx" aria-hidden="true"></span></div></div></div></div></article>`).join("");
  const pn = $$(".pn", acc);
  openSvc = (i, reveal, force) => { const was = pn[i].classList.contains("open"), on = force || !was; let t = 0;
    pn.forEach((p, j) => { const o = on && j === i; p.classList.toggle("open", o); p.classList.remove("t0", "t1", "t2"); if (on && !o) p.classList.add("t" + t++); $(".pb", p).setAttribute("aria-expanded", o); $(".pd", p).inert = !o; });
    acc.classList.toggle("has", on);
    if (reveal && on) { if (PHONE()) setTimeout(() => { const r = pn[i].getBoundingClientRect(); showBlock(r.top + scrollY, r.height); }, 640); else { const r = acc.getBoundingClientRect(); showBlock(r.top + scrollY, r.height); } } };
  pn.forEach((p, i) => $(".pb", p).addEventListener("click", () => openSvc(i, true))); window.R13.openSvc = openSvc;
  // team version: the four people step up into their tiles when the banner is first seen (a solid rise from the tile's edge, in the stylesheet)
  if (CAST === "team") { if (RM) acc.classList.add("seen"); else { const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { acc.classList.add("seen"); io.disconnect(); } }, { threshold: .3 }); io.observe(acc); } } } }

// ---- headache match (revamped 23 Nov, David: "this section sucks bro. revamp it"): one dark panel. Pick the headache on the left;
//      on the right it plays out as a chat: your line, Battle typing, then the service that fixes it with one result, and the character for that service steps up.
//      The red bar under the active line is the autoplay clock: when it fills, the next headache plays. It pauses on hover, on focus and off screen. Nothing fades in: bubbles pop, characters rise.
const DG0 = [
  { t: "No walk-ins", q: "We have no walk-in traffic, and there's a lot of new competition in the area.", s: 0, why: "Location-targeted Meta and Google ads that bring people through the door, measured in walk-ins, not likes." },
  { t: "Dry social media", q: "Our social media is dry, our ads look like generic AI graphics, and people scroll past us.", s: 1, why: "Thumb-stopping content and UGC campaigns that people actually stop for." },
  { t: "Visitors, no enquiries", q: "We get website visitors, but nobody converts or fills out the form.", s: 2, why: "A fast, mobile-first site and landing pages built to turn visits into enquiries." },
  { t: "Customers don't come back", q: "We spend everything getting new customers, but very few of them come back.", s: 0, why: "Automated CRM and WhatsApp nurturing, plus loyalty, that brings buyers back." },
  { t: "New brand, no trust yet", q: "We're launching a new brand, and competitors look way more legit than us.", s: 1, why: "A brand identity and content that make you look like the leader from day one." }];
const DG3 = [   // slide 5: no walk-ins, dry social media, no trust
  { t: "No walk-ins", q: "We have no walk-in traffic, and there's a lot of new competition in the area.", s: 0, why: "Location-targeted Meta and Google ads that bring people through the door, measured in walk-ins, not likes.", img: AS + "assets7/hp_walkin.webp" },
  { t: "Dry social media", q: "Our social media is dry. People are scrolling past us despite our efforts.", s: 1, why: "Thumb-stopping content and UGC campaigns that people actually stop for.", img: AS + "assets7/hp_social.webp" },
  { t: "New brand, no trust yet", q: "We're launching a new brand, and competitors look way more legit than us.", s: 1, why: "A brand identity and content that make you look like the leader from day one.", img: AS + "assets7/hp_trust.webp" }];
const DG = D.dg || (CAST ? DG3 : DG0.map((d, i) => ({ ...d, s: [1, 2, 3, 0, 2][i] })));
const DGPH = DG.length > 0 && DG.every((d) => d.img);   // photos: the chat sits on a picture, and no character comes into this section   // the reference page: four panels
{ const pn = $("#dgp"); if (pn) {
  pn.innerHTML = `<div class="dgl" role="group" aria-label="Common marketing headaches"><p class="dgk">${E(D.dgk || "What's your headache?")}</p>${DG.map((d, i) => `<button type="button" class="dgr" aria-pressed="false"><i>0${i + 1}</i><span>${E(d.t)}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`).join("")}</div>
    <div class="dgs"><div class="dgch${DGPH ? " dgph" : ""}" aria-hidden="true">${DGPH ? DG.map((d) => `<img src="${E(d.img)}" alt="" loading="lazy" draggable="false">`).join("") : SVC.map((s) => `<img src="${CH(s.k)}" alt="" loading="lazy" draggable="false">`).join("")}</div>
    <div class="dgc" aria-live="polite"><div class="dgb bt"><span>${E(D.dghi || "How can we help you?")}</span></div><div class="dgb me" id="dgq"><span></span></div>
      <div class="dgre"><div class="dgb bt ty" id="dgty" aria-hidden="true"><i></i><i></i><i></i></div><div class="dgb bt rp" id="dga"><small>${E(D.dgjob || "That's a job for")}</small><b></b><p></p><div class="dgst"><b></b><span></span></div></div></div>
      <div class="dgx" id="dgx"><button type="button" class="btn sm" id="dgsvc">See the service${AR}</button><a class="btn sm gh" href="#connect" id="dgask">Talk about this</a></div></div></div>`;
  if (DGPH) { pn.classList.add("ph"); const sec = pn.closest(".dg"); if (sec) sec.classList.add("phm"); }
  const rows = $$(".dgr", pn), chs = $$(".dgch img", pn), q = $("#dgq"), ty = $("#dgty"), a = $("#dga"), ax = $("#dgx"), dots = $$("i", ty); let cur = -1, tl = null, inView = false, hold = false;
  const fill = (i) => { const d = DG[i], sv = SVC[d.s]; $("span", q).textContent = d.q; $("b", a).textContent = sv.n; $("p", a).textContent = d.why; $(".dgst b", a).textContent = (sv.st || [])[0] || ""; $(".dgst span", a).textContent = (sv.st || [])[1] || ""; };
  // with the travelling crew, the clock waits until the character has arrived.
  // A bar that was created while the clock was held is started afresh when the clock is released: resuming a bar that has never run can end it at once in Chrome, and the next headache would skip in.
  //    As a second guard the script keeps its own count of how long the bar has really run (CLK matches the 6.4s in the stylesheet): a bar that reports its end early is simply started again.
  const CLK = 6400; let fresh = false, ran = 0, t0 = 0;
  const rebar = (r) => { r.classList.remove("on"); void pn.offsetWidth; r.classList.add("on"); ran = 0; t0 = pn.classList.contains("run") ? performance.now() : 0; fresh = !t0; };
  const clock = () => { const on = inView && !hold && !RM && (!TRV || TRV.docked), was = pn.classList.contains("run"); pn.classList.toggle("run", on);
    if (on && !was) t0 = performance.now(); if (!on && was && t0) { ran += performance.now() - t0; t0 = 0; } if (on && fresh && cur >= 0) rebar(rows[cur]); };
  function go(i) { i = (i + DG.length) % DG.length; if (i === cur) return; if (tl) tl.progress(1); const from = cur < 0 ? -1 : DGPH ? cur : DG[cur].s, to = DGPH ? i : DG[i].s; cur = i;   // photos follow the headache, characters follow the service
    rows.forEach((r, j) => { r.setAttribute("aria-pressed", String(j === i)); r.classList.remove("on"); }); rebar(rows[i]);   // restarts the clock bar
    if (!G) { fill(i); chs.forEach((c, j) => c.classList.toggle("on", j === to)); return; }
    tl = gsap.timeline({ onComplete: () => { tl = null; } });
    tl.to([ax, a, q], { scale: 0, duration: .16, ease: "power2.in", stagger: .03 }, 0).add(() => fill(i), .26)
      .fromTo(q, { scale: 0 }, { scale: 1, duration: .42, ease: "back.out(1.6)" }, .28).fromTo(ty, { scale: 0 }, { scale: 1, duration: .24, ease: "back.out(2)" }, .6).to(ty, { scale: 0, duration: .14, ease: "power2.in" }, 1.06).fromTo(dots, { y: 0 }, { y: -4, duration: .15, stagger: .09, yoyo: true, repeat: 1, ease: "sine.inOut" }, .7)
      .fromTo(a, { scale: 0 }, { scale: 1, duration: .5, ease: "back.out(1.4)" }, 1.18).fromTo(ax, { scale: 0 }, { scale: 1, duration: .4, ease: "back.out(1.6)" }, 1.38);
    if (from !== to) { if (from >= 0) tl.to(chs[from], { yPercent: 106, duration: .34, ease: "power2.in" }, 0); if (from < 0 && TRV && !TRV.docked && !DGPH) tl.set(chs[to], { yPercent: 0 }, 0);   // the first character is carried in by the scroll, so it does not also rise
      // people are cut at the thigh, so they rise without a bounce: an overshoot would lift the cut edge off the floor and push the head out of the top
      else tl.fromTo(chs[to], { yPercent: 106 }, { yPercent: 0, duration: CAST === "team" || DGPH ? .7 : .8, ease: CAST === "team" || DGPH ? "power3.out" : "back.out(1.3)" }, from >= 0 ? .36 : .1); } }
  if (G) { gsap.set(chs, { yPercent: 106, visibility: "visible" }); gsap.set([q, a, ax, ty], { scale: 0 }); }
  rows.forEach((r, i) => { r.addEventListener("click", () => go(i)); r.addEventListener("animationend", (e) => { if (e.target !== r || i !== cur) return; if (ran + (t0 ? performance.now() - t0 : 0) < CLK * .9) rebar(r); else go(cur + 1); }); });
  pn.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hold = true; clock(); } }); pn.addEventListener("pointerleave", () => { hold = false; clock(); });
  pn.addEventListener("focusin", () => { hold = true; clock(); }); pn.addEventListener("focusout", () => { if (!pn.matches(":hover")) { hold = false; clock(); } });
  $("#dgsvc").addEventListener("click", () => openSvc(DG[cur].s, true, true));
  $("#dgask").addEventListener("click", () => { const inp = $("#askin"); if (inp && !inp.value) inp.value = DG[cur].q; });
  let seen = false; watch(pn, (on) => { inView = on; if (on && !seen) { seen = true; go(0); } clock(); }, .3);   // the first one plays when the panel is first seen
  if (!G) { seen = true; go(0); }
  window.R13.dgPhotos = DGPH; window.R13.chat = { go, sync: clock, get cur() { return cur; }, get svc() { return DG[Math.max(cur, 0)].s; }, get playing() { return pn.classList.contains("run"); }, get busy() { return !!tl; } }; } }

// ---- avatar version: the crew travels down the page (David 23 Nov: "the avatar is on hero, service, marketing headache. anyways to let them transition smoothly to the next section?",
//      then "able to do like they jumped down and landed?" and "can the bunny do a front flip jump to the bottom?").
//      One fixed layer carries four flyers. Jump A: when the services tiles are in view the four drop from the film, fall, and land with a squash, one after another.
//      Jump B, for the character answering the headache, has two parts, because its tile and its place in the chat are never on screen together:
//      first it hops out of its tile onto the top edge of the chat panel and rides there; when the panel is fully in view it crouches, turns one full front flip and lands in the chat.
//      A jump is a real jump: the scroll only sets it off, then it plays in its own time (and plays backwards when you scroll back up), so nobody is ever left hanging upside down.
//      While a character is in the air its place on the page is empty, so there is only ever one of it. Positions are read from the page every frame, so it holds at any size.
if (CAST === "toy" && G) { const hero = $("#hero"), acc = $("#acc"), dgch = $(".dgch"), dgp = $("#dgp"), filmBox = $("#hfilm");
  if (hero && acc && dgch) { const layer = document.createElement("div"); layer.className = "trav"; layer.setAttribute("aria-hidden", "true"); document.body.appendChild(layer);
    const FX = [.2, .405, .595, .82];   // where each character stands across the film frame
    const F = SVC.map((s, i) => { const im = new Image(); im.src = CH(s.k); im.alt = ""; im.draggable = false; layer.appendChild(im); const pn = $(`.pn[data-k="${s.k}"]`, acc), chat = $$("img", dgch)[i]; chat.loading = "eager";
      return { im, i, pn, tile: $(".pch img", pn), big: $(".pstage img", pn), chat, a: 0, b: 0, A: false, B: 0, wait: 0, seenA: 0, seenB: 0, show: false }; });   // a: 0 film, 1 tile. b: 0 tile, 1 perched on the panel's edge, 2 in the chat
    const clamp = (v) => Math.max(0, Math.min(1, v)), mix = (a, b, t) => a + (b - a) * t, navH = () => (nav ? nav.offsetHeight : 0), io = (u) => u * u * (3 - 2 * u);
    const DUR = { aDown: .85, aUp: .6, hop: .8, hopUp: .6, flip: 1.05, flipUp: .85 }, FALL = .74, C0 = .13, C1 = .85;
    const squash = (p) => 1 - .18 * Math.sin(Math.PI * Math.pow(p, .6)) * (1 - p);   // a landing: down fast, back up slower, ends exactly at rest
    // one jump from rect s to rect d: crouch, leave the ground, land with a squash. flip turns one full turn in the air, about the body's middle
    const jump = (e, s, d, flip, lift) => { const o = { x: s.left, y: s.top, w: s.width, h: s.height, rot: 0, sx: 1, sy: 1, org: "50% 100%", u: 0 }, dir = d.left >= s.left - 2 ? 1 : -1;
      if (e < C0) { o.sy = 1 - .14 * Math.sin(Math.PI * e / C0); o.sx = 1 + (1 - o.sy) * .6; }
      else if (e < C1) { const u = o.u = (e - C0) / (C1 - C0); o.w = mix(s.width, d.width, u); o.h = mix(s.height, d.height, u); o.x = mix(s.left, d.left, u); o.y = s.top + (d.top - s.top) * u * u - lift * 4 * u * (1 - u);
        if (flip) { o.rot = dir * 360 * io(u); o.org = "50% 50%"; } else o.rot = dir * 9 * Math.sin(Math.PI * u); }
      else { o.u = 1; o.x = d.left; o.y = d.top; o.w = d.width; o.h = d.height; o.sy = squash((e - C1) / (1 - C1)); o.sx = 1 + (1 - o.sy) * .6; }
      return o; };
    let docked = false, last = -1, first = true, moving = false, dirty = 150, ly = -1;
    const tileOf = (f) => { const open = f.pn.classList.contains("open"); if (acc.classList.contains("has") && !open) return null; const r = (open && !PHONE() ? f.big : f.tile).getBoundingClientRect(); return r.width > 4 ? r : null; };
    const chatRect = (f) => { const e = f.chat; if (!e.offsetWidth) return null; const c = dgch.getBoundingClientRect(); return { left: c.left + e.offsetLeft, top: c.top + e.offsetTop, width: e.offsetWidth, height: e.offsetHeight, bottom: c.top + e.offsetTop + e.offsetHeight }; };
    function frame(dt) { const vh = innerHeight, hb = hero.getBoundingClientRect().bottom, fr = ((filmBox && $("video", filmBox)) || hero).getBoundingClientRect(), sv = window.R13.chat ? window.R13.chat.svc : 1, swap = first || sv !== last, ph = PHONE(), floor = ph ? vh - 84 : vh - 8, nh = navH(), pt = dgp.getBoundingClientRect().top;
      // under the film the page is a white mist, so the layer is masked with a short soft edge there: the characters come out of the mist, not out of a hard line
      const mk = hb > -70 ? `linear-gradient(transparent ${Math.round(hb - 26)}px,#000 ${Math.round(hb + 46)}px)` : "none"; if (mk !== layer._mk) { layer._mk = mk; layer.style.webkitMaskImage = layer.style.maskImage = mk; } moving = false;
      F.forEach((f) => { const t = tileOf(f), isB = !window.R13.dgPhotos && f.i === sv, c = isB ? chatRect(f) : null, a0 = f.a, b0 = f.b;
        // jump A is set off when the whole tile picture is on screen (so the landing is seen), or after a moment if only part of it ever is; it is undone when the tile has all but left by the bottom
        if (!t) { f.A = true; f.a = 1; } else { const seen = (vh - t.top) / t.height, full = t.bottom <= floor || t.top <= nh + 30; f.seenA = seen > .4 && !f.A ? f.seenA + dt : 0;
          if (first) { f.A = seen > .5; f.a = f.A ? 1 : 0; }
          else if (t.top > vh * 1.8 || t.bottom < -vh * .8) { f.A = (f.A && seen > .1) || full; f.a = f.A ? 1 : 0; }
          else if (!f.A && (full || f.seenA > .9)) { f.A = true; f.wait = ph ? 0 : f.i * .09; } else if (f.A && seen < .1) { f.A = false; f.wait = ph ? 0 : (3 - f.i) * .05; } }
        // jump B, only for the one answering now. Onto the panel's edge once that edge is on screen; down into the chat once its place there is fully on screen (or after a moment, if only part ever is)
        if (!isB) { f.B = 0; f.b = 0; } else if (!c) { f.B = 2; f.b = 2; } else { const seen = (floor - c.top) / c.height, full = (ph ? c.bottom <= floor : seen >= .85) || c.top <= nh + 20, rest = pt <= vh - 40 ? 1 : 0; f.seenB = seen > .4 && f.B < 2 && f.a >= 1 ? f.seenB + dt : 0;   // on a desktop the flip goes while the perch is still on screen: 85% of the landing place is enough
          if (first) { f.B = seen > .5 ? 2 : rest; f.b = f.B; }
          else if (swap) { f.B = (docked && seen > .12) || full ? 2 : rest; f.b = f.B; }   // the headache changed: the new one stands where the last one stood
          else if (c.top > vh * 1.8 || c.bottom < -vh * .8) { f.B = (f.B === 2 && seen > .12) || full ? 2 : rest; f.b = f.B; }
          else if (f.a >= 1) { if (f.B < 2 && (full || f.seenB > 1.1)) f.B = 2; else if (f.B === 2 && seen < .12) f.B = 1; if (f.B === 0 && rest) f.B = 1; else if (f.B === 1 && pt > vh + 10) f.B = 0; } }
        if (f.seenA > 0 || f.seenB > 0) moving = true;
        // each jump then runs on the clock
        if (f.wait > 0 && f.a === (f.A ? 0 : 1)) { f.wait -= dt; moving = true; } else if (f.a !== (f.A ? 1 : 0)) { f.a = clamp(f.a + (f.A ? dt / DUR.aDown : -dt / DUR.aUp)); moving = true; }
        if (f.b !== f.B) { const down = f.B > f.b, two = down ? f.b >= 1 : f.b > 1, step = dt / (two ? (down ? DUR.flip : DUR.flipUp) : (down ? DUR.hop : DUR.hopUp));   // one part at a time: it never skips the perch
          f.b = down ? Math.min(f.b + step, f.B, Math.floor(f.b) + 1) : Math.max(f.b - step, f.B, Math.ceil(f.b) - 1); moving = true; }
        let x = 0, y = 0, w = 0, h = 0, rot = 0, sx = 1, sy = 1, org = "50% 100%", sh = 1, show = false;
        if (c && f.b > 0 && f.b < 2) { const ht = c.height * (ph ? 1.15 : .62), wd = ht * c.width / c.height, P = { left: c.left + (c.width - wd) / 2, top: pt - ht + 7, width: wd, height: ht };   // the perch: standing on the panel's top edge, above its place
          const src = t || { left: P.left - P.width * .3, top: -P.height - 80, width: P.width, height: P.height }, o = f.b < 1 ? jump(f.b, src, P, false, vh * .1) : jump(f.b - 1, P, c, true, vh * .11);
          x = o.x; y = o.y; w = o.w; h = o.h; rot = o.rot; sx = o.sx; sy = o.sy; org = o.org; sh = f.b < 1 ? 1 : 1 - o.u; show = true; }
        else if (t && f.b <= 0 && f.a > 0 && f.a < 1) { const e = f.a, rp = f.rp && hb > nh + 40 ? f.rp.getBoundingClientRect() : null, h0 = rp ? rp.height : Math.max(t.height * .7, Math.min(fr.height * .56, t.height * 2.6)), w0 = rp ? rp.width : h0 * t.width / t.height, inFilm = hb > nh + 40; show = true;
          if (e < FALL) { const u = e / FALL; w = mix(w0, t.width, u); h = mix(h0, t.height, u); x = mix(rp ? rp.left : inFilm ? fr.left + FX[f.i] * fr.width - w0 / 2 : t.left + (f.i % 2 ? 26 : -26), t.left, 1 - (1 - u) * (1 - u));       // fall, gathering speed
            y = mix(rp ? rp.top : Math.max(hb, 0) - h0 - 10, t.top, u * u); rot = (1 - u) * (f.i % 2 ? 9 : -9); sy = 1 + .06 * Math.sin(Math.PI * u); sx = 1 - .03 * Math.sin(Math.PI * u); }
          else { x = t.left; y = t.top; w = t.width; h = t.height; sy = squash((e - FALL) / (1 - FALL)); sx = 1 + (1 - sy) * .6; } }                                                  // land
        if (f.rp === undefined) f.rp = (window.R13.ringPiece && window.R13.ringPiece(SVC[f.i].k)) || null; if (f.rp) f.rp.classList.toggle("away", f.a > 0);
        const s = f.im.style; if (show) { s.width = w.toFixed(1) + "px"; s.height = h.toFixed(1) + "px"; s.transformOrigin = org; s.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sx.toFixed(4)},${sy.toFixed(4)})`; s.setProperty("--sh", sh.toFixed(2)); }
        if (show !== f.show) { f.show = show; s.visibility = show ? "visible" : "hidden"; }
        // the character's own place is empty until it has arrived, and again once it has left for the chat
        const gone = !!t && (f.a < 1 || (isB && f.b > 0 && (f.b < 2 || t.bottom > nh))); f.tile.classList.toggle("away", gone); f.big.classList.toggle("away", gone); });
      const d = !!window.R13.dgPhotos || F[sv].b >= 2; dgch.classList.toggle("away", !d); if (d !== docked || first) { docked = d; if (window.R13.chat) window.R13.chat.sync(); }
      last = sv; first = false; }
    gsap.ticker.add((time, delta) => { const sv = window.R13.chat ? window.R13.chat.svc : 1; if (scrollY === ly && !moving && dirty <= 0 && sv === last) return; ly = scrollY; if (dirty > 0) dirty--; frame(Math.min(50, delta || 16) / 1000); });
    const poke = () => { dirty = 90; }; ["resize", "load", "click", "pointerup", "keyup", "orientationchange"].forEach((ev) => addEventListener(ev, poke, { passive: true }));
    TRV = window.R13.trav = { get docked() { return docked; }, get state() { return F.map((f) => ({ a: +f.a.toFixed(3), b: +f.b.toFixed(3), show: f.show })); }, poke }; } }

// ---- impact: count up once, cards rise in ----
$$("#icards [data-to]").forEach((v, i) => { if (!G) return; const to = +v.dataset.to, o = { n: 0 }; v.textContent = "0";
  gsap.to(o, { n: to, duration: 1.6, delay: .1 + i * .12, ease: "power3.out", onUpdate: () => (v.textContent = Math.round(o.n)), scrollTrigger: { trigger: "#icards", start: "top 85%", once: true } }); });
if (G && !PHONE()) gsap.from("#icards .ic", { y: 60, opacity: 0, duration: 1, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: "#icards", start: "top 88%", once: true } });

// ---- analytics: cards scatter around the title, then stack and show one finding at a time. Driven by the scroll while the stage holds; the wheel is never captured ----
const MV0 = [{ b: "74%", l: "Bounce rate", s: "of Instagram visitors bounce", h: "Enhance web UX", p: "Fix the leaky bucket: remove what stops visitors buying, before you spend another ringgit on ads.", vz: "line" },
  { b: "RM63", l: "Cost per lead", s: "per Facebook lead. Google brings them at RM30", h: "Strengthen SEM", p: "Show up where buyers are already searching, on Google and in AI answers.", vz: "bars" },
  { b: "0.8%", l: "Click-through", s: "click-through on the social ads", h: "Engaging, trust-building social ads", p: "Stop the scroll, earn trust, then convert.", vz: "donut" }];
const MV3 = [{ b: "74%", l: "High bounce rate", s: "of Instagram visitors bounce", h: "Enhance web UX", p: "Fix the leaky bucket: remove what stops visitors buying, before you spend another ringgit on ads.", vz: "lineup" },
  { b: "RM63", l: "High cost per lead", s: "per Facebook lead. Google brings them at RM30", h: "Strengthen SEM", p: "Show up where buyers are already searching, on Google and in AI answers.", vz: "barsup" },
  { b: "0.8%", l: "Low click-through", s: "click-through on the social ads", h: "Engaging, trust-building social ads", p: "Stop the scroll, earn trust, then convert.", vz: "linedown" }];
const MV = D.mv || (CAST ? MV3 : MV0);
const trend = (k) => { const up = /up$/.test(k), bars = /^bars/.test(k), pts = [...Array(9)].map((_, j) => { const t = j / 8, base = up ? .15 + t * .7 : .85 - t * .7; return Math.max(.05, Math.min(.98, base + (rnd(j + (up ? 3 : 9)) - .5) * .14)); });
  return bars ? `<div class="bars trend">${pts.slice(0, 7).map((v, j) => `<i style="height:${Math.round(v * 100)}%;--j:${j}"></i>`).join("")}</div>` : `<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 ${(40 - pts[0] * 36).toFixed(1)} ${pts.map((v, j) => `L${(j * 12.5).toFixed(1)} ${(40 - v * 36).toFixed(1)}`).join(" ")}" fill="none" stroke="#D7000F" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M0 40 ${pts.map((v, j) => `L${(j * 12.5).toFixed(1)} ${(40 - v * 36).toFixed(1)}`).join(" ")} L100 40Z" fill="#D7000F" fill-opacity=".1"/></svg>`; };
const viz = (k, i) => /^(line|bars)(up|down)$/.test(k) ? trend(k) : k === "bars" ? `<div class="bars">${[0, 1, 2, 3, 4, 5].map((j) => `<i style="height:${Math.round((.3 + rnd(i * 7 + j) * .7) * 100)}%"></i>`).join("")}</div>`
  : k === "donut" ? `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-opacity=".16" stroke-width="6"/><circle cx="20" cy="20" r="15" fill="none" stroke="#D7000F" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(30 + rnd(i) * 50).toFixed(0)} 100" transform="rotate(-90 20 20)" pathLength="100"/></svg>`
  : `<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 ${(30 - rnd(i) * 10).toFixed(1)} ${[...Array(8)].map((_, j) => `L${(j + 1) * 12.5} ${(8 + rnd(i * 9 + j) * 26).toFixed(1)}`).join(" ")}" fill="none" stroke="#D7000F" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
{ const stage = $("#astage"), sw = $("#swarm"), ft = $("#afeat"), dots = $("#adots"), tt = $("#antt"); if (stage) {
  const DC = D.dc || [["+19.3%", "Revenue, MoM", "bars", ""], ["RM25.99", "Next payment, 4 days", "", "rd"], ["32K", "Impressions", "donut", "kk"], ["+34.98%", "Organic sessions", "bars", "pk"], ["RM1,248", "Current balance", "line", ""],
    ["↑72.5%", "Progress to target", "", "pk"], ["+280%", "Leads from search", "bars", "kk"], ["0.9%", "Conversion rate", "line", ""], ["4.8s", "Page load", "donut", "pk"], ["2.1×", "ROAS", "line", "rd"], ["RM410", "Cost per customer", "bars", ""], ["9%", "Returning customers", "donut", "kk"], ["640K", "Reach", "line", "pk"], ["1.1%", "Engagement", "bars", ""]];
  const EM = { 2: AS + "assets6/eyes_w.webp", 7: AS + "assets2/heart_w.webp", 11: AS + "assets2/thumb_k.webp" };
  const cards = []; DC.forEach(([b, s, v, c], i) => { const el = document.createElement("div"); el.className = "dc " + c; el.innerHTML = `<small>${E(s)}</small><b>${E(b)}</b>${v ? `<div class="vz">${viz(v, i)}</div>` : ""}`; sw.appendChild(el); cards.push({ el });
    if (EM[i]) { const im = document.createElement("img"); im.className = "em"; im.src = EM[i]; im.alt = ""; im.draggable = false; sw.appendChild(im); cards.push({ el: im, em: true }); } });
  cards.forEach((c, i) => Object.assign(c, { i, a0: rnd(i + 3) * 6.28, rr: c.em ? .72 : CAST ? .6 + i / cards.length * .62 : .86 + rnd(i + 5) * .3, rot: (rnd(i + 8) - .5) * (CAST ? 6 : 14) }));
  // the three findings are a real deck of three cards: the front one tucks behind, the next comes forward
  ft.innerHTML = `<div class="fdeck">${MV.map((m, i) => `<div class="fc">${CAST ? `<h4>${E(m.l)}</h4><div class="vz big">${viz(m.vz, i + 20)}</div>` : `<small>${E(m.l)}</small><b>${E(m.b)}</b><p>${E(m.s)}</p><div class="vz">${viz(m.vz, i + 20)}</div>`}</div>`).join("")}</div><i class="fline" aria-hidden="true"></i><div class="ft"><span class="n"></span><h3></h3><p></p></div>`;
  dots.innerHTML = MV.map((_, i) => `<button type="button" aria-label="Finding ${i + 1}"></button>`).join("");
  const fc = $(".fdeck", ft), fcs = $$(".fc", ft), NF = MV.length, fx = $(".ft", ft), fl = $(".fline", ft), db = $$("button", dots); let cur = 0, st = { k: RM || !G ? 2 : 0, spin: 0, dr: 0 }, played = false, tm = null, inView = false, hold = false, swap = null;
  if (st.k === 2) stage.style.setProperty("--tp", 1);
  const POS = [{ x: 0, y: 0, rotation: 0, scale: 1, filter: "brightness(1)" }, { x: 24, y: 16, rotation: 5, scale: .95, filter: "brightness(.84)" }, { x: -22, y: 26, rotation: -6, scale: .9, filter: "brightness(.7)" }];
  const slot = (i) => (i - cur + NF) % NF;
  const rest = () => fcs.forEach((el, i) => { const s = slot(i), p = POS[s]; if (G) gsap.set(el, { ...p, xPercent: 0, zIndex: NF - s }); else { el.style.zIndex = NF - s; el.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`; el.style.filter = p.filter; } el.setAttribute("aria-hidden", String(s !== 0)); });
  const fill = (i) => { const m = MV[i];
    $(".n", fx).textContent = `Move ${i + 1} of 3`; $("h3", fx).textContent = m.h; $("p", fx).textContent = m.p; db.forEach((d, j) => d.setAttribute("aria-current", String(j === i))); };
  rest();
  const place = () => { const W = stage.clientWidth, H = stage.clientHeight, ph = PHONE(), sb = stage.getBoundingClientRect(), fr = fc.getBoundingClientRect();
    const scx = fr.left - sb.left + fr.width / 2, scy = fr.top - sb.top + fr.height / 2, cx = W / 2, cy = H / 2, Rx = ph ? W * .47 : Math.min(W * .41, 540), Ry = ph ? H * .36 : Math.min(H * .34, 250), R0 = Math.max(W, H) * 1.1;
    const e = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, k = st.k, N = cards.length;
    for (const c of cards) { const cw = c.el.offsetWidth, chh = c.el.offsetHeight || cw, a = c.i / N * Math.PI * 2 + st.spin + st.dr, ringX = cx + Math.cos(a) * Rx * c.rr, ringY = cy + Math.sin(a) * Ry * c.rr, ringR = c.em ? c.rot * 2 : a * 57.3 + 90;
      const sx = cx + Math.cos(c.a0) * R0, sy = cy + Math.sin(c.a0) * R0, stkX = scx + (rnd(c.i + 30) - .5) * 44, stkY = scy + (rnd(c.i + 31) - .5) * 34;
      let x, y, r, s; if (k <= 1) { const t = e(k); x = sx + (ringX - sx) * t; y = sy + (ringY - sy) * t; r = c.rot * 6 * (1 - t) + ringR * t; s = 1; }
      else { const t = e(Math.min(1, k - 1)); x = ringX + (stkX - ringX) * t; y = ringY + (stkY - ringY) * t; r = ringR + (c.rot - ringR) * t; s = c.em ? 1 - t : 1 + (fr.width / cw * .92 - 1) * t; }
      c.el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px,${(y - chh / 2).toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${s.toFixed(3)})`; } };
  const show = (i, first) => { const to = (i + NF) % NF; if (CAST) fcs.forEach((el, j) => { el.classList.remove("drawn"); if (j === to) { void el.offsetWidth; el.classList.add("drawn"); } });   // slide 8: the chart draws itself
    if (!G) { cur = to; rest(); fill(cur); sw.style.opacity = 0; fc.style.opacity = fx.style.opacity = fl.style.opacity = 1; return; }
    if (first) { cur = to; rest(); fill(cur); gsap.killTweensOf([sw, fc, fl, fx]); gsap.to(sw, { opacity: 0, duration: .5, delay: .15 }); gsap.fromTo(fc, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .55, ease: "power3.out" }); gsap.fromTo(fl, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: .5, delay: .2, ease: "power3.out" }); gsap.fromTo(fx, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, delay: .3, ease: "power3.out" }); return; }
    if (to === cur) return;
    if (swap) swap.progress(1);   // a fast second click finishes the first move cleanly instead of fighting it
    const fwd = (to - cur + NF) % NF === 1, front = fcs[cur], back = fcs[fwd ? (cur + 2) % NF : (cur + 1) % NF], mover = fwd ? front : fcs[to]; cur = to;
    swap = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => { rest(); swap = null; } });
    // the words: out upwards, back in from below, with the line drawing again
    swap.to(fx, { opacity: 0, y: -12, duration: .2, ease: "power2.in" }, 0).to(fl, { scaleX: 0, duration: .2, ease: "power2.in" }, 0)
      .add(() => fill(cur), .22).fromTo(fx, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5 }, .26).to(fl, { scaleX: 1, duration: .45 }, .26);
    // the deck: one card slides out to the side, changes its place in the pile, and slides back in
    swap.to(mover, { xPercent: -62, y: 14, rotation: -11, scale: .94, duration: .3, ease: "power2.out" }, 0)
      .set(mover, { zIndex: fwd ? 0 : NF + 1 }, .3)
      .to(mover, { xPercent: 0, ...POS[fwd ? 2 : 0], duration: .46 }, .3);
    fcs.forEach((el, j) => { if (el === mover) return; const s = slot(j); swap.to(el, { ...POS[s], duration: .56 }, .06).set(el, { zIndex: NF - s }, fwd ? .06 : .3); });
    void back; };
  const tick = () => { clearInterval(tm); tm = null; if (played && inView && !hold && !RM) tm = setInterval(() => show(cur + 1), 4200); };
  place(); addEventListener("resize", place); if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  // The scroll drives it (David 23 Nov: "scroll to make it organised from messy"). The stage holds in view (CSS sticky, the wheel is never captured):
  // the cards arrive scattered as the section comes up, circle the title while it holds, then gather into one stack and the first finding appears. Scroll back up and it comes apart again.
  const an = $("#data"), stk = $("#astk"), holdEl = $("#ahold"); let finish = () => {}, endY = () => scrollY, prog = () => 1;
  if (!G) { if (holdEl) holdEl.style.display = "none"; played = true; fill(0); sw.style.opacity = 0; fc.style.opacity = fx.style.opacity = fl.style.opacity = 1; }
  else { const tl = gsap.timeline({ paused: true, onUpdate: place, defaults: { ease: "none" } });
    tl.to(st, { k: 1, duration: .42 }, 0).to(st, { spin: Math.PI * .9, duration: .8, ease: "power1.inOut" }, 0).to(st, { k: 2, duration: .3 }, .5).to(stage, { "--tp": 1, duration: .3, ease: "power2.inOut" }, .5).to({}, { duration: .1 }, .9);
    const done = (d) => { if (d === played) return; played = d; gsap.killTweensOf([sw, fc, fl, fx]);
      if (d) show(0, true); else { if (swap) swap.progress(1); gsap.to(sw, { opacity: 1, duration: .3 }); gsap.to([fc, fx, fl], { opacity: 0, duration: .22 }); } tick(); };
    const geo = () => { const top = parseFloat(getComputedStyle(stk).top) || 0, nat = an.getBoundingClientRect().top + parseFloat(getComputedStyle(an).paddingTop), pre = innerHeight * .5, len = holdEl.offsetHeight; return { top, nat, pre, len }; };
    prog = () => { const g = geo(); return Math.max(0, Math.min(1, (g.top + g.pre - g.nat) / (g.pre + g.len * .92))); };
    const upd = () => gsap.to(tl, { progress: prog(), duration: .45, ease: "power2.out", overwrite: true, onUpdate: () => done(tl.progress() >= .9) });
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); tl.progress(prog()); done(tl.progress() >= .9);
    endY = () => { const g = geo(); return Math.round(scrollY + g.nat - g.top + g.len * .9); }; finish = () => glideTo(endY(), 1.1);
    gsap.ticker.add((t, dt) => { if (!inView || played || st.k >= 1.98) return; st.dr += Math.min(64, dt) / 1000 * .05; place(); }); }   // a slow drift while it is still scattered, so it never sits dead
  watch(stage, (on) => { inView = on; tick(); }, .3);
  stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hold = true; tick(); } }); stage.addEventListener("pointerleave", () => { hold = false; tick(); });
  $$(".arw", stage).forEach((b) => b.addEventListener("click", () => { if (!played) finish(); else show(cur + +b.dataset.d); tick(); }));
  db.forEach((d, i) => d.addEventListener("click", () => { if (played) show(i); else finish(); tick(); }));
  window.R13.an = { get cur() { return cur; }, get played() { return played; }, get playing() { return !!tm; }, get k() { return st.k; }, get p() { return prog(); }, get endY() { return endY(); } }; } }

// ---- wins: results first; the brand and the photo appear only when opened, each in its own colour ----
const CS7 = [{ k: "yakisoul", v: "+450%", l: "monthly revenue, single outlet", w: "Yaki Soul", tags: ["F&B", "Walk-in traffic", "Seasonal campaigns"], p: "Seasonal campaigns turned an izakaya off the main street into a KL destination, now serving 7,000+ customers a month." },
  { k: "writeedge", pre: "Almost", v: "4×", l: "growth in under two years", w: "Write-Edge", tags: ["Education", "Client review"], q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge" },
  { k: "bhpetrol", v: "7M+", l: "organic reach, nationwide", w: "BHPetrol", tags: ["Energy", "Campaign videos", "Key visuals"], p: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed." },
  { k: "easyeurope", v: "700+", l: "leads a week, under RM15 each", w: "Easy Europe", tags: ["Travel", "Lead generation"], p: "Travel revival from the pandemic to peak season, with a 65% lower cost per result." },
  { k: "careconcierge", v: "23%", l: "more monthly sales", w: "Care Concierge", tags: ["Senior care", "Meta retargeting"], p: "Senior care beyond Google search: Meta retargeting and a multi-state expansion, at a 37% lower cost per acquisition." },
  { k: "furniture", v: "22×", l: "return on ad spend, against an industry 8 to 12", w: "Luxe Living", tags: ["Furniture", "Shopee & Lazada", "Meta"], p: "Year-round seasonal campaigns, from Shopee and Lazada to Meta, with 2 to 3 times revenue growth." },
  { k: "lalaport", v: "3×", l: "more vendor inclusions", w: "LaLaport BBCC", tags: ["Retail mall", "Social media"], p: "One Japanese narrative for a mall of monthly events." }];
const CS5 = [{ k: "yakisoul", ind: "Restaurant", goal: "Walk-in traffic", v: "+450%", l: "monthly revenue, single outlet", w: "Yaki Soul", tags: ["F&B", "Seasonal campaigns"], p: "Seasonal campaigns turned an izakaya off the main street into a KL destination, now serving 7,000+ customers a month." },
  { k: "writeedge", ind: "Education", goal: "Enrolment", pre: "Almost", v: "4×", l: "growth in under two years", w: "Write-Edge", tags: ["Lead generation", "Meta Ads"], q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge" },
  { k: "bhpetrol", ind: "Oil & gas", goal: "Consumer interest", v: "7M+", l: "organic reach, nationwide", w: "BHPetrol", tags: ["Campaign videos", "Key visuals"], p: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed." },
  { k: "easyeurope", ind: "Premium travel", goal: "Enquiries", v: "700+", l: "leads a week, under RM15 each", w: "Easy Europe", tags: ["Lead generation"], p: "Travel revival from the pandemic to peak season, with a 65% lower cost per result." },
  { k: "furniture", ind: "Home & living", goal: "E-commerce", v: "22×", l: "return on ad spend, against an industry 8 to 12", w: "Luxe Living", tags: ["Shopee & Lazada", "Meta"], p: "Year-round seasonal campaigns, from Shopee and Lazada to Meta, with 2 to 3 times revenue growth." }];
const CS = D.cs || (CAST ? CS5 : CS7);
{ const list = $("#clist"); if (list) {
  const NEWW = CS.map((c, i) => `<li class="wr k${i % 5 + 1}" style="--i:${i}"><button type="button" class="wh" aria-expanded="false" aria-controls="crb${i}" id="crh${i}"><span class="ig"><b>${E(c.ind || c.w)}</b><span>${E(c.goal || "")}</span></span><span class="v">${c.pre ? `<small>${E(c.pre)}</small>` : ""}${E(c.v)}</span><span class="pm" aria-hidden="true"></span></button>
    <div class="wb" id="crb${i}" role="region" aria-labelledby="crh${i}" inert><div><div class="wbg"><div class="wph"><img src="${E(c.img || `${AS}assets3/v9c_${c.k}.webp`)}" alt="${E(c.w)}: our work" loading="lazy" draggable="false"></div><div class="wbi"><p class="wl3"><b>${c.pre ? E(c.pre) + " " : ""}${E(c.v)}</b> ${E(c.l)}</p><span class="brand">${E(c.w)}</span>
    ${c.q ? `<p>“${E(c.q)}”</p><cite>${E(c.who)}</cite>` : `<p>${E(c.p)}</p>`}<ul class="tags">${(c.tags || []).map(TAG).join("")}</ul>${c.href ? `<a class="wmore" href="${E(c.href)}">Read the case study →</a>` : ""}</div></div></div></div></li>`).join("");
  list.innerHTML = CAST ? NEWW : CS.map((c, i) => `<li class="wr k${i % 4 + 1}"><div class="wph"><div><img src="${E(c.img || `${AS}assets3/v9c_${c.k}.webp`)}" alt="${E(c.w)}: our work" loading="lazy" draggable="false"></div></div>
    <button type="button" class="wh" aria-expanded="false" aria-controls="crb${i}" id="crh${i}"><span class="v">${c.pre ? `<small>${E(c.pre)}</small>` : ""}${E(c.v)}</span><span class="l">${E(c.l)}</span><span class="pm" aria-hidden="true"></span></button>
    <div class="wb" id="crb${i}" role="region" aria-labelledby="crh${i}" inert><div><div class="wbi"><span class="brand">${E(c.w)}</span>
    ${c.q ? `<p>“${E(c.q)}”</p><cite>${E(c.who)}</cite>` : `<p>${E(c.p)}</p>`}<ul class="tags">${(c.tags || []).map((t) => `<li>${E(t)}</li>`).join("")}</ul></div></div></div></li>`).join("");
  const rows = $$(".wr", list);
  rows.forEach((r, i) => $(".wh", r).addEventListener("click", () => { const on = !r.classList.contains("open");
    rows.forEach((x, j) => { const o = on && j === i; x.classList.toggle("open", o); $(".wh", x).setAttribute("aria-expanded", o); $(".wb", x).inert = !o; });
    if (on) setTimeout(() => { const b = r.getBoundingClientRect(); showBlock(b.top + scrollY, b.height); }, RM ? 30 : 780); }));
  if (G) gsap.from(rows, { x: CAST ? -80 : 0, y: CAST ? 0 : 40, opacity: CAST ? 1 : 0, duration: .8, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: list, start: "top 86%", once: true } });   // the steps slide in, solid
  if (G) gsap.fromTo(".ghost span", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: .12, ease: "power4.out", scrollTrigger: { trigger: "#cases", start: "top 80%", once: true } }); } }

// ---- team: a curved carousel; the middle photo is large, the sides taper away ----
{ const fl = $("#tflow"); if (fl && false) {   // the moving strip (24 Nov afternoon), replaced by the carousel again on Sue's note const PH = D.team || ["poiching", "marcus", "swet", "bhp", "cheanu", "belle"], RV = D.reviews || [{ q: "Bentley and the entire BMC team represents world class professionalism in everything they do.", who: "Cheanu Chew", role: "Google review" }, { q: "Battle Mind Creative has been my primary go-to Facebook/Instagram marketing solution each time I have clients asking me for social media help.", who: "Marcus Teoh", role: "Google review" }];
  const items = []; PH.forEach((p, i) => { items.push(`<figure class="mq"><img src="${E(p.img || `${AS}assets3/v9_g_${p}.webp`)}" alt="${E(p.alt || "The Battle team with clients")}" loading="lazy" draggable="false"></figure>`); if (i % 2 === 1 && RV[(i - 1) / 2]) { const r = RV[(i - 1) / 2]; items.push(`<blockquote class="mq rq"><p class="st">★★★★★</p><p>“${E(r.q)}”</p><footer>${r.img ? `<img src="${E(r.img)}" alt="" loading="lazy">` : ""}<span><b>${E(r.who)}</b><small>${E(r.role || "Google review")}</small></span></footer></blockquote>`); } });
  fl.classList.add("marq"); fl.innerHTML = `<div class="mqt">${items.join("")}${items.join("").replace(/<(figure|blockquote) class="mq/g, '<$1 aria-hidden="true" class="mq')}</div>`; const tr = $(".mqt", fl);
  let x = 0, v = 0, drag = null, last = 0, inView = false, hover = false; const BASE = RM ? 0 : 38;
  const step = (t) => { const dt = Math.min(.05, (t - (last || t)) / 1000); last = t; const half = tr.scrollWidth / 2;
    if (!drag) { v += ((hover ? BASE * .25 : BASE) - v) * Math.min(1, dt * 2.5); x -= v * dt; } if (half) { if (x <= -half) x += half; if (x > 0) x -= half; } tr.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`; if (inView) requestAnimationFrame(step); else last = 0; };
  watch(fl, (on) => { const was = inView; inView = on; if (on && !was) requestAnimationFrame(step); });
  fl.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hover = true; }); fl.addEventListener("pointerleave", () => { hover = false; });
  fl.addEventListener("pointerdown", (e) => { drag = { x0: e.clientX, x: x, t: performance.now(), lx: e.clientX }; fl.setPointerCapture(e.pointerId); fl.classList.add("drag"); });
  fl.addEventListener("pointermove", (e) => { if (!drag) return; const now = performance.now(); x = drag.x + (e.clientX - drag.x0); v = -(e.clientX - drag.lx) / Math.max(.008, (now - drag.t) / 1000); drag.t = now; drag.lx = e.clientX; });
  const end = () => { if (!drag) return; drag = null; fl.classList.remove("drag"); v = Math.max(-1400, Math.min(1400, v)); }; fl.addEventListener("pointerup", end); fl.addEventListener("pointercancel", end);
  window.R13.team = { get x() { return x; }, get speed() { return v; } }; } }
{ const fl = $("#tflow"), dots = $("#tdots"); if (fl) { const PH0 = D.team || ["poiching", "marcus", "swet", "bhp", "cheanu", "belle"];
  // a review card after every second photo: one or two of the most important sentences
  const snip = (q) => { const ss = String(q || "").replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/); let o = ss[0] || ""; if (o.length < 70 && ss[1]) o += " " + ss[1]; return o.length > 170 ? o.slice(0, 165).replace(/\s+\S*$/, "") + "…" : o; };
  const RV = CAST ? D.reviews || [{ q: "Bentley and the entire BMC team represents world class professionalism in everything they do.", who: "Cheanu Chew", role: "Google review" }, { q: "Battle Mind Creative has been my primary go-to Facebook/Instagram marketing solution each time I have clients asking me for social media help.", who: "Marcus Teoh", role: "Google review" }] : [];
  const PH = []; PH0.forEach((p, i) => { PH.push(p); const r = i % 2 === 1 ? RV[(i - 1) / 2] : null; if (r) PH.push({ review: r }); }), N = PH.length;
  fl.innerHTML = PH.map((p, i) => p.review ? `<figure class="rq" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${N}"><p class="st">★★★★★</p><blockquote>“${E(snip(p.review.q))}”</blockquote><figcaption>${p.review.img ? `<img src="${E(p.review.img)}" alt="" loading="lazy">` : ""}<span><b>${E(p.review.who)}</b><small>${E(p.review.role || "Google review")}</small></span></figcaption></figure>`
    : `<figure role="group" aria-roledescription="slide" aria-label="${i + 1} of ${N}"><img src="${E(p.img || `${AS}assets3/v9_g_${p}.webp`)}" alt="${E(p.alt || "The Battle team with clients")}" loading="lazy" draggable="false"></figure>`).join("");
  if (CAST) { const tma = $(".tma"), tmf = $(".tmf"); if (tma && tmf) tmf.prepend(tma); }   // the slide: buttons centred under the carousel
  dots.innerHTML = PH.map((_, i) => `<button type="button" aria-label="Photo ${i + 1}"></button>`).join("");
  const figs = $$("figure", fl), db = $$("button", dots); let cur = 0, tm = null, inView = false, hold = false;
  const lay = () => { const fw = figs[0].offsetWidth, ph = PHONE();
    figs.forEach((f, i) => { let d = i - cur; if (d > N / 2) d -= N; if (d < -N / 2) d += N; const a = Math.abs(d);
      f.style.transform = `translateX(${(d * fw * (ph ? .74 : .88)).toFixed(0)}px) translateZ(${(-a * (ph ? 150 : 210)).toFixed(0)}px) rotateY(${(-Math.sign(d) * Math.min(a, 2) * 32).toFixed(0)}deg) scale(${(1 - a * .05).toFixed(2)})`;
      f.style.opacity = a > 2 ? 0 : 1; f.style.zIndex = 10 - a; f.style.filter = a ? `brightness(${(1 - a * .16).toFixed(2)})` : ""; f.setAttribute("aria-hidden", String(a > 0)); });
    db.forEach((d, j) => d.setAttribute("aria-current", String(j === cur))); };
  const go = (i) => { cur = (i + N) % N; lay(); }, tick = () => { clearInterval(tm); tm = null; if (inView && !hold && !RM) tm = setInterval(() => go(cur + 1), 3800); };
  lay(); addEventListener("resize", lay); watch(fl, (on) => { inView = on; tick(); });
  fl.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hold = true; tick(); } }); fl.addEventListener("pointerleave", () => { hold = false; tick(); });
  let sx = null; fl.addEventListener("pointerdown", (e) => { sx = e.clientX; }); fl.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); else { const f = e.target.closest("figure"); if (f) go(figs.indexOf(f)); } tick(); });
  $$(".arw", fl.parentElement).forEach((b) => b.addEventListener("click", () => { go(cur + +b.dataset.d); tick(); })); db.forEach((d, i) => d.addEventListener("click", () => { go(i); tick(); }));
  window.R13.team = { get cur() { return cur; } }; } }

// ---- connect: one line, a goal, sent on WhatsApp; a few pieces float around the glass ----
{ const ask = $("#ask"); if (ask) { let goal = ""; const btns = $$(".chips button", ask);
  btns.forEach((b) => b.addEventListener("click", () => { goal = goal === b.dataset.g ? "" : b.dataset.g; btns.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.g === goal))); }));
  ask.addEventListener("submit", (e) => { e.preventDefault(); const v = $("#askin").value.trim(), g = goal ? `My primary goal: ${goal}. ` : "";
    if (D.contactUrl) { location.href = `${D.contactUrl}?goal=${encodeURIComponent(goal)}&msg=${encodeURIComponent(v)}#form`; return; }   // the full form asks what Battle needs to know
    open(WA(`Hi Battle, ${g}${v || "I'd like a 15-minute call about my marketing."}`), "_blank", "noopener"); }); }
  if (CAST && !$(".wafab")) { const a = document.createElement("a"); a.className = "wafab"; a.href = WA("Hi Battle, I'd like a 15-minute call about my marketing."); a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", "Chat with Battle on WhatsApp");
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.3.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>';
    document.body.appendChild(a); }
  const box = $("#cnp"); if (box) { const ph = PHONE();
    const C = ph ? [[AS + "assets2/megaphone_w.webp", "left:-5%;top:.8%", 72, -14], [AS + "assets2/bubble_w.webp", "right:-3%;top:1.6%", 58, 10], [AS + "assets2/heart_w.webp", "right:7%;bottom:3%", 54, 12]]
      : [[AS + "assets2/megaphone_w.webp", "left:5%;top:16%", 168, -14], [AS + "assets2/bubble_w.webp", "right:7%;top:13%", 132, 10], [AS + "assets2/heart_w.webp", "left:13%;bottom:13%", 100, -10], [AS + "assets2/cursor_k.webp", "right:13%;bottom:16%", 112, 8], [AS + "assets2/coin_w.webp", "left:27%;top:7%", 62, 16], [AS + "assets2/play_k.webp", "right:27%;bottom:6%", 78, -12]];
    box.innerHTML = C.map(([s, pos, wd, r]) => `<img src="${s}" alt="" loading="lazy" draggable="false" style="${pos};width:${ph ? wd + "px" : `clamp(${Math.round(wd * .6)}px,${(wd / 14.4).toFixed(2)}vw,${wd}px)`};${G ? "" : `rotate:${r}deg`}">`).join("");
    if (G) $$("img", box).forEach((im, i) => gsap.fromTo(im, { y: 60 + i * 14, rotation: C[i][3] }, { y: -40 - i * 10, rotation: C[i][3] + (i % 2 ? -8 : 8), ease: "none", scrollTrigger: { trigger: "#connect", start: "top bottom", end: "bottom top", scrub: true } })); } }

// ---- phone: a contact bar that follows the thumb; hidden over the hero, the contact section and the footer ----
{ const d = document.createElement("div"); d.className = "dock"; d.setAttribute("aria-label", "Contact Battle");
  d.innerHTML = `<a class="wa" href="${WA("Hi Battle, I'd like a 15-minute call about my marketing.")}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>WhatsApp us</a><a href="#connect">Let's talk</a>`;
  document.body.appendChild(d); const seen = new Set();
  const io = new IntersectionObserver((es) => { es.forEach((e) => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); d.classList.toggle("on", seen.size === 0); }, { threshold: .15 });
  ["#hero", "#connect", ".foot"].forEach((s) => { const el = $(s); if (el) io.observe(el); });
  window.R13.dock = d; }

if (G) addEventListener("load", () => ScrollTrigger.refresh());
})();
