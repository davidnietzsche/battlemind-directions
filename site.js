/* Battle Mind · shared sections for the 21 / 22 / 32 full pages (Round 7 revamp). Copy = Sue's flow (home-v10); data = the deck. */
(() => {
const R = matchMedia("(prefers-reduced-motion: reduce)").matches, q = new URLSearchParams(location.search), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
if (q.has("rec")) document.body.classList.add("rec");
if (R) document.documentElement.classList.add("norise");
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const G = !R && !!window.gsap;
const AR = '<span class="ar" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const WA = (t) => "https://wa.me/60197707927?text=" + encodeURIComponent(t);
const rnd = (i) => { const g = Math.sin(i * 127.1 + 311.7) * 43758.5453; return g - Math.floor(g); };

// ---- headline: Sue's line by default; ?h=2 shows the current site line ----
const H = [["Human First.", "Results Always."], ["Win the right battles.", "Scale results."]];
const hi = Math.min(1, Math.max(0, (+q.get("h") || 1) - 1));
function setH(i, animate) { $$(".h1").forEach((h) => { h.classList.toggle("long", i === 1); h.innerHTML = (h.dataset.stack && !i ? H[i].flatMap((l) => l.split(" ")) : H[i]).map((l) => `<span class="w"><i>${l}</i></span>`).join(""); });
  if (R) gsap.set(".h1 .w i", { y: 0 }); else if (animate) gsap.to(".h1 .w i", { y: 0, duration: .9, stagger: .12, ease: "power4.out" }); }
setH(hi, false);
window.BM = { setH, R, AR };

// ---- nav: scrolled state, light/dark by the section under it, phone drawer ----
const nav = $("#nav"), nb = $("#nb"), drawer = $("#drawer");
function tone() { nav.style.pointerEvents = "none"; const el = document.elementFromPoint(innerWidth / 2, 38); nav.style.pointerEvents = ""; const t = el && el.closest("[data-tone]");
  if (t) nav.classList.toggle("light", t.dataset.tone === "light"); nav.classList.toggle("sc", scrollY > 40 && !(t && t.id === "hero")); }
addEventListener("scroll", () => requestAnimationFrame(tone), { passive: true }); addEventListener("resize", tone); tone(); setTimeout(tone, 100);
if (nb) { const open = (on) => { nb.setAttribute("aria-expanded", on); drawer.classList.toggle("open", on); document.body.classList.toggle("lock", on); };
  nb.onclick = () => open(nb.getAttribute("aria-expanded") !== "true"); $$("a", drawer).forEach((a) => a.addEventListener("click", () => open(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); }); }

// ---- when a click opens something, glide so the result is in view; the user's own scroll always wins ----
let gl = null;
function glideTo(y, dur) { y = Math.max(0, Math.round(y)); if (Math.abs(y - scrollY) < 6) return; if (!G) { scrollTo({ top: y, behavior: "instant" }); return; }
  const o = { y: scrollY }; if (gl) gl.kill(); gl = gsap.to(o, { y, duration: dur || .85, ease: "power3.inOut", onUpdate: () => scrollTo({ top: o.y, behavior: "instant" }) }); }
window.BM.glideTo = glideTo;
["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { if (gl) { gl.kill(); gl = null; } }, { passive: true }));
function showBlock(top, h) { const navH = (nav ? nav.offsetHeight : 0) + 14, pad = 26, vh = innerHeight; let y = scrollY;   // top/h = where the block will be once the layout settles
  if (h > vh - navH - pad) y = top - navH;                     // taller than the view: start at its top
  else if (top + h > y + vh - pad) y = top + h + pad - vh;     // its end is below the fold: bring it up
  else if (top < y + navH) y = top - navH;                     // its start is under the nav: bring it down
  glideTo(y); }

// ---- section headlines: one masked line each ----
$$(".hx").forEach((h) => { h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((p) => `<span class="ln"><i>${p.trim()}</i></span>`).join(""); });

// ---- ribbons (logos, team photos): drift on their own and speed up with the scroll ----
const ribs = [];
function ribbon(row, dir, speed) { const o = { row, dir, speed, x: 0, half: 0, on: false }; const meas = () => { o.half = row.scrollWidth / 2; }; meas();
  if (window.ResizeObserver) new ResizeObserver(meas).observe(row); new IntersectionObserver((e) => { o.on = e[0].isIntersecting; }, { rootMargin: "120px" }).observe(row); ribs.push(o); }
if (G) { let ly = scrollY, v = 0; gsap.ticker.add((t, dt) => { const d = Math.min(64, dt) / 1000, dy = Math.abs(scrollY - ly); ly = scrollY; v += (Math.min(2400, dy / d) - v) * .1;
  for (const o of ribs) { if (!o.on || !o.half) continue; o.x += (o.speed + v * .4) * o.dir * d; o.x = ((o.x % o.half) + o.half) % o.half; o.row.style.transform = `translate3d(${-o.x}px,0,0)`; } }); }

// ---- clients: 46 logos in their own colours, in capsules ----
const LOGOS = [["Tesla-logo","Tesla"],["Colgate-logo-v2","Colgate"],["Manchester-United-logo-v2","Manchester United"],["Liverpool-logo-v2","Liverpool FC"],["Good-Year-logo-v2","Goodyear"],["Arla-logo-v2","Arla"],["Maxis-Business-logo","Maxis Business"],["Grab-Express-logo-v2","GrabExpress"],["Tupperware-logo","Tupperware"],["BHP-Petrol-logo","BHPetrol"],["Hovid-logo-v2","Hovid"],["Naturel-logo-v2","Naturel"],["Yaki-Soul-logo-v2","Yaki Soul"],["Write-Edge-logo-v2","Write-Edge"],["Easy-Europe-logo-v2","Easy Europe"],["Citrex-logo-v2","Citrex"],["Dasiy-logo-v2","Daisy"],["Entropia-logo-v2","Entropia"],["Luxe-Living-logo-v2","Luxe Living"],["Softlan-logo-v2","Softlan"],["Puck-logo-v2","Puck"],["Mr-Fish-logo-v2","Mr Fish"],["Oktopurs-logo-v2","Oktopurs"],["JOJO-logo-v2","JOJO"],["Zero-Healthcare-logo","Zero Healthcare"],["glo-logo-v2","glo"],["marcus-logo-client-2","Marcus Teoh"],["SWET-logo","SWET Image"],["Teien-logo","Teien"],["Yosen-logo","Yosen"],["CR8-Melaka-logo-v2","CR8 Melaka"],["Seng-Cars-World-logo","Seng Cars World"],["Campus-Rangers-logo","Campus Rangers"],["Magnet-Experiential-logo","Magnet Experiential"],["BO-Capital-logo","BO Capital"],["Bio-home-logo-v2","Bio-home"],["La-Gourmet-logo","La Gourmet"],["Gemini-Spacecraft-logo","Gemini Spacecraft"],["Fujian-Association-logo","Fujian Association"],["Tiga-ikan-logo-v2","Tiga Ikan"],["UBCT-logo","UBCT"],["KAIA-logo","KAIA"],["Aurea-logo","Aurea"],["sd-labs-logo-v2","SD Labs"]];
{ const box = $("#lrib"); if (box) { const per = Math.ceil(LOGOS.length / 2);
  box.innerHTML = [0, 1].map((r) => { const set = LOGOS.slice(r * per, (r + 1) * per);
    return `<div class="lrw">${set.concat(set).map(([f, n], i) => `<div class="lcp"${i < set.length ? ' role="listitem"' : ' aria-hidden="true"'}><img src="assets3/v10l_${f}.webp" alt="${i < set.length ? n : ""}" loading="lazy" draggable="false"></div>`).join("")}</div>`; }).join("");
  $$(".lrw", box).forEach((row, r) => ribbon(row, r ? -1 : 1, 44)); } }

// ---- services: Sue's four with the deck's layer copy and two results each; one row open at a time ----
const LAYERS = [["Most digital marketing fails long before an ad is clicked: it dies on slow, confusing websites. We build your digital headquarters on zero-bloat, mobile-first infrastructure engineered for fast local conversion.", "Web development · Landing pages · CRO"],
  ["Traffic without purchase intent is just a utility bill. Performance-targeted paid media engineered around aggressive ROAS targets and strict CAC thresholds.", "Meta · Google SEM · TikTok Shop · Shopee & Lazada"],
  ["In saturated feeds, creative strategy is your targeting strategy. UGC storytelling, localised influencer trust and AI production for high-volume, scroll-stopping ads.", "Video · Motion · KOL / UGC · AI-hybrid creative"],
  ["Paid ads buy immediate revenue. We build long-term market dominance: organic search for your highest-margin lines, and automated nurturing for repeat purchases.", "SEO · Backlinks · WhatsApp / CRM nurturing"]];
const RES = { web: [["700+", 700, "", "+", "leads a week after the funnel redesign", "Easy Europe"], ["RM3.8M+", 3.8, "RM", "M+", "peak monthly revenue", "Easy Europe"]],
  ads: [["22×", 22, "", "×", "ROAS, against an industry 8 to 12", "Luxe Living"], ["37%", 37, "", "%", "lower cost per acquisition", "Care Concierge"]],
  content: [["7M+", 7, "", "M+", "organic reach, nationwide", "BHPetrol"], ["3×", 3, "", "×", "more vendor inclusions", "LaLaport BBCC"]],
  organic: [["6+", 6, "", "+", "countries of SEO and SEM coverage", "Luxe Living"], ["No.1", 1, "No.", "", "izakaya in KL, from zero", "Yaki Soul"]] };
const SV = [["web", "Build Your Conversion Engine", "cursor_r"], ["ads", "High-Intent Paid Traffic", "megaphone_r"], ["content", "Scroll-Stopping Creative Content", "play_r"], ["organic", "Organic Brand Authority", "magnifier_r"]];
const TB = ["cursor_w", "megaphone_w", "play_k", "magnifier_k"];
window.BM.SV = SV;
let openRow = () => {};
{ const box = $("#srows"); if (box) {
  box.innerHTML = SV.map(([k, t, ic], i) => `<article class="sr" data-k="${k}"><span class="flood" aria-hidden="true"></span>
    <div class="wrap"><h3 class="srt"><button class="srh" type="button" id="srh${i}" aria-expanded="false" aria-controls="srb${i}"><span class="st">${t}</span><span class="toy" aria-hidden="true"><img class="ta" src="assets2/${ic}.webp" alt="" loading="lazy" draggable="false"><img class="tb" src="assets2/${TB[i]}.webp" alt="" loading="lazy" draggable="false"></span><span class="pm" aria-hidden="true"></span></button></h3></div>
    <div class="srb" id="srb${i}" role="region" aria-labelledby="srh${i}"><div class="in"><div class="wrap srg"><div><p>${LAYERS[i][0]}</p><a class="cta" href="#connect">Talk about this${AR}</a></div>
      <ul>${LAYERS[i][1].split(" · ").map((x) => `<li>${x}</li>`).join("")}</ul>
      <div class="sres">${RES[k].map(([f, n, pre, suf, l, who]) => `<div><b data-n="${n}" data-pre="${pre}" data-suf="${suf}">${f}</b><span>${l}</span><small>${who}</small></div>`).join("")}</div></div></div></div></article>`).join("");
  const rows = $$(".sr", box); let seen = false;
  const count = (row) => { if (row.dataset.lit || !G || !seen) return; row.dataset.lit = 1; $$(".sres b", row).forEach((b) => { const n = +b.dataset.n, o = { v: 0 }, dec = Number.isInteger(n) ? 0 : 1;
    gsap.to(o, { v: n, duration: 1.1, delay: .25, ease: "power3.out", onUpdate: () => (b.textContent = b.dataset.pre + o.v.toFixed(dec) + b.dataset.suf), onComplete: () => (b.textContent = b.dataset.pre + n.toFixed(dec).replace(/\.0$/, "") + b.dataset.suf) }); }); };
  openRow = (i, force, reveal) => { const prev = rows.findIndex((r) => r.classList.contains("open")), will = force || prev !== i;
    const shift = prev >= 0 && prev < i ? $(".srb", rows[prev]).offsetHeight : 0, top = rows[i].getBoundingClientRect().top + scrollY - shift, h = $(".wrap", rows[i]).offsetHeight + $(".in", rows[i]).scrollHeight;
    rows.forEach((r, j) => { const on = j === i && will; r.classList.toggle("open", on); $(".srh", r).setAttribute("aria-expanded", on); $(".srb", r).inert = !on; if (on) count(r); });
    if (reveal && will) showBlock(top, h); };
  rows.forEach((r, i) => { $(".srh", r).addEventListener("click", () => openRow(i, false, true)); const fl = $(".flood", r);
    const side = (e) => { const b = r.getBoundingClientRect(); fl.style.transformOrigin = e.clientY - b.top < b.height / 2 ? "50% 0%" : "50% 100%"; }; r.addEventListener("pointerenter", side); r.addEventListener("pointerleave", side); });
  box.classList.add("noan"); openRow(0, true); box.offsetHeight; requestAnimationFrame(() => box.classList.remove("noan"));
  if (G) ScrollTrigger.create({ trigger: box, start: "top 75%", once: true, onEnter: () => { seen = true; const o = rows.find((r) => r.classList.contains("open")); if (o) count(o); } }); else seen = true; } }

// ---- the diagnostic as a chat: pick the line that sounds like you, Battle answers with the weapon ----
const DG = [["A", "We need sales, calls, and qualified inquiries right away.", "Performance Marketing & Customer Acquisition", 1, "Leads, now"],
  ["B", "Our social media is dry, and our ads look like generic AI graphics. People are scrolling past us.", "Creative Performance & Social Proof", 2, "Ads get scrolled past"],
  ["C", "We get website visitors, but nobody converts or fills out the form.", "Web Infrastructure & Conversion Optimization", 0, "Visitors don't convert"],
  ["D", "We spend all our budget getting new customers but rate of returning customers are low.", "CRM Solutions", 3, "Customers don't return"],
  ["E", "We're launching a new brand, or competitors look way more legit than us.", "Brand Authority & Strategy", 2, "We don't look legit yet"]];
{ const opts = $("#opts"), ans = $("#ans"); if (opts) {
  opts.innerHTML = DG.map(([, qq], i) => `<button type="button" class="opt" aria-pressed="false" data-i="${i}">${qq}</button>`).join("");
  let tmr; $$(".opt", opts).forEach((b) => b.addEventListener("click", () => { const [, qq, label, card] = DG[+b.dataset.i];
    $$(".opt", opts).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); clearTimeout(tmr);
    const html = `<div class="bub red"><span>That's a job for</span><b>${SV[card][1]}</b><span>${label}. We start there.</span><img src="assets2/${TB[card]}.webp" alt=""></div>
        <div class="acts"><a class="cta ink" href="#connect" id="dgo">Talk about this${AR}</a><button class="cta gl dk" type="button" id="dsee">See the service</button></div>`;
    const say = () => { ans.innerHTML = html;
      $("#dgo").addEventListener("click", () => { const inp = $("#askin"); if (inp && !inp.value) inp.value = qq; });
      $("#dsee").addEventListener("click", () => openRow(card, true, true));
      if (G) gsap.from(ans.children, { y: 18, opacity: 0, duration: .55, stagger: .08, ease: "power3.out" }); };
    ans.style.minHeight = ""; ans.innerHTML = html; const h = ans.offsetHeight; ans.style.minHeight = h + "px";   // measured, not painted
    if (R) say(); else { ans.innerHTML = '<div class="bub them typing" aria-hidden="true"><i></i><i></i><i></i></div>'; tmr = setTimeout(say, 750); }
    showBlock(ans.getBoundingClientRect().top + scrollY, h); })); } }

// ---- impact: the deck's four numbers, counting up once ----
$$("#kp4 [data-to]").forEach((v, i) => { if (!G) return; const to = +v.dataset.to, o = { n: 0 }; v.textContent = "0";
  gsap.to(o, { n: to, duration: 1.7, delay: .1 + i * .12, ease: "power3.out", onUpdate: () => (v.textContent = Math.round(o.n)), scrollTrigger: { trigger: "#kp4", start: "top 82%", once: true } }); });

// ---- analytics to plan: thirty numbers of noise; three of them turn red and fly into the three moves ----
{ const sec = $("#data"), nzbox = $("#nzbox"), moves = $("#moves"); if (sec && nzbox) {
  const NZ = [["4,342", "Sessions"], ["1.2M", "Impressions"], ["640K", "Reach"], ["3.4", "Frequency"], ["RM2.10", "Cost per click"], ["RM18", "CPM"], ["2.1×", "ROAS"], ["0:42", "Avg. session"], ["1.3", "Pages per session"], ["2.9%", "Add to cart"], ["81%", "Cart abandonment"], ["18%", "Email open rate"], ["+312", "New followers"], ["1.1%", "Engagement rate"], ["88K", "Video views"], ["12%", "View-through"], ["5/10", "Quality score"], ["31%", "Impression share"], ["907", "Organic clicks"], ["14.2", "Avg. position"], ["22", "Domain rating"], ["4.8s", "Page load"], ["51", "Leads"], ["0.9%", "Conversion rate"], ["RM410", "Cost per customer"], ["RM1,280", "Lifetime value"], ["9%", "Returning customers"]];
  const SIG = [["74%", "Bounce rate", "of Instagram visitors bounce"], ["RM63", "Cost per lead", "per Facebook lead. Google brings them at RM30"], ["0.8%", "Click-through", "click-through on the social ads"]];
  const MV = [["Enhance web UX", "Fix the leaky bucket: remove what stops visitors buying, before you spend another ringgit on ads."], ["Strengthen SEM", "Show up where buyers are already searching, on Google and in AI answers."], ["Engaging, trust-building social ads", "Stop the scroll, earn trust, then convert."]];
  const CELLS = [7, 16, 20], items = []; let ni = 0;
  for (let c = 0; c < 30; c++) { const s = CELLS.indexOf(c), d = s >= 0 ? SIG[s] : NZ[ni++], el = document.createElement("div"); el.className = "nz" + (s >= 0 ? " sig" : "");
    el.innerHTML = `<span style="--bd:${(5 + rnd(c) * 5).toFixed(1)}s;--bw:${(-rnd(c + 40) * 6).toFixed(1)}s;opacity:${s >= 0 ? .9 : (.2 + rnd(c + 3) * .5).toFixed(2)}"><b>${d[0]}</b><small>${d[1]}</small></span>`; nzbox.appendChild(el); items.push({ el, c, s }); }
  moves.innerHTML = MV.map(([t, p], i) => `<div class="mvr"><div class="fig"><b>${SIG[i][0]}</b><small>${SIG[i][2]}</small></div><span class="wire" aria-hidden="true"></span><div class="mt"><h3>${t}</h3><p>${p}</p></div></div>`).join("");
  const live = G && innerWidth > 900 && innerHeight > 600; sec.classList.add(live ? "live" : "still");
  const place = () => { const W = nzbox.clientWidth, Hh = nzbox.clientHeight, few = W < 600, NC = few ? 4 : 6, NR = few ? 4 : 5, cw = W / NC, ch = Hh / NR, base = few ? 30 : Math.max(24, Math.min(66, W * .042));
    nzbox.classList.toggle("few", few);
    items.forEach(({ el, c, s }, n) => { el.classList.toggle("off", n >= NC * NR); const col = n % NC, row = (n / NC) | 0, fs = s >= 0 ? base * 1.45 : base * [.55, .7, .85, 1, 1.25, 1.6][(rnd(c + 9) * 6) | 0];
      el.style.setProperty("--fs", fs.toFixed(1) + "px");
      const x = Math.max(0, Math.min(W - el.offsetWidth - 2, col * cw + (.04 + rnd(c + 1) * .4) * cw)), y = Math.max(0, Math.min(Hh - el.offsetHeight, row * ch + (.02 + rnd(c + 2) * .3) * ch));
      el.style.left = x.toFixed(1) + "px"; el.style.top = y.toFixed(1) + "px"; el._x = x; el._y = y; el._fs = fs; }); };
  place(); if (document.fonts) document.fonts.ready.then(() => { place(); if (live) ScrollTrigger.refresh(); });
  if (live) { const sig = items.filter((i) => i.s >= 0).sort((a, b) => a.s - b.s), noise = items.filter((i) => i.s < 0), rows = $$(".mvr", moves);
    const slot = (i) => { const a = $(".fig b", rows[i]).getBoundingClientRect(), b = nzbox.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, fs: parseFloat(getComputedStyle($(".fig b", rows[i])).fontSize) }; };
    gsap.set(rows, { "--hl": 0 }); gsap.set($$(".fig small, .mt", moves), { opacity: 0 }); gsap.set($$(".mt", moves), { x: 44 }); gsap.set($$(".wire", moves), { scaleX: 0 }); gsap.set("#dend .ln i", { yPercent: 115 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: "#dpin", start: "top top", end: "+=200%", pin: true, scrub: .6, invalidateOnRefresh: true, onRefreshInit: place } });
    tl.to({}, { duration: .7 });
    noise.forEach((n, k) => tl.to(n.el, { opacity: 0, x: () => (rnd(k + 70) - .5) * 260, y: () => 70 + rnd(k + 80) * 220, scale: .6, duration: 1.3, ease: "power2.in" }, .7 + rnd(k + 60) * 1.9));
    sig.forEach((s, i) => { const sp = $("span", s.el);
      tl.to($("b", s.el), { color: "#D7000F", duration: .5 }, 1 + i * .2).to(sp, { opacity: 1, duration: .5 }, 1 + i * .2).to($("small", s.el), { opacity: 0, duration: .4 }, 1.9 + i * .2)
        .set(sp, { animation: "none" }, 2.2 + i * .22)
        .to(s.el, { x: () => slot(i).x - s.el._x, y: () => slot(i).y - s.el._y, scale: () => slot(i).fs / s.el._fs, duration: 2.2, ease: "power3.inOut" }, 2.2 + i * .22)
        .set(s.el, { autoAlpha: 0 }, 4.42 + i * .22).set($(".fig b", rows[i]), { visibility: "visible" }, 4.42 + i * .22); });   // land: swap to the real, crisp figure
    tl.to(rows, { "--hl": 1, duration: 1.2, stagger: .12, ease: "power2.out" }, 3.2);
    rows.forEach((r, i) => { const t0 = 4.7 + i * .75; tl.to($(".fig small", r), { opacity: 1, duration: .5 }, t0).to($(".wire", r), { scaleX: 1, duration: .7, ease: "power2.out" }, t0 + .1).to($(".mt", r), { opacity: 1, x: 0, duration: .7, ease: "power3.out" }, t0 + .35); });
    tl.to("#dend .ln i", { yPercent: 0, duration: .9, ease: "power4.out" }, 7.3).to({}, { duration: 1 });
  } else addEventListener("resize", place); } }

// ---- cases: the deck's seven; the photo wipes to the one you point at ----
const CS = [{ k: "yakisoul", logo: "v9_logo_yakisoul", name: "Yaki Soul", n: "RM1.8M+", l: "single-outlet monthly ROI, up from RM300K", say: "Seasonal campaigns turned an izakaya off the main street into a KL destination.", tag: "F&B", x: "7,000+ customers a month" },
  { k: "writeedge", logo: "v9_logo_writeedge", name: "Write-Edge", pre: "Almost", n: "4×", l: "growth in under two years", q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge", tag: "Client review", x: "" },
  { k: "bhpetrol", logo: "v9_logo_bhppetrol", name: "BHPetrol", n: "7M+", l: "organic reach, nationwide", say: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed.", tag: "Energy", x: "Campaign videos · KV" },
  { k: "easyeurope", logo: "v9_logo_easyeurope", name: "Easy Europe", n: "700+", l: "leads a week, under RM15 each", say: "Travel revival: from the pandemic to RM3.8M+ peak monthly revenue.", tag: "Travel", x: "65% lower cost per result" },
  { k: "careconcierge", logo: "", name: "Care Concierge", n: "23%", l: "more monthly sales", say: "Senior care beyond Google search: Meta retargeting and a multi-state expansion.", tag: "Senior care", x: "37% lower cost per acquisition" },
  { k: "furniture", logo: "v9_logo_luxeliving", dark: 1, name: "Luxe Living", n: "22×", l: "ROAS, against an industry 8 to 12", say: "Year-round seasonal campaigns, from Shopee and Lazada to Meta.", tag: "Furniture", x: "2-3× revenue growth" },
  { k: "lalaport", logo: "", name: "LaLaport BBCC", n: "3×", l: "more vendor inclusions", say: "One Japanese narrative for a mall of monthly events.", tag: "Retail mall", x: "Social media retainer" }];
{ const cfr = $("#cfr"), list = $("#clist"), cst = $("#cst"); if (list) {
  const story = (c) => (c.q ? `<p>“${c.q}”<cite>${c.who}</cite></p>` : `<p>${c.say}</p>`) + `<small>${c.tag}${c.x ? ": " + c.x.replace(" · ", ", ").replace(/^./, (m) => m.toLowerCase()) : ""}</small>`;
  cfr.innerHTML = CS.map((c, i) => `<img class="ph" src="assets3/v9c_${c.k}.webp" alt="${c.name}: our work"${i ? ' loading="lazy"' : ""} draggable="false">`).join("") + '<span class="clg" id="clg"></span>';
  list.innerHTML = CS.map((c, i) => `<li><button type="button" class="crow" data-i="${i}" aria-pressed="false"><span class="ct"><span class="cn">${c.name}</span><span class="cl">${c.l}</span></span><span class="cv">${c.pre ? `<small>${c.pre}</small>` : ""}${c.n}</span></button><div class="cmob"><div><img src="assets3/v9c_${c.k}.webp" alt="" loading="lazy">${story(c)}</div></div></li>`).join("");
  const imgs = $$("img.ph", cfr), lis = $$("li", list), clg = $("#clg"); let cur = -1, z = 1;
  const show = (i, instant) => { if (i === cur) return;
    if (!instant && getComputedStyle($(".cmob", lis[i])).display !== "none") { const shift = cur >= 0 && cur < i ? $(".cmob", lis[cur]).offsetHeight : 0;
      showBlock(lis[i].getBoundingClientRect().top + scrollY - shift, $(".crow", lis[i]).offsetHeight + $(".cmob > div", lis[i]).scrollHeight); }
    cur = i; const c = CS[i]; lis.forEach((l, j) => { l.classList.toggle("on", j === i); $(".crow", l).setAttribute("aria-pressed", String(j === i)); });
    const im = imgs[i]; im.style.zIndex = ++z; if (instant || !G) { im.style.clipPath = "none"; } else gsap.fromTo(im, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.14 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: .85, ease: "power3.inOut", overwrite: true });
    clg.className = "clg" + (c.dark ? " dk" : ""); clg.innerHTML = c.logo ? `<img src="assets3/${c.logo}.webp" alt="${c.name}">` : c.name; clg.style.zIndex = z + 1; cst.innerHTML = story(c);
    if (!instant && G) gsap.from(cst.children, { y: 12, opacity: 0, duration: .45, stagger: .06, ease: "power3.out" }); };
  const hov = matchMedia("(hover:hover)").matches;
  lis.forEach((l, i) => { const b = $(".crow", l); b.addEventListener("click", () => show(i)); b.addEventListener("focus", () => show(i)); if (hov) b.addEventListener("pointerenter", () => show(i)); });
  show(0, true); } }

// ---- team: one sharp row of Battle's own photos ----
{ const tr = $("#trw"); if (tr) { const PH = ["poiching", "marcus", "swet", "bhp", "cheanu", "belle"];
  tr.innerHTML = PH.concat(PH).map((p, i) => `<figure><img src="assets3/v9_g_${p}.webp" alt="${i < 6 ? "The Battle team with clients" : ""}" loading="lazy" draggable="false"></figure>`).join(""); ribbon(tr, 1, 30); } }

// ---- connect: one line, a goal, sent on WhatsApp ----
{ const ask = $("#ask"); if (ask) { let goal = ""; const seg = $(".seg", ask), btns = $$("button", seg), thumb = $(".thumb", seg);
  const mv = (b) => { if (!b) { thumb.style.opacity = 0; return; } thumb.style.opacity = 1; thumb.style.width = b.offsetWidth + "px"; thumb.style.transform = `translateX(${b.offsetLeft}px)`; };
  btns.forEach((b) => b.addEventListener("click", () => { goal = goal === b.dataset.g ? "" : b.dataset.g; btns.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.g === goal))); mv(goal ? b : null); }));
  addEventListener("resize", () => mv(btns.find((x) => x.getAttribute("aria-pressed") === "true")));
  ask.addEventListener("submit", (e) => { e.preventDefault(); const v = $("#askin").value.trim(), g = goal ? `My primary goal: ${goal}. ` : "";
    open(WA(`Hi Battle, ${g}${v || "I'd like a 15-minute call about my marketing."}`), "_blank", "noopener"); }); } }

// ---- anything that changes the page height (a row opening, the chat answering) re-measures the scroll scenes ----
if (G && window.ResizeObserver) { let rt, lastH = 0; const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { const h = ["#srows", "#conv", "#clist"].reduce((a, s2) => a + ($(s2) ? $(s2).offsetHeight : 0), 0); if (h !== lastH) { lastH = h; ScrollTrigger.refresh(); } }, 260); });
  ["#srows", "#conv", "#clist"].forEach((s2) => $(s2) && ro.observe($(s2))); }

// ---- motion: headline lines rise once; a few blocks follow; the person walks into the last section ----
if (G) {
  $$(".hx").forEach((h) => { const ln = $$(".ln i", h); gsap.set(ln, { yPercent: 112 }); ScrollTrigger.create({ trigger: h, start: "top 90%", once: true, onEnter: () => gsap.to(ln, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: .1 }) }); });
  ScrollTrigger.batch(".rv", { start: "top 92%", once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: .8, ease: "power3.out", stagger: .08, overwrite: true }) });
  $$(".toyd").forEach((d) => { const sp = +d.dataset.speed || 1, sec = d.closest("section") || d.parentElement;
    gsap.fromTo(d, { y: -60 * sp }, { y: 60 * sp, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(d, { rotation: +d.dataset.rot || 8, duration: 3 + sp, yoyo: true, repeat: -1, ease: "sine.inOut" }); });
  const cnp = $(".cnp"); if (cnp) gsap.from(cnp, { xPercent: 26, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#connect", start: "top 62%", once: true } });
}
})();
