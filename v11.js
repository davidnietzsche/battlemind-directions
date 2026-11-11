/* Battle Mind · v11 core: the headline, the nav (light or dark by the section under it), gliding to what a click opens, and the chat. */
(() => {
const R = matchMedia("(prefers-reduced-motion: reduce)").matches, q = new URLSearchParams(location.search), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const G = !R && !!window.gsap;
const AR = '<span class="ar" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const H = [["Human First.", "Results Always."], ["Win the right battles.", "Scale results."]], hi = Math.min(1, Math.max(0, (+q.get("h") || 1) - 1));
function setH(i) { $$(".h1").forEach((h) => { h.classList.toggle("long", i === 1); h.innerHTML = (h.dataset.stack && !i ? H[i].flatMap((l) => l.split(" ")) : H[i]).map((l) => `<span class="w"><i>${l}</i></span>`).join(""); }); if (R) gsap.set(".h1 .w i", { y: 0 }); }
setH(hi);
const BM = (window.BM = { setH, R, AR });

const nav = $("#nav"), nb = $("#nb"), drawer = $("#drawer");
function tone() { nav.style.pointerEvents = "none"; const el = document.elementFromPoint(innerWidth / 2, 38); nav.style.pointerEvents = ""; const t = el && el.closest("[data-tone]");
  if (t) nav.classList.toggle("light", t.dataset.tone === "light"); nav.classList.toggle("sc", scrollY > 40 && !(t && t.id === "hero")); }
addEventListener("scroll", () => requestAnimationFrame(tone), { passive: true }); addEventListener("resize", tone); tone(); setTimeout(tone, 100);
if (nb) { const open = (on) => { nb.setAttribute("aria-expanded", on); drawer.classList.toggle("open", on); document.body.classList.toggle("lock", on); if (window.lenis) window.lenis[on ? "stop" : "start"](); };
  nb.onclick = () => open(nb.getAttribute("aria-expanded") !== "true"); $$("a", drawer).forEach((a) => a.addEventListener("click", () => open(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); }); }

// gliding: v9.1 scrolls with Lenis, so the glide goes through it; the user's own scroll always wins
let gl = null;
function glideTo(y, dur) { y = Math.max(0, Math.round(y)); if (Math.abs(y - scrollY) < 6) return; const L = window.lenis;
  if (L) { L.scrollTo(y, G ? { duration: dur || .85, easing: (t) => 1 - Math.pow(1 - t, 3) } : { immediate: true }); return; }
  if (!G) { scrollTo({ top: y, behavior: "instant" }); return; }
  const o = { y: scrollY }; if (gl) gl.kill(); gl = gsap.to(o, { y, duration: dur || .85, ease: "power3.inOut", onUpdate: () => scrollTo({ top: o.y, behavior: "instant" }) }); }
["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { if (gl) { gl.kill(); gl = null; } }, { passive: true }));
function showBlock(top, h) { const navH = nav.offsetHeight + 14, pad = 26, vh = innerHeight; let y = scrollY;
  if (h > vh - navH - pad) y = top - navH; else if (top + h > y + vh - pad) y = top + h + pad - vh; else if (top < y + navH) y = top - navH;
  glideTo(y); }
BM.glideTo = glideTo; BM.showBlock = showBlock;
document.addEventListener("click", (e) => { const a = e.target.closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute("href").slice(1), t = id && id !== "top" ? document.getElementById(id) : null;
  if (id && id !== "top" && !t) return; e.preventDefault(); glideTo(t ? t.getBoundingClientRect().top + scrollY - (t.classList.contains("chat9") ? 96 : 0) : 0, 1.1); });

// the chat: pick the line that sounds like you; Battle answers with the service, and the page glides to the answer
const SVN = ["Build Your Conversion Engine", "High-Intent Paid Traffic", "Scroll-Stopping Creative Content", "Organic Brand Authority"], TB = ["cursor_w", "megaphone_w", "play_k", "magnifier_k"];
const DG = [["We need sales, calls, and qualified inquiries right away.", "Performance Marketing & Customer Acquisition", 1],
  ["Our social media is dry, and our ads look like generic AI graphics. People are scrolling past us.", "Creative Performance & Social Proof", 2],
  ["We get website visitors, but nobody converts or fills out the form.", "Web Infrastructure & Conversion Optimization", 0],
  ["We spend all our budget getting new customers but rate of returning customers are low.", "CRM Solutions", 3],
  ["We're launching a new brand, or competitors look way more legit than us.", "Brand Authority & Strategy", 2]];
{ const opts = $("#opts"), ans = $("#ans"); if (opts) {
  opts.innerHTML = DG.map(([qq], i) => `<button type="button" class="opt" aria-pressed="false" data-i="${i}">${qq}</button>`).join("");
  let tmr; $$(".opt", opts).forEach((b) => b.addEventListener("click", () => { const [qq, label, card] = DG[+b.dataset.i];
    $$(".opt", opts).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); clearTimeout(tmr);
    const html = `<div class="bub red"><span>That's a job for</span><b>${SVN[card]}</b><span>${label}. We start there.</span><img src="assets2/${TB[card]}.webp" alt=""></div>
        <div class="acts"><a class="cta" href="#connect" id="dgo">Talk about this${AR}</a><button class="cta gl" type="button" id="dsee">See the service</button></div>`;
    const say = () => { ans.innerHTML = html;
      $("#dgo").addEventListener("click", () => { const inp = $("#askin"); if (inp && !inp.value) inp.value = qq; });
      $("#dsee").addEventListener("click", () => { const cards = $$("#svg4 .svc"), c = cards[card]; cards.forEach((x) => x.classList.toggle("hit", x === c)); if (c) { const r = c.getBoundingClientRect(); showBlock(r.top + scrollY - 84, r.height + 84); } });   // 84px: the toy that crowns the card
      if (G) gsap.from(ans.children, { y: 18, opacity: 0, duration: .55, stagger: .08, ease: "power3.out" }); };
    ans.style.minHeight = ""; ans.innerHTML = html; const h = ans.offsetHeight; ans.style.minHeight = h + "px";   // measured, not painted
    if (R) say(); else { ans.innerHTML = '<div class="bub them typing" aria-hidden="true"><i></i><i></i><i></i></div>'; tmr = setTimeout(say, 750); }
    showBlock(ans.getBoundingClientRect().top + scrollY, h); }));
  if (G && window.ResizeObserver) { let rt, lastH = 0; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { const h = $("#conv").offsetHeight; if (h !== lastH) { lastH = h; ScrollTrigger.refresh(); } }, 260); }).observe($("#conv")); } } }
})();
