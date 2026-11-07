/* Battle Mind · shared sections for the 21 / 22 / 32 full pages. Copy = Sue's flow (home-v10); data = the deck. */
(() => {
const R = matchMedia("(prefers-reduced-motion: reduce)").matches, q = new URLSearchParams(location.search), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
if (q.has("rec")) document.body.classList.add("rec");
if (R) document.documentElement.classList.add("norise");
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const AR = '<span class="ar" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
const WA = (t) => "https://wa.me/60197707927?text=" + encodeURIComponent(t);

// ---- headline: Sue's line (default) or the current site line; the pill switches, ?h=2 preselects ----
const H = [["Human First.", "Results Always."], ["Win the right battles.", "Scale results."]];
let hi = Math.min(1, Math.max(0, (+q.get("h") || 1) - 1)); const tog = $("#tog");
function setH(i, animate) { hi = i; $$(".h1").forEach((h) => { h.classList.toggle("long", i === 1); h.innerHTML = H[i].map((l) => `<span class="w"><i>${l}</i></span>`).join(""); });
  if (tog) tog.textContent = "Headline · " + (i ? "Win the right battles" : "Human first");
  if (R) gsap.set(".h1 .w i", { y: 0 }); else if (animate) gsap.to(".h1 .w i", { y: 0, duration: .9, stagger: .12, ease: "power4.out" }); }
setH(hi, false); if (tog) tog.onclick = () => setH((hi + 1) % 2, true);
window.BM = { setH, R, AR };

// ---- nav: scrolled state, light/dark by the section under it, phone drawer ----
const nav = $("#nav"), nb = $("#nb"), drawer = $("#drawer");
function tone() { nav.style.pointerEvents = "none"; const el = document.elementFromPoint(innerWidth / 2, 38); nav.style.pointerEvents = ""; const t = el && el.closest("[data-tone]");
  if (t) nav.classList.toggle("light", t.dataset.tone === "light"); nav.classList.toggle("sc", scrollY > 40 && !(t && t.id === "hero")); }
addEventListener("scroll", () => requestAnimationFrame(tone), { passive: true }); addEventListener("resize", tone); tone(); setTimeout(tone, 100);
if (nb) { const open = (on) => { nb.setAttribute("aria-expanded", on); drawer.classList.toggle("open", on); document.body.classList.toggle("lock", on); };
  nb.onclick = () => open(nb.getAttribute("aria-expanded") !== "true"); $$("a", drawer).forEach((a) => a.addEventListener("click", () => open(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); }); }

// ---- 2 clients: 46 logos in their own colours ----
const LOGOS = [["Tesla-logo","Tesla"],["Colgate-logo-v2","Colgate"],["Manchester-United-logo-v2","Manchester United"],["Liverpool-logo-v2","Liverpool FC"],["Good-Year-logo-v2","Goodyear"],["Arla-logo-v2","Arla"],["Maxis-Business-logo","Maxis Business"],["Grab-Express-logo-v2","GrabExpress"],["Tupperware-logo","Tupperware"],["BHP-Petrol-logo","BHPetrol"],["Hovid-logo-v2","Hovid"],["Naturel-logo-v2","Naturel"],["Yaki-Soul-logo-v2","Yaki Soul"],["Write-Edge-logo-v2","Write-Edge"],["Easy-Europe-logo-v2","Easy Europe"],["Citrex-logo-v2","Citrex"],["Dasiy-logo-v2","Daisy"],["Entropia-logo-v2","Entropia"],["Luxe-Living-logo-v2","Luxe Living"],["Softlan-logo-v2","Softlan"],["Puck-logo-v2","Puck"],["Mr-Fish-logo-v2","Mr Fish"],["Oktopurs-logo-v2","Oktopurs"],["JOJO-logo-v2","JOJO"],["Zero-Healthcare-logo","Zero Healthcare"],["glo-logo-v2","glo"],["marcus-logo-client-2","Marcus Teoh"],["SWET-logo","SWET Image"],["Teien-logo","Teien"],["Yosen-logo","Yosen"],["CR8-Melaka-logo-v2","CR8 Melaka"],["Seng-Cars-World-logo","Seng Cars World"],["Campus-Rangers-logo","Campus Rangers"],["Magnet-Experiential-logo","Magnet Experiential"],["BO-Capital-logo","BO Capital"],["Bio-home-logo-v2","Bio-home"],["La-Gourmet-logo","La Gourmet"],["Gemini-Spacecraft-logo","Gemini Spacecraft"],["Fujian-Association-logo","Fujian Association"],["Tiga-ikan-logo-v2","Tiga Ikan"],["UBCT-logo","UBCT"],["KAIA-logo","KAIA"],["Aurea-logo","Aurea"],["sd-labs-logo-v2","SD Labs"]];
{ const rows = $("#lrows"); if (rows) { const per = Math.ceil(LOGOS.length / 3);
  rows.innerHTML = [0, 1, 2].map((r) => { const set = LOGOS.slice(r * per, (r + 1) * per); const cells = set.concat(set).map(([f, n]) => `<div class="lc"><img src="assets3/v10l_${f}.webp" alt="${n}" loading="lazy" draggable="false"></div>`).join("");
    return `<div class="lrow${r === 1 ? " rev" : ""}">${cells}</div>`; }).join(""); } }

// ---- 3 services: Sue's four, the deck's layer copy, two results each; the diagnostic maps a headache to a card ----
const LAYERS = [["Most digital marketing fails long before an ad is clicked: it dies on slow, confusing websites. We build your digital headquarters on zero-bloat, mobile-first infrastructure engineered for fast local conversion.", "Web development · Landing pages · CRO"],
  ["Traffic without purchase intent is just a utility bill. Performance-targeted paid media engineered around aggressive ROAS targets and strict CAC thresholds.", "Meta · Google SEM · TikTok Shop · Shopee & Lazada"],
  ["In saturated feeds, creative strategy is your targeting strategy. UGC storytelling, localised influencer trust and AI production for high-volume, scroll-stopping ads.", "Video · Motion · KOL / UGC · AI-hybrid creative"],
  ["Paid ads buy immediate revenue. We build long-term market dominance: organic search for your highest-margin lines, and automated nurturing for repeat purchases.", "SEO · Backlinks · WhatsApp / CRM nurturing"]];
const RES = { web: [["700+", 700, "", "+", "leads a week after the funnel redesign", "Easy Europe"], ["RM3.8M+", 3.8, "RM", "M+", "peak monthly revenue", "Easy Europe"]],
  ads: [["22×", 22, "", "×", "ROAS, against an industry 8 to 12", "Luxe Living"], ["37%", 37, "", "%", "lower cost per acquisition", "Care Concierge"]],
  content: [["7M+", 7, "", "M+", "organic reach, nationwide", "BHPetrol"], ["3×", 3, "", "×", "more vendor inclusions", "LaLaport BBCC"]],
  organic: [["6+", 6, "", "+", "countries of SEO and SEM coverage", "Luxe Living"], ["No.1", 1, "No.", "", "izakaya in KL, from zero", "Yaki Soul"]] };
const SV = [["web", "Build Your Conversion Engine", "cursor_r"], ["ads", "High-Intent Paid Traffic", "megaphone_r"], ["content", "Scroll-Stopping Creative Content", "play_r"], ["organic", "Organic Brand Authority", "magnifier_r"]];
window.BM.SV = SV;
{ const g = $("#sgrid"); if (g) { const icon = g.dataset.icons || "assets2";
  g.innerHTML = SV.map(([k, t, ic], i) => `<a class="sv" href="#connect" data-k="${k}" data-rise><span class="cap" aria-hidden="true"></span><img class="pc" src="${icon}/${ic}.webp" alt="" loading="lazy" draggable="false"><span class="no">0${i + 1}</span><h3>${t}</h3><p>${LAYERS[i][0]}</p><small>${LAYERS[i][1]}</small>
    <div class="res">${RES[k].map(([f, n, pre, suf, l, who]) => `<div><b data-n="${n}" data-pre="${pre}" data-suf="${suf}">${f}</b><span>${l}</span><small>${who}</small></div>`).join("")}</div><span class="go">Explore<i aria-hidden="true">→</i></span></a>`).join("");
  // results count up the first time a card is hovered or hit
  const light = (card) => { if (card.dataset.lit || R) return; card.dataset.lit = 1; $$(".res b", card).forEach((b) => { const n = +b.dataset.n, o = { v: 0 }, dec = Number.isInteger(n) ? 0 : 1;
    gsap.to(o, { v: n, duration: 1.1, ease: "power3.out", onUpdate: () => (b.textContent = b.dataset.pre + o.v.toFixed(dec) + b.dataset.suf), onComplete: () => (b.textContent = b.dataset.pre + n.toFixed(dec).replace(/\.0$/, "") + b.dataset.suf) }); }); };
  $$(".sv", g).forEach((c) => { c.addEventListener("pointerenter", () => light(c)); c.addEventListener("focus", () => light(c)); });
  window.BM.light = light; } }
const DG = [["A", "We need sales, calls, and qualified inquiries right away.", "Performance Marketing & Customer Acquisition", 1, "Leads, now"],
  ["B", "Our social media is dry, and our ads look like generic AI graphics. People are scrolling past us.", "Creative Performance & Social Proof", 2, "Ads get scrolled past"],
  ["C", "We get website visitors, but nobody converts or fills out the form.", "Web Infrastructure & Conversion Optimization", 0, "Visitors don't convert"],
  ["D", "We spend all our budget getting new customers but rate of returning customers are low.", "CRM Solutions", 3, "Customers don't return"],
  ["E", "We're launching a new brand, or competitors look way more legit than us.", "Brand Authority & Strategy", 2, "We don't look legit yet"]];
{ const dopts = $("#dopts"), dans = $("#dans"); if (dopts) {
  dopts.innerHTML = DG.map(([k, qq, , , ttl], i) => `<button type="button" class="dopt" aria-pressed="false" data-i="${i}"><span class="k">${k}</span><span><b>${ttl}</b><small>“${qq}”</small></span></button>`).join("");
  $$(".dopt", dopts).forEach((b) => b.addEventListener("click", () => { const i = +b.dataset.i, [k, , label, card, ttl] = DG[i], sv = $$("#sgrid .sv")[card];
    $$(".dopt", dopts).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); $$("#sgrid .sv").forEach((x) => x.classList.toggle("hit", x === sv)); window.BM.light && window.BM.light(sv);
    dans.classList.remove("idle"); dans.innerHTML = `<div class="lbl">Your weapon · ${k}</div><h3>${SV[card][1]}</h3><p>${label}. ${ttl}: we start there.</p><a class="cta" href="#connect">Talk about ${ttl.toLowerCase()}${AR}</a>`;
    if (!R) gsap.from(dans.children, { y: 16, opacity: 0, duration: .5, stagger: .06, ease: "power3.out" }); })); } }

// ---- 4 impact: the deck's four numbers in DIN, counting up once ----
{ const ks = $$("#kpi .kp"); if (ks.length && window.gsap) ks.forEach((k, i) => { const v = $("[data-to]", k); if (!v) return; const to = +v.dataset.to, o = { n: 0 }; if (R) return;
  v.textContent = "0"; gsap.to(o, { n: to, duration: 1.6, delay: .15 + i * .1, ease: "power3.out", onUpdate: () => (v.textContent = Math.round(o.n)), scrollTrigger: { trigger: "#kpi", start: "top 88%", once: true } }); }); }

// ---- 5 data: a noisy export, three findings; tangled lines straighten into three moves as the section scrolls into place ----
{ const tab = $("#tab"), plan = $("#plan"), svg = $("#dlinks"), stage = $("#dstage"); if (tab) {
  const Hd = ["Week", "Channel", "Sessions", "Bounce", "CTR", "Leads", "CPL"], rows = [["W1", "Google", "868", "44%", "4.1%", "51", "RM31"], ["W1", "Facebook", "4,342", "71%", "0.9%", "38", "RM48"], ["W1", "Instagram", "2,652", "74%", "1.1%", "26", "RM52"], ["W1", "TikTok", "3,658", "79%", "1.0%", "21", "RM54"], ["W2", "Google", "907", "43%", "4.2%", "57", "RM30"], ["W2", "Facebook", "4,156", "72%", "0.8%", "31", "RM63"]];
  const HL = { "2,3": 1, "4,6": 2, "5,4": 3 };
  tab.innerHTML = `<tr>${Hd.map((h) => `<th>${h}</th>`).join("")}</tr>` + rows.map((r, y) => `<tr>${r.map((c, x) => { const n = HL[y + "," + x]; return `<td${n ? ` class="hl" data-n="${n}"` : ""}>${c}${n ? `<sup>${n}</sup>` : ""}</td>`; }).join("")}</tr>`).join("");
  const MV = [["Enhance web UX", "Fix the leaky bucket: remove what stops visitors buying, before you spend another ringgit on ads.", "Finding 1: 74% of Instagram visitors bounce"], ["Strengthen SEM", "Show up where buyers are already searching, on Google and in AI answers.", "Finding 2: Google leads at RM30, Facebook at RM63"], ["Engaging, trust-building social ads", "Stop the scroll, earn trust, then convert.", "Finding 3: a 0.8% click-through rate"]];
  plan.innerHTML = MV.map(([t, p, s], i) => `<div class="mv" data-n="${i + 1}" data-rise><span class="no">${i + 1}</span><div><h4>${t}</h4><p>${p}</p><small>${s}</small></div></div>`).join("");
  const finds = [1, 2, 3].map((n) => $(`td[data-n="${n}"]`, tab)), moves = $$(".mv", plan);
  const lit = (n) => { moves.forEach((m, i) => m.classList.toggle("lit", i + 1 === n)); finds.forEach((f, i) => f.style.textDecoration = i + 1 === n ? "underline" : ""); };
  moves.forEach((m, i) => { m.addEventListener("pointerenter", () => lit(i + 1)); m.addEventListener("pointerleave", () => lit(0)); });
  // lines: from each finding to its move; at t=0 they wander through random knots (tangled), at t=1 they are clean S-curves
  const rnd = (i) => { const g = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return g - Math.floor(g); };
  let geo = null, t = R ? 1 : 0;
  const measure = () => { const sr = stage.getBoundingClientRect(); geo = finds.map((f, i) => { const a = f.getBoundingClientRect(), b = moves[i].getBoundingClientRect();
    return { x0: a.right - sr.left, y0: a.top + a.height / 2 - sr.top, x1: b.left - sr.left, y1: b.top + b.height / 2 - sr.top }; }); svg.setAttribute("viewBox", `0 0 ${sr.width} ${sr.height}`); draw(); };
  const draw = () => { if (!geo) return; svg.innerHTML = geo.map((g, i) => { const dx = g.x1 - g.x0, pts = []; const K = 7;
    for (let k = 1; k < K; k++) { const u = k / K, sx = g.x0 + dx * u, sy = g.y0 + (g.y1 - g.y0) * (u < .5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u));   // straight: an S between the two
      const tx = g.x0 + dx * (.15 + .7 * rnd(i * 31 + k)), ty = g.y0 + (g.y1 - g.y0) * .5 + (rnd(i * 17 + k * 3) - .5) * 260;                      // tangled: knots
      pts.push([sx * t + tx * (1 - t), sy * t + ty * (1 - t)]); }
    const all = [[g.x0, g.y0], ...pts, [g.x1, g.y1]]; let d = `M${all[0][0]},${all[0][1]}`;   // catmull-rom through the points
    for (let k = 0; k < all.length - 1; k++) { const p0 = all[Math.max(0, k - 1)], p1 = all[k], p2 = all[k + 1], p3 = all[Math.min(all.length - 1, k + 2)];
      d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`; }
    return `<path d="${d}" style="opacity:${.35 + .65 * t}"/>`; }).join(""); };
  addEventListener("resize", measure); setTimeout(measure, 200); if (document.fonts) document.fonts.ready.then(measure);
  if (!R && window.gsap) ScrollTrigger.create({ trigger: stage, start: "top 85%", end: "center 45%", scrub: .6, onUpdate: (s) => { t = gsap.parseEase("power2.inOut")(s.progress); draw(); }, onRefresh: measure }); } }

// ---- 6 cases: the deck's seven, one number each ----
const CS = [{ k: "yakisoul", logo: "v9_logo_yakisoul", name: "Yaki Soul", n: "RM1.8M+", l: "single-outlet monthly ROI, up from RM300K", say: "Seasonal campaigns turned an izakaya off the main street into a KL destination.", tag: "F&B", x: "7,000+ customers a month" },
  { k: "writeedge", logo: "v9_logo_writeedge", name: "Write-Edge", pre: "Almost", n: "4×", l: "growth in under two years", q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge", tag: "Client review", x: "" },
  { k: "bhpetrol", logo: "v9_logo_bhppetrol", name: "BHPetrol", n: "7M+", l: "organic reach, nationwide", say: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed.", tag: "Energy", x: "Campaign videos · KV" },
  { k: "easyeurope", logo: "v9_logo_easyeurope", name: "Easy Europe", n: "700+", l: "leads a week, under RM15 each", say: "Travel revival: from the pandemic to RM3.8M+ peak monthly revenue.", tag: "Travel", x: "65% lower cost per result" },
  { k: "careconcierge", logo: "", name: "Care Concierge", n: "23%", l: "more monthly sales", say: "Senior care beyond Google search: Meta retargeting and a multi-state expansion.", tag: "Senior care", x: "37% lower cost per acquisition" },
  { k: "furniture", logo: "v9_logo_luxeliving", dark: 1, name: "Luxe Living", n: "22×", l: "ROAS, against an industry 8 to 12", say: "Year-round seasonal campaigns, from Shopee and Lazada to Meta.", tag: "Furniture", x: "2-3× revenue growth" },
  { k: "lalaport", logo: "", name: "LaLaport BBCC", n: "3×", l: "more vendor inclusions", say: "One Japanese narrative for a mall of monthly events.", tag: "Retail mall", x: "Social media retainer" }];
{ const cf = $("#cf"); if (cf) { cf.innerHTML = CS.map((c) => `<article class="cc" aria-label="${c.name}: ${c.pre ? c.pre + " " : ""}${c.n} ${c.l}">
    <div class="ph"><img src="assets3/v9c_${c.k}.webp" alt="${c.name}: our work" loading="lazy" draggable="false"><span class="lg${c.dark ? " dk" : ""}">${c.logo ? `<img src="assets3/${c.logo}.webp" alt="${c.name}">` : `<b>${c.name}</b>`}</span></div>
    <div class="bd"><div class="k2"><b>${c.pre ? `<small>${c.pre}</small>` : ""}${c.n}</b><span>${c.l}</span></div>${c.q ? `<blockquote>${c.q}<cite>${c.who}</cite></blockquote>` : `<p class="qp">${c.say}</p>`}
    <div class="ft"><span>${c.tag}</span><em>${c.x}</em></div></div></article>`).join("");
  const cards = $$(".cc", cf), cfn = $("#cfn"), step = () => cards[0].offsetWidth + 18;
  $("#cfp").onclick = () => cf.scrollBy({ left: -step(), behavior: "smooth" }); $("#cfx").onclick = () => cf.scrollBy({ left: step(), behavior: "smooth" });
  cf.addEventListener("scroll", () => { const i = Math.round(cf.scrollLeft / step()); cfn.textContent = `0${Math.min(CS.length, i + 1)} / 0${CS.length}`; }, { passive: true });
  // drag with the mouse too
  let dn = null; cf.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; dn = { x: e.clientX, s: cf.scrollLeft }; });
  addEventListener("pointermove", (e) => { if (dn) cf.scrollLeft = dn.s - (e.clientX - dn.x); }); addEventListener("pointerup", () => (dn = null));
  if (!R && window.gsap) gsap.from(cards, { y: 50, opacity: 0, duration: .9, ease: "power3.out", stagger: .08, scrollTrigger: { trigger: cf, start: "top 88%", once: true } }); } }

// ---- 7 team ribbons ----
{ const PH = ["poiching", "marcus", "swet", "bhp", "cheanu", "belle"]; $$(".gtr").forEach((tr, r) => { const set = r ? PH.slice().reverse() : PH;
  tr.innerHTML = set.concat(set).map((p, i) => `<figure class="gt${i % 3 === 1 ? " rd" : ""}"><img src="assets3/v9_g_${p}.webp" alt="" loading="lazy" draggable="false"></figure>`).join(""); }); }

// ---- 8 the form sends on WhatsApp with the goal chip ----
{ const ask = $("#ask"); if (ask) { let goal = ""; const chips = $$(".chips2 button", ask);
  chips.forEach((b) => b.addEventListener("click", () => { goal = goal === b.dataset.g ? "" : b.dataset.g; chips.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.g === goal))); $("#askin").focus(); }));
  ask.addEventListener("submit", (e) => { e.preventDefault(); const v = $("#askin").value.trim(), g = goal ? `My primary goal: ${goal}. ` : "";
    open(WA(`Hi Battle, ${g}${v || "I'd like a 15-minute call about my marketing."}`), "_blank", "noopener"); }); } }

// ---- reveals + drifting pieces (scroll parallax, pointer lean) ----
if (!R && window.gsap) {
  ScrollTrigger.batch("[data-rise]", { start: "top 92%", once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: .08, overwrite: true }) });
  $$(".drift").forEach((d) => { const sp = +d.dataset.speed || 1, sec = d.closest("section") || d.parentElement;
    gsap.fromTo(d, { y: -60 * sp }, { y: 60 * sp, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(d, { rotation: (+d.dataset.rot || 10) * (sp > 1 ? -1 : 1), duration: 3 + sp, yoyo: true, repeat: -1, ease: "sine.inOut" }); });
} else { $$("[data-rise]").forEach((e) => { e.style.opacity = 1; e.style.transform = "none"; }); }
})();
