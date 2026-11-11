/* Battle Mind · v11 modules: v9.1's own page script (logo keys, services, impact, the analytics scan and wires, the case cover-flow,
   the cursor label, magnetic buttons, tilt), with its cube hero removed and its asset paths pointed at this folder. */
const R = BM.R;
const layers = [["", "Most digital marketing fails long before an ad is clicked: it dies on slow, confusing websites. We build your digital headquarters on zero-bloat, mobile-first infrastructure engineered for fast local conversion.", "Web development · Landing pages · CRO"],
  ["", "Traffic without purchase intent is just a utility bill. Performance-targeted paid media engineered around aggressive ROAS targets and strict CAC thresholds.", "Meta · Google SEM · TikTok Shop · Shopee & Lazada"],
  ["", "In saturated feeds, creative strategy is your targeting strategy. UGC storytelling, localised influencer trust and AI production for high-volume, scroll-stopping ads.", "Video · Motion · KOL / UGC · AI-hybrid creative"],
  ["", "Paid ads buy immediate revenue. We build long-term market dominance: organic search for your highest-margin lines, and automated nurturing for repeat purchases.", "SEO · Backlinks · WhatsApp / CRM nurturing"]];
const TOY = { web: "cursor_r", ads: "megaphone_r", content: "play_r", organic: "magnifier_r" };
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
// ---- 4 impact: the keys rise in as the row arrives and their figures count up once; each key lights its neon glyph ----
if (!R) { const ks = gsap.utils.toArray("#kpi .kp");
  gsap.from(ks, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: "#kpi", start: "top 90%", once: true } });
  ks.forEach((k, i) => { const v = k.querySelector("[data-to]"), o = { n: 0 }, to = +v.dataset.to; v.textContent = "0";
    gsap.to(o, { n: to, duration: 1.6, delay: 0.15 + i * 0.1, ease: "power3.out", onUpdate: () => (v.textContent = Math.round(o.n)), scrollTrigger: { trigger: "#kpi", start: "top 90%", once: true } }); }); }
// the cube's pieces fall in from the burst above and settle at the top of 02; then they bob
if (!R) document.querySelectorAll("#deb img").forEach((im, i) => { const r = +im.dataset.r;
  gsap.fromTo(im, { y: () => -innerHeight * (0.55 + (i % 3) * 0.12), rotation: r * 5, scale: 1.35, opacity: 0 }, { y: 0, rotation: r, scale: 1, opacity: 1, ease: "power2.out",
    scrollTrigger: { trigger: "#s2", start: () => (innerWidth <= 860 ? "top 70%" : "top bottom"), end: () => (innerWidth <= 860 ? "top 10%" : "top 35%"), scrub: 0.6, invalidateOnRefresh: true } });
  gsap.to(im, { yPercent: -9, duration: 2.4 + (i % 3) * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 }); });
else document.querySelectorAll("#deb img").forEach((im) => (im.style.rotate = im.dataset.r + "deg"));
// ---- 2 logos: the clients' own colours (assets3/v10l_*, tool/logos10.py: trimmed, optically sized, on white) on white
// keys; every 3.8 s while on screen (and nobody is pointing at it) one row turns to the next clients ----
const LOGOS = [["Tesla-logo", "Tesla"], ["Colgate-logo-v2", "Colgate"], ["Manchester-United-logo-v2", "Manchester United"], ["Liverpool-logo-v2", "Liverpool FC"], ["Good-Year-logo-v2", "Goodyear"], ["Arla-logo-v2", "Arla"],
  ["Maxis-Business-logo", "Maxis Business"], ["Grab-Express-logo-v2", "GrabExpress"], ["Tupperware-logo", "Tupperware"], ["BHP-Petrol-logo", "BHPetrol"], ["Hovid-logo-v2", "Hovid"], ["Naturel-logo-v2", "Naturel"],
  ["Yaki-Soul-logo-v2", "Yaki Soul"], ["Write-Edge-logo-v2", "Write-Edge"], ["Easy-Europe-logo-v2", "Easy Europe"], ["Citrex-logo-v2", "Citrex"], ["Dasiy-logo-v2", "Daisy"], ["Entropia-logo-v2", "Entropia"],
  ["Luxe-Living-logo-v2", "Luxe Living"], ["Softlan-logo-v2", "Softlan"], ["Puck-logo-v2", "Puck"], ["Mr-Fish-logo-v2", "Mr Fish"], ["Oktopurs-logo-v2", "Oktopurs"], ["JOJO-logo-v2", "JOJO"],
  ["Zero-Healthcare-logo", "Zero Healthcare"], ["glo-logo-v2", "glo"], ["marcus-logo-client-2", "Marcus Teoh"], ["SWET-logo", "SWET Image"], ["Teien-logo", "Teien"], ["Yosen-logo", "Yosen"],
  ["CR8-Melaka-logo-v2", "CR8 Melaka"], ["Seng-Cars-World-logo", "Seng Cars World"], ["Campus-Rangers-logo", "Campus Rangers"], ["Magnet-Experiential-logo", "Magnet Experiential"], ["BO-Capital-logo", "BO Capital"], ["Bio-home-logo-v2", "Bio-home"],
  ["La-Gourmet-logo", "La Gourmet"], ["Gemini-Spacecraft-logo", "Gemini Spacecraft"], ["Fujian-Association-logo", "Fujian Association"], ["Tiga-ikan-logo-v2", "Tiga Ikan"], ["UBCT-logo", "UBCT"], ["KAIA-logo", "KAIA"],
  ["Aurea-logo", "Aurea"], ["sd-labs-logo-v2", "SD Labs"]];
{ const grid = document.getElementById("lgrid"), N = 18, img = ([f, n], eager) => `<img src="assets3/v10l_${f}.webp" alt="${n}" loading="${eager ? "eager" : "lazy"}" draggable="false">`;
  grid.innerHTML = LOGOS.slice(0, N).map((l) => `<div class="lc" role="listitem"><div class="fl"><div class="sd">${img(l)}</div><div class="sd" aria-hidden="true"></div></div></div>`).join("");
  const cells = [...grid.children], state = cells.map(() => ({ deg: 0 })); let next = N, lastRow = -1, hover = false, onScreen = false;
  const turnRow = () => { const c = getComputedStyle(grid).gridTemplateColumns.split(" ").length, shown = cells.filter((el) => el.offsetParent), rows = Math.ceil(shown.length / c); if (!rows) return;
    let r = Math.floor(Math.random() * rows); if (r === lastRow) r = (r + 1) % rows; lastRow = r;
    shown.slice(r * c, r * c + c).forEach((el, j) => { const st = state[cells.indexOf(el)], sides = el.querySelectorAll(".sd"), back = st.deg % 360 === 0 ? sides[1] : sides[0], front = back === sides[1] ? sides[0] : sides[1];
      back.innerHTML = img(LOGOS[next++ % LOGOS.length], true); back.removeAttribute("aria-hidden"); front.setAttribute("aria-hidden", "true");
      const go = () => setTimeout(() => { st.deg += 180; el.querySelector(".fl").style.transform = `rotateY(${st.deg}deg)`; }, j * 70);
      back.querySelector("img").decode().then(go, go); }); };
  if (!R) { new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; }).observe(grid);
    grid.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hover = true; }); grid.addEventListener("pointerleave", () => (hover = false));
    setInterval(() => { if (onScreen && !hover && !document.hidden) turnRow(); }, 3800);
    gsap.from(cells, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: { each: 0.025, from: "start" }, scrollTrigger: { trigger: grid, start: "top 92%", once: true } }); } }
// ---- 3 services: Sue's four titles; the words are v9's growth stack without its "layers" ----
{ const SV = [["web", "Build Your Conversion Engine", "#connect"], ["ads", "High-Intent Paid Traffic", "#connect"], ["content", "Scroll-Stopping Creative Content", "#connect"], ["organic", "Organic Brand Authority", "#connect"]];
  const txt = (p) => p.replace("Layer 1 builds", "We build").replace("Layer 4 builds", "We build");
  document.getElementById("svg4").innerHTML = SV.map(([k, t, h], i) => { const [, p, sv] = layers[i];
    return `<a class="svc" href="#connect" data-k="${k}"><img class="pc" src="assets2/${TOY[k]}.webp" alt="" loading="lazy" draggable="false"><span class="no">0${i + 1}</span><h3>${t}</h3><p>${txt(p)}</p><small>${sv}</small><span class="go">Explore<i aria-hidden="true">→</i></span></a>`; }).join("");
  if (!R) gsap.from("#svg4 .svc", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: "#svg4", start: "top 92%", once: true } }); }
// ---- data made digestible: a noisy export, a scan finds three things, the noise dissolves, the findings wire to the plan ----
{ const H = ["Week", "Channel", "Sessions", "Bounce", "CPC", "CTR", "Leads", "CPL"], rows = [
    // paid rows add up: sessions x CPC / leads = CPL
    ["W1", "Google", "868", "44%", "1.85", "4.1%", "51", "RM31"], ["W1", "Facebook", "4,342", "71%", "0.42", "0.9%", "38", "RM48"], ["W1", "Instagram", "2,652", "74%", "0.51", "1.1%", "26", "RM52"],
    ["W1", "TikTok", "3,658", "79%", "0.31", "1.0%", "21", "RM54"], ["W1", "Shopify", "2,140", "38%", "-", "-", "22", "-"], ["W1", "Organic", "5,882", "68%", "-", "-", "9", "-"],
    ["W2", "Google", "907", "43%", "1.88", "4.2%", "57", "RM30"], ["W2", "Facebook", "4,156", "72%", "0.47", "0.9%", "31", "RM63"], ["W2", "Instagram", "2,581", "73%", "0.53", "1.0%", "24", "RM57"],
    ["W2", "TikTok", "3,349", "81%", "0.33", "0.8%", "18", "RM61"], ["W2", "Shopify", "2,286", "36%", "-", "-", "25", "-"], ["W2", "Organic", "6,104", "66%", "-", "-", "11", "-"]];
  const HL = { "2,3": 1, "6,7": 2, "9,5": 3 }, XM = [4], NOTE = { 1: "74% of Instagram visitors bounce", 2: "Google RM30 vs Facebook RM63", 3: "0.8% CTR: ads don't stop the scroll" }, LEFT = { 2: 1 };
  const LOGO = { Google: "google_g", Facebook: "facebook", Instagram: "instagram", TikTok: "tiktok", Shopify: "shopify_bag", Organic: "organic" };
  tab.innerHTML = `<tr>${H.map((h, i) => `<th${XM.includes(i) ? ' class="xm"' : ""}>${h}</th>`).join("")}</tr>` + rows.map((r, y) => `<tr>${r.map((c, x) => { const n = HL[y + "," + x];
    return `<td data-r="${y}" class="${n ? "hl " : ""}${XM.includes(x) ? "xm" : ""}"${n ? ` data-n="${n}"` : ""}>${n ? `<span>${c}<sup>${n}</sup><em class="nt2${LEFT[n] ? " l" : ""}">${NOTE[n]}</em></span>` : x === 1 ? `<img class="chl" src="assets3/b3p_${LOGO[c]}.svg" alt="" width="14" height="14">${c}` : c}</td>`; }).join("")}</tr>`).join("");
  const stage = document.getElementById("dstage"), svg = document.getElementById("dlinks"), cards = [...plan.querySelectorAll(".s")];
  const finds = [1, 2, 3].map((n) => tab.querySelector(`td[data-n="${n}"]`)), noise = [...tab.querySelectorAll("td:not(.hl)")];
  const NR = rows.length, findRow = finds.map((f) => +f.dataset.r);
  // light a finding, its line and its move together
  const lit = (n) => { cards.forEach((c, i) => c.classList.toggle("lit", i + 1 === n)); finds.forEach((f, i) => f.classList.toggle("lit", i + 1 === n));
    svg.querySelectorAll("path").forEach((p, i) => p.classList.toggle("lit", i + 1 === n)); stage.classList.toggle("lt", !!n); };
  cards.forEach((c, i) => { c.addEventListener("pointerenter", () => lit(i + 1)); c.addEventListener("pointerleave", () => lit(0)); });
  finds.forEach((f, i) => { f.addEventListener("pointerenter", () => lit(i + 1)); f.addEventListener("pointerleave", () => lit(0)); });
  // the wires: from each finding's note to its move, measured once the sheet has settled
  let wired = false;
  const wire = () => { const sb = stage.getBoundingClientRect(), pl = plan.getBoundingClientRect().left; svg.setAttribute("viewBox", `0 0 ${sb.width} ${sb.height}`);
    // a right-hand note that would run into the moves column sits left of its number instead (narrow desktops)
    finds.forEach((f, i) => { if (LEFT[i + 1]) return; const nt = f.querySelector(".nt2"); nt.classList.remove("l"); nt.classList.toggle("l", nt.getBoundingClientRect().right > pl - 40); });
    svg.innerHTML = finds.map((f, i) => { const a = (f.querySelector(".nt2").classList.contains("l") ? f.querySelector("span") : f.querySelector(".nt2")).getBoundingClientRect(), b = cards[i].getBoundingClientRect();
      const x1 = a.right - sb.left + 8, y1 = a.top + a.height / 2 - sb.top, x2 = b.left - sb.left - 10, y2 = b.top + b.height / 2 - sb.top, dx = Math.max(40, (x2 - x1) * 0.5);
      return `<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}"/><circle cx="${x2}" cy="${y2}" r="3.5" opacity="0"/>`; }).join("");
    wired = true; };
  // noise: until the scan reaches a row, its numbers keep flickering. Only cells with digits are ever rewritten
  // (a channel cell holds its logo, and writing its text would wipe the logo)
  let scanF = 0, flick = 0;
  const orig = new Map(noise.filter((td) => /\d/.test(td.textContent)).map((td) => [td, td.textContent]));
  const restore = () => orig.forEach((t, td) => (td.textContent = t));
  const jitter = (t) => t.replace(/\d/g, () => Math.floor(Math.random() * 10));
  const flicker = () => { noise.forEach((td) => { const below = (+td.dataset.r + 1) / NR > scanF; td.classList.toggle("fz", below);
      if (!orig.has(td)) return;
      if (below && Math.random() < 0.35) td.textContent = jitter(orig.get(td)); else if (!below && td.textContent !== orig.get(td)) td.textContent = orig.get(td); }); };
  const hits = (f) => finds.forEach((td, i) => td.classList.toggle("hit", f >= (findRow[i] + 1) / NR));
  if (R) { hits(1); noise.forEach((td) => td.classList.remove("fz")); cards.forEach((c) => (c.style.opacity = 1)); }
  else gsap.matchMedia().add({ desk: "(min-width: 961px)", mob: "(max-width: 960px)" }, (ctx) => {
    if (ctx.conditions.desk) {
      const pathsOf = () => svg.querySelectorAll("path"), dotsOf = () => svg.querySelectorAll("circle");
      const tl = gsap.timeline({ scrollTrigger: { trigger: "#data", start: "top top", end: "+=190%", pin: "#dpin", scrub: 0.6, invalidateOnRefresh: true,
          onRefresh: () => { wired = false; }, onToggle: (s) => { clearInterval(flick); if (s.isActive) flick = setInterval(flicker, 110); else { restore(); noise.forEach((td) => td.classList.toggle("fz", s.progress < 0.5)); } },
        },
        // everything below follows the RENDERED timeline (scrub smoothing lags the scroll), so the scan, the lit findings and the
        // wires always match what is on screen; the wires are measured once the sheet has settled (after its entry)
        onUpdate: function () { const p = this.progress(); scanF = Math.min(1, Math.max(0, (p - 0.08) / 0.32)); hits(scanF); if (!wired && p > 0.2) wire();
          const lp = Math.min(1, Math.max(0, (p - 0.6) / 0.24)); pathsOf().forEach((pt, i) => { const v = Math.min(1, Math.max(0, lp * 3 - i * 0.9)); pt.setAttribute("stroke-dashoffset", (1 - v).toFixed(3)); dotsOf()[i].setAttribute("opacity", v > 0.98 ? 1 : 0); }); } })
        .from("#sheet", { y: 90, rotationX: 24, opacity: 0, duration: 0.1, ease: "power2.out", transformPerspective: 1200 }, 0)
        .fromTo("#scan", { top: "-14%" }, { top: "100%", duration: 0.32, ease: "none" }, 0.08)
        .to(noise, { opacity: 0.08, filter: "blur(1.6px)", duration: 0.12, stagger: { each: 0.0012, from: "random" } }, 0.42)
        .to("#sheet th, #sheet .top", { opacity: 0.18, duration: 0.1 }, 0.42).to("#scan", { opacity: 0, duration: 0.05 }, 0.42)
        .fromTo("#sheet .nt2", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.08, stagger: 0.04 }, 0.5)
        .fromTo(cards, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.12, stagger: 0.075, ease: "power3.out" }, 0.62)
        .fromTo("#dend", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, 0.9).to({}, { duration: 0.001 }, 1);
      const rw = () => { if (wired) wire(); }; addEventListener("resize", rw);
      return () => { removeEventListener("resize", rw); clearInterval(flick); restore(); noise.forEach((td) => td.classList.remove("fz")); };
    }
    // phones: no pin; the export slides in, the scan lights the findings, the moves follow (each says which finding it answers)
    noise.forEach((td) => td.classList.remove("fz"));
    gsap.timeline({ scrollTrigger: { trigger: "#data .dstage", start: "top 75%" } })
      .fromTo("#sheet", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
      .fromTo("#scan", { top: "-14%" }, { top: "100%", duration: 1, ease: "power1.inOut", onUpdate: function () { hits(this.progress()); } }, "-=0.2")
      .to("#scan", { opacity: 0, duration: 0.2 })
      .fromTo(cards, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power3.out" }, "-=0.3");
  }); }
// ---- 07 cases: a cover-flow arc. Real figures from the deck (slides 20-26) and the one client quote we hold (Write-Edge);
// the other clients' quotes are still to come from Battle, and the cards say so ----
const CS = [
    { k: "yakisoul", logo: "v9_logo_yakisoul", name: "Yaki Soul", n: "RM1.8M+", l: "single-outlet monthly ROI, up from RM300K", short: "monthly ROI", fp: "50% 30%", say: "Seasonal campaigns turned an izakaya off the main street into a KL destination.", tag: "F&B", x: "7,000+ customers a month" },
    { k: "writeedge", logo: "v9_logo_writeedge", name: "Write-Edge", pre: "Almost", n: "4×", l: "growth in under two years", alt: "Poi Ching of Write-Edge with the Battle team", short: "growth", fp: "48% 30%", q: "Taking meticulous care on what the organization provides and targeting the right audience has help us to scale almost coming to 4 folds in less than 2 yrs.", who: "Poi Ching, General Manager, Write-Edge", tag: "Client review", x: "" },
    { k: "bhpetrol", logo: "v9_logo_bhppetrol", name: "BHPetrol", n: "7M+", l: "organic reach, nationwide", short: "organic reach", fp: "53% 30%", say: "Creative partner for Malaysia's RON95 subsidy rollout: an early educator in a crowded feed.", tag: "Energy", x: "Campaign videos · KV" },
    { k: "easyeurope", logo: "v9_logo_easyeurope", name: "Easy Europe", n: "700+", l: "leads a week, under RM15 each", short: "leads a week", fp: "54% 30%", say: "Travel revival: from the pandemic to RM3.8M+ peak monthly revenue.", tag: "Travel", x: "65% lower cost per result" },
    { k: "careconcierge", logo: "", name: "Care Concierge", n: "23%", l: "more monthly sales", short: "more sales", fp: "46% 45%", say: "Senior care beyond Google search: Meta retargeting and a multi-state expansion.", tag: "Senior care", x: "37% lower cost per acquisition" },
    { k: "furniture", logo: "v9_logo_luxeliving", dark: 1, name: "Luxe Living", n: "22×", l: "ROAS, against an industry 8 to 12", short: "ROAS", fp: "50% 62%", say: "Year-round seasonal campaigns, from Shopee and Lazada to Meta.", tag: "Furniture", x: "2-3× revenue growth" },
    { k: "lalaport", logo: "", name: "LaLaport BBCC", n: "3×", l: "more vendor inclusions", short: "vendor inclusions", fp: "49% 55%", say: "One Japanese narrative for a mall of monthly events.", tag: "Retail mall", x: "Social media retainer" }];
{   const N = CS.length, cf = document.getElementById("cf"), track = document.getElementById("cft"), cfn = document.getElementById("cfn");
  track.innerHTML = CS.map((c, i) => `<article class="cc2" data-i="${i}" aria-label="${c.name}: ${c.pre ? c.pre + " " : ""}${c.n} ${c.l}">
    <div class="ph"><img src="assets3/v9_case_${c.k}.webp" alt="${c.alt || c.name + ': our work'}" loading="lazy" draggable="false"><span class="lg${c.dark ? " dk" : ""}">${c.logo ? `<img src="assets3/${c.logo}.webp" alt="${c.name}">` : `<b>${c.name}</b>`}</span></div>
    <div class="bd"><div class="k2"><b>${c.pre ? `<small>${c.pre}</small>` : ""}${c.n}</b><span>${c.l}</span></div>
      ${c.q ? `<blockquote>${c.q}<cite>${c.who}</cite></blockquote>` : `<p class="qp">${c.say}<br><small>Client quote to come</small></p>`}
      <div class="ft"><span>${c.tag}</span><em>${c.x}</em></div></div></article>`).join("");
  const cards = [...track.children]; let f = 0, auto = null, hover = false, seen = false, drag = null;
  const wrap = (d) => ((d % N) + N + N / 2) % N - N / 2;           // shortest signed distance on the loop
  const lay = () => { const w = cards[0].offsetWidth, sp = Math.min(w * 0.74, innerWidth * 0.2 + 40);
    cards.forEach((c, i) => { const d = wrap(i - f), a = Math.abs(d);
      c.style.transform = `translateX(${d * sp}px) translateZ(${-a * 170}px) rotateY(${Math.max(-50, Math.min(50, -d * 24))}deg) scale(${1 - Math.min(a, 3) * 0.04})`;
      c.style.zIndex = String(100 - Math.round(a * 10)); c.style.opacity = a > 2.6 ? Math.max(0, 1 - (a - 2.6) * 1.6).toFixed(3) : "1"; c.style.setProperty("--dim", Math.min(0.55, a * 0.2).toFixed(3)); });
    const k = ((Math.round(f) % N) + N) % N; cfn.textContent = `${String(k + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`; };
  const to = (t, d = 0.9) => gsap.to({ v: f }, { v: t, duration: R ? 0 : d, ease: "power3.out", onUpdate: function () { f = this.targets()[0].v; lay(); } });
  let tw = null; const go = (t) => { if (tw) tw.kill(); tw = to(t); };
  const tick = () => { if (!hover && seen && !drag) go(Math.round(f) + 1); };
  document.getElementById("cfx").addEventListener("click", () => go(Math.round(f) + 1)); document.getElementById("cfp").addEventListener("click", () => go(Math.round(f) - 1));
  cf.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") go(Math.round(f) + 1); if (e.key === "ArrowLeft") go(Math.round(f) - 1); });
  cards.forEach((c, i) => c.addEventListener("click", () => { if (drag && drag.moved) return; const d = wrap(i - f); if (Math.abs(d) > 0.5) go(Math.round(f + d)); }));
  cf.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hover = true; }); cf.addEventListener("pointerleave", () => { hover = false; });
  cf.addEventListener("pointerdown", (e) => { if (e.target.closest("button")) return; if (tw) tw.kill(); drag = { x: e.clientX, f0: f, moved: false }; cf.setPointerCapture(e.pointerId); });
  cf.addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) drag.moved = true; f = drag.f0 - dx / (cards[0].offsetWidth * 0.8); lay(); });
  const up = () => { if (!drag) return; const m = drag.moved; go(Math.round(f)); setTimeout(() => { drag = null; }, m ? 50 : 0); };
  cf.addEventListener("pointerup", up); cf.addEventListener("pointercancel", up);
  addEventListener("resize", lay); lay(); cf.lay = lay;
  // the arc fans out as it arrives, then moves on every 4.5 s while it is on screen
  new IntersectionObserver((es) => { const on = es[es.length - 1].isIntersecting; if (on && !seen) { seen = true; if (!R) { const f0 = f; f = f0 - 2.5; lay(); go(f0); } }
    clearInterval(auto); if (on && !R) auto = setInterval(tick, 4500); }, { threshold: 0.35 }).observe(cf); }
if (!R) document.querySelectorAll("#connect .ko").forEach((el) => gsap.to(el, { y: () => -90 * +el.dataset.d, ease: "none", scrollTrigger: { trigger: "#connect", start: "top bottom", end: "bottom top", scrub: true } }));
if (!R && window.Lenis) { const lenis = (window.lenis = new Lenis({ lerp: 0.09 })); lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
document.querySelectorAll(".ask .chips2 button").forEach((b) => b.addEventListener("click", () => { const i = document.getElementById("askin"); i.value = b.dataset.q; i.focus(); }));
// sending opens WhatsApp with the message, ready to send to Battle's number (the one on the site); nothing is sent for them
document.getElementById("ask").addEventListener("submit", (e) => { e.preventDefault(); const v = document.getElementById("askin").value.trim();
  open("https://wa.me/60197707927?text=" + encodeURIComponent(v ? `Hi Battle, ${v}` : "Hi Battle, I'd like a 15-minute call about my marketing."), "_blank", "noopener"); });
// ---- touch and feel: a cursor label, magnetic buttons, cards that tilt toward the pointer, headings that rise line by line ----
const CUR = (window.CUR = (() => {
  const el = document.getElementById("cur"), tx = document.getElementById("curT");
  if (R || !fine) return { on() {}, off() {} };
  const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" }), yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
  addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  const api = { on(t) { tx.textContent = t; el.classList.add("on"); }, off() { el.classList.remove("on"); } };
  document.addEventListener("pointerover", (e) => { const n = e.target.closest("[data-cur]"); if (n) api.on(n.dataset.cur); });
  document.addEventListener("pointerout", (e) => { const n = e.target.closest("[data-cur]"); if (n && !n.contains(e.relatedTarget)) api.off(); });
  return api;
})());
document.querySelectorAll(".plan .s").forEach((el) => el.setAttribute("data-tilt", ""));
if (!R && fine) {
  document.querySelectorAll("[data-mag]").forEach((el) => {
    const q = (t, p) => gsap.quickTo(t, p, { duration: 0.6, ease: "power3" }), xTo = q(el, "x"), yTo = q(el, "y"), ar = el.querySelector(".ar"), ax = ar && q(ar, "x"), ay = ar && q(ar, "y");
    el.addEventListener("pointermove", (e) => { const b = el.getBoundingClientRect(), dx = e.clientX - b.left - b.width / 2, dy = e.clientY - b.top - b.height / 2; xTo(dx * 0.22); yTo(dy * 0.3); if (ar) { ax(dx * 0.12); ay(dy * 0.16); } });
    el.addEventListener("pointerleave", () => { xTo(0); yTo(0); if (ar) { ax(0); ay(0); } }); });
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" }), ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" }); gsap.set(el, { transformPerspective: 900 });
    el.addEventListener("pointermove", (e) => { const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height; ry((x - 0.5) * 9); rx(-(y - 0.5) * 9); el.style.setProperty("--mx", x * 100 + "%"); el.style.setProperty("--my", y * 100 + "%"); });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); }); });
}
if (!R) document.fonts.ready.then(() => document.querySelectorAll("h2.h2").forEach((h) => { const st = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "ln" });
  gsap.from(st.lines, { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: h, start: "top 88%" } }); }));
if (!R) document.querySelectorAll("[data-float]").forEach((el, i) => gsap.to(el, { y: -14, rotation: i % 2 ? 2 : -2, duration: 3 + (i % 3) * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" }));
