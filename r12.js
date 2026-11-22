/* Round 12 · direction 21 after the 16 Nov meeting. Phone first: nothing pins, nothing captures the wheel. */
(() => {
const R = matchMedia("(prefers-reduced-motion: reduce)").matches, q = new URLSearchParams(location.search), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
if (R) document.documentElement.classList.add("norise");
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const G = !R && !!window.gsap, FIN = q.get("ch") === "b" ? "b" : "a", PHONE = () => innerWidth <= 900;
const AR = '<span class="ar" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const WA = (t) => "https://wa.me/60197707927?text=" + encodeURIComponent(t);
const rnd = (i) => { const g = Math.sin(i * 127.1 + 311.7) * 43758.5453; return g - Math.floor(g); };
const CH = (k) => `assets5/ch_${k}_${FIN}.webp`;
window.R12 = { fin: FIN };

// ---- nav tone, drawer ----
const nav = $("#nav"), nb = $("#nb"), drawer = $("#drawer");
function tone() { nav.style.pointerEvents = "none"; const el = document.elementFromPoint(innerWidth / 2, 38); nav.style.pointerEvents = ""; const t = el && el.closest("[data-tone]");
  if (t) nav.classList.toggle("light", t.dataset.tone === "light"); nav.classList.toggle("sc", scrollY > 40 && !(t && t.id === "hero")); }
addEventListener("scroll", () => requestAnimationFrame(tone), { passive: true }); addEventListener("resize", tone); tone(); setTimeout(tone, 100);
if (nb) { const open = (on) => { nb.setAttribute("aria-expanded", on); drawer.classList.toggle("open", on); document.body.classList.toggle("lock", on); };
  nb.onclick = () => open(nb.getAttribute("aria-expanded") !== "true"); $$("a", drawer).forEach((a) => a.addEventListener("click", () => open(false))); addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); }); }

// ---- when a click opens something, glide so it is in view; the user's own scroll always wins ----
let gl = null;
function glideTo(y, dur) { y = Math.max(0, Math.round(y)); if (Math.abs(y - scrollY) < 6) return; if (!G) { scrollTo({ top: y, behavior: "instant" }); return; }
  const o = { y: scrollY }; if (gl) gl.kill(); gl = gsap.to(o, { y, duration: dur || .85, ease: "power3.inOut", onUpdate: () => scrollTo({ top: o.y, behavior: "instant" }) }); }
["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { if (gl) { gl.kill(); gl = null; } }, { passive: true }));
function showBlock(top, h) { const navH = (nav ? nav.offsetHeight : 0) + 14, pad = 26, vh = innerHeight; let y = scrollY;
  if (h > vh - navH - pad) y = top - navH; else if (top + h > y + vh - pad) y = top + h + pad - vh; else if (top < y + navH) y = top - navH; glideTo(y); }
window.R12.glideTo = glideTo;

// ---- in-view helper for autoplay ----
const watch = (el, cb, th) => new IntersectionObserver((e) => cb(e[0].isIntersecting), { threshold: th || .35 }).observe(el);

// ---- hero: denser ring of pieces; the four service characters are the hero's own pieces ----
{ const hero = $("#hero"), ring = $("#ring");
  const PIECES = [[CH("perf"), 1.55], ["assets2/heart_w.webp", .8], ["assets5/browser_w.webp", 1.05], ["assets2/play_k.webp", .85], ["assets5/cart_k.webp", 1], ["assets2/hashtag_w.webp", .8],
    [CH("ads"), 1.45], ["assets2/bubble_w.webp", .9], ["assets5/clapper_k.webp", .95], ["assets2/thumb_k.webp", .9], ["assets5/pen_w.webp", .8], ["assets2/chart_w.webp", .95], ["assets2/bag_w.webp", .9],
    [CH("video"), 1.5], ["assets5/swatch_k.webp", .95], ["assets2/envelope_w.webp", .85], ["assets5/laptop_k.webp", 1.05], ["assets2/coin_w.webp", .75], ["assets2/camera_k.webp", .95],
    [CH("web"), 1.5], ["assets5/card_w.webp", .85], ["assets2/magnifier_k.webp", .9], ["assets2/cursor_w.webp", .8], ["assets2/phone_k.webp", .9], ["assets2/bolt_w.webp", .7], ["assets2/megaphone_w.webp", .9]];
  const N = PIECES.length;
  const P = PIECES.map(([src, m], i) => { const el = document.createElement("img"); el.className = "pc"; el.src = src; el.alt = ""; el.draggable = false; ring.appendChild(el);
    return { el, m, a: i / N * Math.PI * 2, r: .8 + rnd(i) * .38, v: (rnd(i + 50) - .5) * .34, tilt: (rnd(i + 90) - .5) * 30, px: 0, py: 0, front: null, b: R ? 1 : 0 }; });
  let w = 0, h = 0; const fit = () => { w = hero.clientWidth; h = hero.clientHeight; const base = Math.min(w, h) * (w < 700 ? .15 : .125); P.forEach((p, i) => { p.el.style.width = (base * p.m) + "px"; p.el.hidden = w < 700 && i % 2 === 1 && p.m < 1.2; }); }; fit(); addEventListener("resize", fit);
  let ptr = { x: 0, y: 0 }, pt = { x: 0, y: 0 }, mouse = { x: -1e4, y: -1e4 }, lift = 0, t0 = performance.now(), run = true;
  function frame() { if (!run) return; const T = (performance.now() - t0) / 1000; ptr.x += (pt.x - ptr.x) * .06; ptr.y += (pt.y - ptr.y) * .06;
    const ph = w < 700, ex = 1 + lift * .7, cx = w * .5 + ptr.x * 30, cy = h * (ph ? .47 : .47) + ptr.y * 20 + lift * h * .12, A = w * (ph ? .64 : .45) * ex, B = h * (ph ? .44 : .4) * ex;
    const spin = (R ? 0 : T * .22) + lift * 1.8 + ptr.x * .25;
    for (const p of P) { const th = p.a + spin, z = Math.sin(th), d = (z + 1) / 2;
      const x = cx + Math.cos(th) * A * p.r * (.86 + .14 * d); let y = cy + z * B * p.r + p.v * h * .28 + (R ? 0 : Math.sin(T * 1.3 + p.a * 3) * 7);
      if (ph) { const top = h * .15, bot = h * .6; if (Math.abs(x - w / 2) < w * .4 && y > top && y < bot) y = y - top < bot - y ? top - (y - top) * .2 : bot + (bot - y) * .2; }   // keep the headline clear on phones
      const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy); let tx = 0, ty = 0; if (dist < 190 && dist > 0) { const f = (190 - dist) / 190 * 46; tx = dx / dist * f; ty = dy / dist * f; }
      p.px += (tx - p.px) * .12; p.py += (ty - p.py) * .12; const s = (.6 + .5 * d) * p.b;
      p.el.style.transform = `translate(${(x + p.px).toFixed(1)}px,${(y + p.py).toFixed(1)}px) translate(-50%,-50%) rotate(${(p.tilt + (R ? 0 : Math.sin(T * .8 + p.a * 2) * 8)).toFixed(1)}deg) scale(${s.toFixed(3)})`;
      const front = z > 0; if (front !== p.front) { p.front = front; p.el.classList.toggle("near", front); p.el.classList.toggle("far", !front); } }
    requestAnimationFrame(frame); }
  new IntersectionObserver((e) => { const on = e[0].isIntersecting; if (on && !run) { run = true; frame(); } else if (!on) run = false; }).observe(hero); frame();
  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); pt = { x: (e.clientX - r.left) / r.width * 2 - 1, y: (e.clientY - r.top) / r.height * 2 - 1 }; mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  hero.addEventListener("pointerleave", () => { pt = { x: 0, y: 0 }; mouse = { x: -1e4, y: -1e4 }; });
  if (G) { const tl = gsap.timeline({ delay: .15 }); tl.to(P, { b: 1, duration: 1, stagger: { each: .035, from: "random" }, ease: "back.out(1.7)" }, 0)
      .from(".x-h1 .t", { y: 24, opacity: 0, duration: .8, ease: "power3.out" }, .3).from(".x-h1 .b", { y: 40, opacity: 0, duration: .9, ease: "power4.out" }, .42)
      .from(".x-hero .lead, .x-hero .ctas", { y: 18, opacity: 0, duration: .7, stagger: .1, ease: "power3.out" }, .75)
      .from(".x-hero .pp.l", { xPercent: -30, opacity: 0, duration: 1.1, ease: "power3.out" }, .5).from(".x-hero .pp.r", { xPercent: 30, opacity: 0, duration: 1.1, ease: "power3.out" }, .62);
    // scroll widens the ring as you leave (no pin: the page keeps moving)
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", scrub: .4, onUpdate: (s) => { lift = s.progress; } }); } }

// ---- seam: a few pieces cross from the hero into the logos ----
{ const seam = $("#seam"); if (seam) { const S = [["assets2/bag_w.webp", 3, 6, 92, -14], ["assets5/clapper_k.webp", 58, 14, 84, 10], ["assets2/cursor_w.webp", 44, 0, 60, -8], ["assets5/card_w.webp", 76, 30, 96, 12], ["assets2/heart_w.webp", 92, 2, 70, -10]];
  seam.innerHTML = S.map(([s, l, t, wd, r]) => `<img src="${s}" alt="" loading="lazy" draggable="false" style="left:${l}%;top:${t}%;width:clamp(${Math.round(wd * .62)}px,${(wd / 14.4).toFixed(2)}vw,${wd}px);rotate:${r}deg">`).join("");
  if (G) $$("img", seam).forEach((im, i) => gsap.fromTo(im, { y: 50 + i * 8 }, { y: -50 - i * 10, ease: "none", scrollTrigger: { trigger: "#clients", start: "top bottom", end: "bottom top", scrub: true } })); } }

// ---- logos: square marks in circles, the name beside; two ribbons that speed up with the scroll ----
const ribs = [];
function ribbon(row, dir, speed) { const o = { row, dir, speed, x: 0, half: 0, on: false }; const meas = () => { o.half = row.scrollWidth / 2; }; meas();
  if (window.ResizeObserver) new ResizeObserver(meas).observe(row); new IntersectionObserver((e) => { o.on = e[0].isIntersecting; }, { rootMargin: "120px" }).observe(row); ribs.push(o); }
if (G) { let ly = scrollY, v = 0; gsap.ticker.add((t, dt) => { const d = Math.min(64, dt) / 1000, dy = Math.abs(scrollY - ly); ly = scrollY; v += (Math.min(2400, dy / d) - v) * .1;
  for (const o of ribs) { if (!o.on || !o.half) continue; o.x += (o.speed + v * .35) * o.dir * d; o.x = ((o.x % o.half) + o.half) % o.half; o.row.style.transform = `translate3d(${-o.x}px,0,0)`; } }); }
{ const box = $("#lrib"), L = window.R12_LOGOS || []; if (box) { const per = Math.ceil(L.length / 2);
  box.innerHTML = [0, 1].map((r) => { const set = L.slice(r * per, (r + 1) * per);
    return `<div class="lrw">${set.concat(set).map(([f, n], i) => `<div class="lcp"${i < set.length ? ' role="listitem"' : ' aria-hidden="true"'}><span class="mk"><img src="assets5/lm_${f}.webp" alt="" loading="lazy" draggable="false"></span><span>${n}</span></div>`).join("")}</div>`; }).join("");
  $$(".lrw", box).forEach((row, r) => ribbon(row, r ? -1 : 1, 38)); } }

// ---- services: four characters, one opens, the others fold into strips ----
const SVC = [
  { k: "perf", n: "Performance Marketing", tags: ["Lead generation", "Google SEM", "SEO & AI search", "Tactical campaigns"], p: "Stop paying for vanity clicks that don't pick up the phone. We build end-to-end customer acquisition engines powered by Google, Meta and automated CRM pipelines.", st: [["<RM15", "average cost per lead", "Easy Europe"], ["37%", "lower cost per acquisition", "Care Concierge"]] },
  { k: "ads", n: "Digital Advertising", tags: ["Meta Ads", "TikTok & XHS", "Marketplace Ads", "Google Ads"], p: "Traffic without purchase intent is just a utility bill. Paid media engineered around hard ROAS targets and strict cost-per-customer limits.", st: [["22×", "ROAS, against an industry 8 to 12", "Luxe Living"], ["2–3×", "revenue growth in peak seasons", "Luxe Living"]] },
  { k: "video", n: "Creative Design & Video", tags: ["Social media", "Video production", "KOL & UGC", "Branding", "AI content"], p: "In saturated feeds, creative strategy is your targeting strategy. UGC storytelling, local creators and AI-hybrid production for scroll-stopping work.", st: [["7M+", "organic reach, nationwide", "BHPetrol"], ["3×", "more vendor inclusions", "LaLaport BBCC"]] },
  { k: "web", n: "Web & App Development", tags: ["E-Commerce", "Booking System", "Loyalty Apps", "Ad Landing Page"], p: "Most digital marketing fails long before an ad is clicked: it dies on slow, confusing websites. We build your digital headquarters on zero-bloat, mobile-first infrastructure engineered for fast local conversion.", st: [["700+", "leads a week after the funnel redesign", "Easy Europe"], ["65%", "lower cost per result", "Easy Europe"]] }];
let openSvc = () => {};
{ const acc = $("#acc"); if (acc) {
  acc.innerHTML = SVC.map((s, i) => `<article class="x-pn c${i}" data-k="${s.k}"><button class="x-pb" type="button" id="pb${i}" aria-expanded="false" aria-controls="pd${i}"><img class="x-ch" src="${CH(s.k)}" alt="" draggable="false"><h3 class="x-nm">${s.n}</h3><span class="x-pm" aria-hidden="true"></span><span class="vh">${s.n}</span></button>
    <span class="x-vt" aria-hidden="true">${s.n}</span>
    <div class="x-pd" id="pd${i}" role="region" aria-labelledby="pb${i}" inert><div><h3>${s.n}</h3><ul class="x-tags">${s.tags.map((t) => `<li>${t}</li>`).join("")}</ul><p>${s.p}</p><a class="cta ink" href="#connect">Talk about this${AR}</a></div>
    <div class="x-st">${s.st.map(([b, l, w]) => `<div><b>${b}</b><span>${l}</span><small>${w}</small></div>`).join("")}</div></div></article>`).join("");
  const pn = $$(".x-pn", acc);
  openSvc = (i, reveal, force) => { const was = pn[i].classList.contains("open"), on = force || !was;
    pn.forEach((p, j) => { const o = on && j === i; p.classList.toggle("open", o); $(".x-pb", p).setAttribute("aria-expanded", o); $(".x-pd", p).inert = !o; });
    acc.classList.toggle("has", on);
    if (reveal && on) { if (PHONE()) setTimeout(() => { const r = pn[i].getBoundingClientRect(); showBlock(r.top + scrollY, r.height); }, 640); else { const r = acc.getBoundingClientRect(); showBlock(r.top + scrollY, r.height); } } };
  pn.forEach((p, i) => $(".x-pb", p).addEventListener("click", () => openSvc(i, true))); window.R12.openSvc = openSvc; } }

// ---- headache chat: one topic per photo, auto-plays while in view; tap a bubble for our answer ----
const SL = [
  { img: "sc_walkin", b: ["We have no walk-in traffic", "There's a lot of new competition in the area"], s: 1, why: "Location-targeted Meta and Google ads that bring people through the door, measured in walk-ins, not likes." },
  { img: "sc_social", b: ["Our social media is dry", "Our ads look like generic AI graphics", "People are scrolling past us despite our efforts"], s: 2, why: "Thumb-stopping content and UGC campaigns that people actually stop for." },
  { img: "sc_web", b: ["We get website visitors", "But nobody converts or fills out the form"], s: 3, why: "A fast, mobile-first site and landing pages built to turn visits into enquiries." },
  { img: "sc_return", b: ["We spend everything getting new customers", "But very few of them come back"], s: 0, why: "Automated CRM and WhatsApp nurturing, plus loyalty, that brings buyers back." },
  { img: "sc_legit", b: ["We're launching a new brand", "Competitors look way more legit than us"], s: 2, why: "A brand identity and content that make you look like the leader from day one." }];
{ const tr = $("#strack"), dots = $("#sdots"), car = $("#scar"); if (tr) {
  tr.innerHTML = SL.map((s, i) => `<div class="x-sl" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${SL.length}"><img src="assets5/${s.img}.webp" alt="" ${i ? 'loading="lazy"' : ""} draggable="false">
    <div class="x-bubs"><span class="q">How can we help you?</span>${s.b.map((t) => `<button type="button" class="a">${t}</button>`).join("")}</div>
    <div class="x-ans" aria-live="polite"><small>That's a job for</small><b>${SVC[s.s].n}</b><p>${s.why}</p><div class="acts"><a class="cta ink sm" href="#connect" data-ask="${s.b.join(". ")}">Talk about this${AR}</a><button type="button" class="cta gl dk sm" data-svc="${s.s}">See the service</button><button type="button" class="cta gl dk sm" data-back>Back</button></div></div></div>`).join("");
  dots.innerHTML = SL.map((_, i) => `<button type="button" aria-label="Headache ${i + 1}"></button>`).join("");
  const sl = $$(".x-sl", tr), db = $$("button", dots); let cur = -1, tm = null, inView = false, hold = false;
  const go = (i) => { i = (i + SL.length) % SL.length; if (i === cur) return; sl.forEach((s, j) => { s.classList.toggle("on", j === i); s.classList.remove("ans"); s.inert = j !== i; }); db.forEach((d, j) => d.setAttribute("aria-current", String(j === i))); cur = i; };
  const tick = () => { clearInterval(tm); tm = null; if (inView && !hold && !R) tm = setInterval(() => go(cur + 1), 5200); };
  go(0); watch(car, (on) => { inView = on; tick(); });
  car.addEventListener("pointerenter", () => { hold = true; tick(); }); car.addEventListener("pointerleave", () => { hold = !!$(".x-sl.ans", tr); tick(); });
  car.addEventListener("focusin", () => { hold = true; tick(); });
  $$(".x-arw", car).forEach((b) => b.addEventListener("click", () => { go(cur + +b.dataset.d); tick(); })); db.forEach((d, i) => d.addEventListener("click", () => { go(i); tick(); }));
  let sx = null; tr.addEventListener("pointerdown", (e) => { sx = e.clientX; }); tr.addEventListener("pointerup", (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 44) { go(cur + (e.clientX < sx ? 1 : -1)); tick(); } sx = null; });
  sl.forEach((s) => { $$(".a", s).forEach((a) => a.addEventListener("click", () => { s.classList.add("ans"); hold = true; tick(); }));
    $("[data-back]", s).addEventListener("click", () => { s.classList.remove("ans"); hold = false; tick(); });
    $("[data-ask]", s).addEventListener("click", (e) => { const inp = $("#askin"); if (inp && !inp.value) inp.value = e.currentTarget.dataset.ask; });
    $("[data-svc]", s).addEventListener("click", (e) => openSvc(+e.currentTarget.dataset.svc, true, true)); });
  window.R12.chat = { go, get cur() { return cur; }, get playing() { return !!tm; } }; } }

// ---- impact: count up once ----
$$("#icards [data-to]").forEach((v, i) => { if (!G) return; const to = +v.dataset.to, o = { n: 0 }; v.textContent = "0";
  gsap.to(o, { n: to, duration: 1.6, delay: .1 + i * .12, ease: "power3.out", onUpdate: () => (v.textContent = Math.round(o.n)), scrollTrigger: { trigger: "#icards", start: "top 85%", once: true } }); });

// ---- analytics: cards spiral in, stack, then show one finding at a time (time-driven, the wheel scrolls on) ----
const MV = [{ b: "74%", l: "Bounce rate", s: "of Instagram visitors bounce", h: "Enhance web UX", p: "Fix the leaky bucket: remove what stops visitors buying, before you spend another ringgit on ads.", vz: "line" },
  { b: "RM63", l: "Cost per lead", s: "per Facebook lead. Google brings them at RM30", h: "Strengthen SEM", p: "Show up where buyers are already searching, on Google and in AI answers.", vz: "bars" },
  { b: "0.8%", l: "Click-through", s: "click-through on the social ads", h: "Engaging, trust-building social ads", p: "Stop the scroll, earn trust, then convert.", vz: "donut" }];
const viz = (k, i) => k === "bars" ? `<div class="bars">${[.4, .7, .5, .9, .6, 1].map((v, j) => `<i style="height:${Math.round((.3 + rnd(i * 7 + j) * .7) * 100)}%"></i>`).join("")}</div>`
  : k === "donut" ? `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="6"/><circle cx="20" cy="20" r="15" fill="none" stroke="#D7000F" stroke-width="6" stroke-dasharray="${(30 + rnd(i) * 50).toFixed(0)} 100" transform="rotate(-90 20 20)" pathLength="100"/></svg>`
  : `<svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 ${30 - rnd(i) * 10} ${[...Array(8)].map((_, j) => `L${(j + 1) * 12.5} ${(8 + rnd(i * 9 + j) * 26).toFixed(1)}`).join(" ")}" fill="none" stroke="#D7000F" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg>`;
{ const stage = $("#astage"), sw = $("#swarm"), ft = $("#afeat"), dots = $("#adots"); if (stage) {
  const DC = [["+19.3%", "Revenue, month on month", "bars", ""], ["RM25.99", "Next payment in 4 days", "", "rd"], ["32K", "Impressions", "donut", "kk"], ["+34.98%", "Organic sessions", "bars", "pk"], ["RM1,248", "Current balance", "line", ""],
    ["↑72.5%", "Progress to target", "", "pk"], ["+280%", "Leads from search", "bars", "kk"], ["0.9%", "Conversion rate", "line", ""], ["4.8s", "Page load", "donut", "pk"], ["2.1×", "ROAS", "line", "rd"], ["RM410", "Cost per customer", "bars", ""], ["9%", "Returning customers", "donut", "kk"], ["640K", "Reach", "line", "pk"], ["1.1%", "Engagement", "bars", ""]];
  const cards = DC.map(([b, s, v, c], i) => { const el = document.createElement("div"); el.className = "x-dc " + c; el.innerHTML = `<b>${b}</b><small>${s}</small>${v ? `<div class="vz">${viz(v, i)}</div>` : ""}`; sw.appendChild(el); return { el, i, a0: rnd(i + 3) * 6.28, rr: .85 + rnd(i + 5) * .3, rot: (rnd(i + 8) - .5) * 14 }; });
  ft.innerHTML = `<div class="x-fc"><small></small><b></b><p></p><div class="vz"></div></div><div class="x-ft"><span class="n"></span><h3></h3><p></p></div>`;
  dots.innerHTML = MV.map((_, i) => `<button type="button" aria-label="Finding ${i + 1}"></button>`).join("");
  const fc = $(".x-fc", ft), fx = $(".x-ft", ft), db = $$("button", dots); let cur = 0, st = { k: R || !G ? 2 : 0, spin: 0 }, played = false, tm = null, inView = false, hold = false;
  const fill = (i) => { const m = MV[i]; $("small", fc).textContent = m.l; $("b", fc).textContent = m.b; $("p", fc).textContent = m.s; $(".vz", fc).innerHTML = viz(m.vz, i + 20);
    $(".n", fx).textContent = `Move ${i + 1} of 3`; $("h3", fx).textContent = m.h; $("p", fx).textContent = m.p; db.forEach((d, j) => d.setAttribute("aria-current", String(j === i))); };
  const place = () => { const W = stage.clientWidth, H = stage.clientHeight, sb = stage.getBoundingClientRect(), fr = fc.getBoundingClientRect(), cw = cards[0].el.offsetWidth;
    const scx = fr.left - sb.left + fr.width / 2, scy = fr.top - sb.top + fr.height / 2, cx = W / 2, cy = H / 2, Rx = Math.min(W * .42, 520), Ry = Math.min(H * .4, 260), R0 = Math.max(W, H) * 1.1;
    const e = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, k = st.k, N = cards.length;
    for (const c of cards) { const a = c.i / N * Math.PI * 2 + st.spin, ringX = cx + Math.cos(a) * Rx * c.rr, ringY = cy + Math.sin(a) * Ry * c.rr, ringR = a * 57.3 + 90;
      const sx = cx + Math.cos(c.a0) * R0, sy = cy + Math.sin(c.a0) * R0, stkX = scx + (rnd(c.i + 30) - .5) * 26, stkY = scy + (rnd(c.i + 31) - .5) * 20;
      let x, y, r, s; if (k <= 1) { const t = e(k); x = sx + (ringX - sx) * t; y = sy + (ringY - sy) * t; r = c.rot * 6 * (1 - t) + ringR * t; s = 1; }
      else { const t = e(Math.min(1, k - 1)); x = ringX + (stkX - ringX) * t; y = ringY + (stkY - ringY) * t; r = ringR + (c.rot - ringR) * t; s = 1 + (fr.width / cw * .9 - 1) * t; }
      c.el.style.transform = `translate(${(x - cw / 2).toFixed(1)}px,${(y - cw / 2).toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${s.toFixed(3)})`; } };
  const show = (i, first) => { cur = (i + MV.length) % MV.length; if (!G) { fill(cur); fc.style.opacity = fx.style.opacity = 1; return; }
    if (first) { fill(cur); gsap.fromTo(fc, { opacity: 0, y: 30, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .6, ease: "back.out(1.6)" }); gsap.fromTo(fx, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .7, delay: .15, ease: "power3.out" }); return; }
    gsap.timeline().to(fc, { x: 140, y: -40, rotation: 12, opacity: 0, duration: .4, ease: "power2.in" }).to(fx, { opacity: 0, x: -20, duration: .3 }, 0)
      .add(() => fill(cur)).fromTo(fc, { x: -30, y: 30, rotation: -6, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: .55, ease: "back.out(1.5)" }).fromTo(fx, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .6, ease: "power3.out" }, "-=.35");
    cards.forEach((c, j) => gsap.fromTo(c.el, { "--j": 0 }, { "--j": 1, duration: .3, delay: j * .01 })); };
  const tick = () => { clearInterval(tm); tm = null; if (played && inView && !hold && !R) tm = setInterval(() => show(cur + 1), 4200); };
  place(); addEventListener("resize", place);
  const play = () => { if (played) return; played = true;
    if (!G) { st.k = 2; place(); show(0, true); tick(); return; }
    const tl = gsap.timeline({ onUpdate: place, onComplete: () => { show(0, true); tick(); } });
    tl.to(st, { k: 1, duration: 1.5, ease: "none" }).to(st, { spin: Math.PI * .9, duration: 2.6, ease: "power1.inOut" }, 0).to(st, { k: 2, duration: 1, ease: "none" }, 2.1); };
  if (!G) { fill(0); fc.style.opacity = fx.style.opacity = 1; }
  watch(stage, (on) => { inView = on; if (on) play(); tick(); }, .3);
  stage.addEventListener("pointerenter", () => { hold = true; tick(); }); stage.addEventListener("pointerleave", () => { hold = false; tick(); });
  $$(".x-arw", stage.parentElement).forEach((b) => b.addEventListener("click", () => { if (!played) play(); else show(cur + +b.dataset.d); tick(); }));
  db.forEach((d, i) => d.addEventListener("click", () => { if (played) show(i); tick(); }));
  window.R12.an = { get cur() { return cur; }, get played() { return played; }, get playing() { return !!tm; }, get k() { return st.k; } }; } }

// ---- cases: results first; the brand and the photo appear only when opened, each in its own colour ----
const CS = [{ k: "yakisoul", v: "+450%", l: "monthly revenue, single outlet", w: "Yaki Soul", tags: ["F&B", "Walk-in traffic", "Seasonal campaigns"], p: "Seasonal campaigns turned an izakaya off the main street into a KL destination, now serving 7,000+ customers a month." },
  { k: "writeedge", pre: "Almost", v: "4×", l: "growth in under two years", w: "Write-Edge", tags: ["Education", "Client review"], q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge" },
  { k: "bhpetrol", v: "7M+", l: "organic reach, nationwide", w: "BHPetrol", tags: ["Energy", "Campaign videos", "Key visuals"], p: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed." },
  { k: "easyeurope", v: "700+", l: "leads a week, under RM15 each", w: "Easy Europe", tags: ["Travel", "Lead generation"], p: "Travel revival from the pandemic to peak season, with a 65% lower cost per result." },
  { k: "careconcierge", v: "23%", l: "more monthly sales", w: "Care Concierge", tags: ["Senior care", "Meta retargeting"], p: "Senior care beyond Google search: Meta retargeting and a multi-state expansion, at a 37% lower cost per acquisition." },
  { k: "furniture", v: "22×", l: "return on ad spend, against an industry 8 to 12", w: "Luxe Living", tags: ["Furniture", "Shopee & Lazada", "Meta"], p: "Year-round seasonal campaigns, from Shopee and Lazada to Meta, with 2 to 3 times revenue growth." },
  { k: "lalaport", v: "3×", l: "more vendor inclusions", w: "LaLaport BBCC", tags: ["Retail mall", "Social media"], p: "One Japanese narrative for a mall of monthly events." }];
{ const list = $("#clist"); if (list) {
  list.innerHTML = CS.map((c, i) => `<li class="x-cr k${i % 4 + 1}"><button type="button" class="x-crh" aria-expanded="false" aria-controls="crb${i}" id="crh${i}"><span class="v">${c.pre ? `<small>${c.pre}</small>` : ""}${c.v}</span><span class="l">${c.l}</span><span class="w">${c.w}</span><span class="x-pm" aria-hidden="true"></span></button>
    <div class="x-crb" id="crb${i}" role="region" aria-labelledby="crh${i}" inert><div><div class="x-crg"><img src="assets3/v9c_${c.k}.webp" alt="${c.w}: our work" loading="lazy" draggable="false"><div><span class="brand">${c.w}</span>
    ${c.q ? `<p>“${c.q}”</p><cite>${c.who}</cite>` : `<p>${c.p}</p>`}<ul class="x-tags">${c.tags.map((t) => `<li>${t}</li>`).join("")}</ul></div></div></div></div></li>`).join("");
  const rows = $$(".x-cr", list);
  rows.forEach((r, i) => $(".x-crh", r).addEventListener("click", () => { const on = !r.classList.contains("open"), prev = rows.findIndex((x) => x.classList.contains("open"));
    const shift = prev >= 0 && prev < i && on ? $(".x-crb > div", rows[prev]).offsetHeight : 0, top = r.getBoundingClientRect().top + scrollY - shift;
    rows.forEach((x, j) => { const o = on && j === i; x.classList.toggle("open", o); $(".x-crh", x).setAttribute("aria-expanded", o); $(".x-crb", x).inert = !o; });
    if (on) showBlock(top, $(".x-crh", r).offsetHeight + $(".x-crb > div", r).scrollHeight); })); } }

// ---- team: a curved carousel; the middle photo is large, the sides turn away ----
{ const fl = $("#tflow"), dots = $("#tdots"); if (fl) { const PH = ["poiching", "marcus", "swet", "bhp", "cheanu", "belle"], N = PH.length;
  fl.innerHTML = PH.map((p, i) => `<figure role="group" aria-roledescription="slide" aria-label="${i + 1} of ${N}"><img src="assets3/v9_g_${p}.webp" alt="The Battle team with clients" loading="lazy" draggable="false"></figure>`).join("");
  dots.innerHTML = PH.map((_, i) => `<button type="button" aria-label="Photo ${i + 1}"></button>`).join("");
  const figs = $$("figure", fl), db = $$("button", dots); let cur = 0, tm = null, inView = false, hold = false;
  const lay = () => { const fw = figs[0].offsetWidth, ph = PHONE();
    figs.forEach((f, i) => { let d = i - cur; if (d > N / 2) d -= N; if (d < -N / 2) d += N; const a = Math.abs(d);
      f.style.transform = `translateX(${(d * fw * (ph ? .72 : .86)).toFixed(0)}px) translateZ(${(-a * (ph ? 140 : 190)).toFixed(0)}px) rotateY(${(-Math.sign(d) * Math.min(a, 2) * 30).toFixed(0)}deg) scale(${(1 - a * .06).toFixed(2)})`;
      f.style.opacity = a > 2 ? 0 : 1; f.style.zIndex = 10 - a; f.style.filter = a ? `brightness(${(1 - a * .14).toFixed(2)})` : ""; f.setAttribute("aria-hidden", String(a > 0)); });
    db.forEach((d, j) => d.setAttribute("aria-current", String(j === cur))); };
  const go = (i) => { cur = (i + N) % N; lay(); }, tick = () => { clearInterval(tm); tm = null; if (inView && !hold && !R) tm = setInterval(() => go(cur + 1), 3800); };
  lay(); addEventListener("resize", lay); watch(fl, (on) => { inView = on; tick(); });
  fl.addEventListener("pointerenter", () => { hold = true; tick(); }); fl.addEventListener("pointerleave", () => { hold = false; tick(); });
  let sx = null; fl.addEventListener("pointerdown", (e) => { sx = e.clientX; }); fl.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); else { const f = e.target.closest("figure"); if (f) go(figs.indexOf(f)); } tick(); });
  $$(".x-arw", fl.parentElement).forEach((b) => b.addEventListener("click", () => { go(cur + +b.dataset.d); tick(); })); db.forEach((d, i) => d.addEventListener("click", () => { go(i); tick(); }));
  window.R12.team = { get cur() { return cur; } }; } }

// ---- connect: one line, a goal, sent on WhatsApp ----
{ const ask = $("#ask"); if (ask) { let goal = ""; const seg = $(".seg", ask), btns = $$("button", seg), thumb = $(".thumb", seg);
  const mv = (b) => { if (!b) { thumb.style.opacity = 0; return; } thumb.style.opacity = 1; thumb.style.width = b.offsetWidth + "px"; thumb.style.transform = `translateX(${b.offsetLeft}px)`; };
  btns.forEach((b) => b.addEventListener("click", () => { goal = goal === b.dataset.g ? "" : b.dataset.g; btns.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.g === goal))); mv(goal ? b : null); }));
  addEventListener("resize", () => mv(btns.find((x) => x.getAttribute("aria-pressed") === "true")));
  ask.addEventListener("submit", (e) => { e.preventDefault(); const v = $("#askin").value.trim(), g = goal ? `My primary goal: ${goal}. ` : ""; open(WA(`Hi Battle, ${g}${v || "I'd like a 15-minute call about my marketing."}`), "_blank", "noopener"); }); } }

// ---- phone: a contact bar that follows the thumb; hidden over the hero, the contact section and the footer ----
{ const d = document.createElement("div"); d.className = "x-dock"; d.setAttribute("aria-label", "Contact Battle");
  d.innerHTML = `<a class="wa" href="${WA("Hi Battle, I'd like a 15-minute call about my marketing.")}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>WhatsApp us</a><a href="#connect">Let's talk</a>`;
  document.body.appendChild(d); const seen = new Set();
  const io = new IntersectionObserver((es) => { es.forEach((e) => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); d.classList.toggle("on", seen.size === 0); }, { threshold: .15 });
  ["#hero", "#connect", ".foot"].forEach((s) => { const el = $(s); if (el) io.observe(el); });
  window.R12.dock = d; }

if (G) { const cnp = $(".cnp"); if (cnp) gsap.from(cnp, { xPercent: 26, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#connect", start: "top 62%", once: true } });
  addEventListener("load", () => ScrollTrigger.refresh()); }
})();
