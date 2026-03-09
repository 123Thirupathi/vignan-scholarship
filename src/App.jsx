import { useState, useEffect } from "react";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzku3AU1EBBMyC2LhGFyBjCepBZesUkF8i51HniHkiisnSH5c6TjUUkmiBmnr8bWkMo/exec";

const BRANCHES = [
  { name: "ECIL", full: "Vignan School – ECIL", address: "Lotus Colony, Shiva Sai Enclave, ECIL, Telangana 500083", phone: "+91 97019 33455" },
  { name: "Patancheru", full: "Vignan School – Patancheru", address: "Chinna Kanjarla, Doultabad Road, Patancheru, Telangana 502319", phone: "+91 97019 33455" },
  { name: "Medchal", full: "Vignan School – Medchal", address: "Near Santha Bio Tech, Court Road, Medchal, Telangana 501401", phone: "+91 97019 33455" },
  { name: "Ghatkesar", full: "Vignan School – Ghatkesar", address: "Kondapur Village, Ghatkesar Mandal, Ranga Reddy District, Telangana 501301", phone: "+91 97019 33455" },
];

const FAQS = [
  { q: "Is the registration free?", a: "Yes, 100% free. No hidden charges whatsoever." },
  { q: "Who is eligible for the scholarship test?", a: "Students from Grades 3 to 8 are eligible." },
  { q: "Which branches are included?", a: "ECIL, Patancheru, Medchal, and Ghatkesar." },
  { q: "When will results be announced?", a: "Within 5–7 days after the exam (by December 29th)." },
  { q: "How will scholarships be applied?", a: "On tuition fees for the 2026–27 academic year." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", grade: "Grade 7 Parent", text: "My child improved academically and personally. The scholarship made it very affordable!", initials: "PS" },
  { name: "Rajesh Kumar", grade: "Grade 5 Parent", text: "The academic planning is truly impressive. We saved 60% on fees through the scholarship test.", initials: "RK" },
  { name: "Sunitha Reddy", grade: "Grade 6 Parent", text: "Vignan's 49-year legacy speaks for itself. The scholarship was a real blessing for our family.", initials: "SR" },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", parent: "", phone: "", grade: "", branch: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = new Date("2025-12-21T08:00:00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setCd({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

const submit = async () => {
  if (!form.name || !form.phone || !form.grade || !form.branch) {
    alert("Please fill all required fields!");
    return;
  }
  try {
    const params = new URLSearchParams({
      name: form.name,
      parent: form.parent,
      phone: form.phone,
      grade: form.grade,
      branch: form.branch,
    });
    await fetch(SHEET_URL + "?" + params.toString(), {
      method: "GET",
      mode: "no-cors",
    });
  } catch (err) {}
  setSubmitted(true);
};

  const goForm = () => document.getElementById("reg-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        #root { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; }

        :root {
          --blue: #1a56db;
          --dark: #0a1f6e;
          --orange: #f97316;
          --red: #dc2626;
          --yellow: #fbbf24;
          --font: 'Nunito', sans-serif;
          --display: 'Bebas Neue', sans-serif;
        }

        .app { width: 100%; overflow-x: hidden; font-family: var(--font); color: #1a1a2e; background: #f0f4ff; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px; transition: all 0.3s;
        }
        .nav.solid { background: rgba(255,255,255,0.97); box-shadow: 0 2px 20px rgba(0,0,0,0.08); }
        .nav-logo-name { font-weight: 900; font-size: 15px; color: #fff; line-height: 1.2; }
        .nav-logo-sub  { font-size: 11px; color: rgba(255,255,255,0.7); }
        .nav.solid .nav-logo-name { color: #1a1a2e; }
        .nav.solid .nav-logo-sub  { color: #6b7280; }

        /* ── BTNs ── */
        .btn-o {
          background: linear-gradient(135deg, var(--orange), var(--red));
          color: #fff; border: none; border-radius: 50px;
          font-family: var(--font); font-weight: 800; cursor: pointer;
          transition: transform .18s, box-shadow .18s;
          box-shadow: 0 6px 22px rgba(249,115,22,.44);
        }
        .btn-o:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(249,115,22,.6); }
        .btn-b {
          background: linear-gradient(135deg, var(--blue), var(--dark));
          color: #fff; border: none; border-radius: 50px; width: 100%;
          font-family: var(--font); font-weight: 800; cursor: pointer;
          transition: transform .18s, box-shadow .18s;
          box-shadow: 0 6px 20px rgba(26,86,219,.35);
        }
        .btn-b:hover { transform: translateY(-2px); }

        @keyframes pulse {
          0%,100% { box-shadow: 0 6px 22px rgba(249,115,22,.44); }
          50%      { box-shadow: 0 6px 36px rgba(249,115,22,.72), 0 0 0 6px rgba(249,115,22,.14); }
        }
        .pulse { animation: pulse 2.5s ease-in-out infinite; }

        /* ── HERO ── */
        .hero { width: 100%; background: linear-gradient(150deg, var(--dark) 0%, var(--blue) 58%, #1e3a8a 100%); padding-top: 70px; position: relative; overflow: hidden; }

        /* Desktop: side by side */
        .hero-grid {
          width: 100%; max-width: 1300px; margin: 0 auto;
          padding: 56px 60px 52px;
          display: grid; grid-template-columns: 1fr 420px; gap: 56px; align-items: start;
        }

        .hl { font-family: var(--display); font-size: 70px; line-height: 0.95; letter-spacing: 2px; color: #fff; }

        .badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .badge-item { border-radius: 14px; padding: 12px 20px; text-align: center; min-width: 110px; }

        .cd-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .cd-box { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.16); border-radius: 11px; padding: 10px 13px; text-align: center; min-width: 65px; }

        .stats { width: 100%; background: rgba(0,0,0,.22); border-top: 1px solid rgba(255,255,255,.1); display: flex; flex-wrap: wrap; justify-content: space-around; gap: 10px; padding: 22px 20px; }

        /* ── FORM CARD ── */
        .fcard { background: #fff; border-radius: 22px; padding: 38px 28px 28px; box-shadow: 0 28px 80px rgba(0,0,0,.3); position: relative; }
        .fi { width: 100%; padding: 13px 15px; border: 2px solid #dbeafe; border-radius: 10px; font-size: 15px; font-family: var(--font); color: #1a1a2e; background: #fff; outline: none; appearance: none; transition: border-color .2s; margin-bottom: 0; }
        .fi:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,86,219,.12); }

        /* ── SECTIONS ── */
        .sec { width: 100%; padding: 72px 20px; }
        .sec-in { max-width: 1200px; margin: 0 auto; }
        .sec-hd { text-align: center; margin-bottom: 44px; }
        .st { font-family: var(--display); font-size: 44px; letter-spacing: 1px; display: block; }
        .pill-b { display: inline-block; background: #dbeafe; color: var(--blue); border-radius: 50px; padding: 6px 18px; font-size: 13px; font-weight: 700; margin-bottom: 10px; }
        .pill-w { display: inline-block; background: rgba(255,255,255,.16); color: #fff; border-radius: 50px; padding: 6px 18px; font-size: 13px; font-weight: 700; margin-bottom: 12px; }

        /* ── GRIDS ── */
        .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .g5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }

        .card { transition: transform .22s, box-shadow .22s; }
        .card:hover { transform: translateY(-5px); }

        /* ── MOBILE STICKY ── */
        .mob-bar { display: none; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 998; background: #fff; padding: 12px 16px; box-shadow: 0 -4px 18px rgba(0,0,0,.1); border-top: 2px solid #e5edff; }

        /* ════════════════════════════
           TABLET  ≤ 1024px
        ════════════════════════════ */
        @media (max-width: 1024px) {
          .hero-grid { padding: 48px 32px 44px; gap: 36px; grid-template-columns: 1fr 370px; }
          .hl { font-size: 58px; }
          .g5 { grid-template-columns: repeat(3,1fr); }
        }

        /* ════════════════════════════
           MOBILE  ≤ 768px  ← MAIN FIX
        ════════════════════════════ */
        @media (max-width: 768px) {

          /* NAV */
          .nav { padding: 10px 16px; }
          .nav-desk-btn { display: none !important; }

          /* HERO — stack vertically */
          .hero { padding-top: 64px; }
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 28px 16px 36px !important;
            gap: 28px !important;
          }
          .hero-left { text-align: center; }
          .hl { font-size: 42px; }
          .badge-row { justify-content: center; }
          .cd-row { justify-content: center; }
          .hero-ctas { flex-direction: column; align-items: center; gap: 12px !important; }
          .hero-checks { justify-content: center; flex-wrap: wrap; gap: 10px !important; }

          /* FORM — full width, no overlap */
          .fcard { border-radius: 18px; padding: 36px 20px 24px; box-shadow: 0 12px 40px rgba(0,0,0,.18); }

          /* STATS */
          .stats { padding: 16px; gap: 6px; }
          .stats .snum { font-size: 28px !important; }
          .stats .slbl { font-size: 11px !important; }

          /* SECTIONS */
          .sec { padding: 52px 16px; }
          .st { font-size: 30px; }
          .sec-hd { margin-bottom: 32px; }

          /* GRIDS → single column on mobile */
          .g3 { grid-template-columns: 1fr !important; gap: 16px; }
          .g4 { grid-template-columns: 1fr !important; gap: 14px; }
          .g5 { grid-template-columns: repeat(2,1fr) !important; gap: 12px; }

          /* MOBILE STICKY */
          .mob-bar { display: block; }
          footer { padding-bottom: 88px !important; }
        }

        /* ════════════════════════════
           SMALL MOBILE  ≤ 380px
        ════════════════════════════ */
        @media (max-width: 380px) {
          .hl { font-size: 34px; }
          .st { font-size: 26px; }
          .g5 { grid-template-columns: 1fr !important; }
          .badge-item { min-width: 90px; padding: 10px 14px; }
          .cd-box { min-width: 55px; padding: 8px 10px; }
          .fcard { padding: 32px 14px 20px; }
        }
      `}</style>

      <div className="app">

        {/* ── NAV ── */}
        <nav className={"nav" + (scrolled ? " solid" : "")}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, background:"linear-gradient(135deg,#1a56db,#0a1f6e)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🎓</div>
            <div>
              <div className="nav-logo-name">Vignan Schools</div>
              <div className="nav-logo-sub">Hyderabad</div>
            </div>
          </div>
          <button className="btn-o pulse nav-desk-btn" onClick={goForm} style={{ fontSize:13, padding:"10px 22px" }}>
            🆓 Register FREE
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid">

            {/* LEFT */}
            <div className="hero-left">
              <div style={{ marginBottom:16 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(251,191,36,.18)", border:"1px solid rgba(251,191,36,.4)", borderRadius:50, padding:"6px 14px" }}>
                  <span>🗓️</span>
                  <span style={{ fontSize:12, fontWeight:700, color:"#fcd34d" }}>December 21, Sunday · All 4 Branches</span>
                </span>
              </div>

              <h1 className="hl" style={{ marginBottom:16 }}>
                Hyderabad's<br />
                <span style={{ color:"#fbbf24" }}>BIGGEST</span><br />
                Scholarship Test
              </h1>

              <p style={{ fontSize:16, color:"rgba(255,255,255,.88)", lineHeight:1.7, marginBottom:22, maxWidth:500 }}>
                Win from a <strong style={{ color:"#fbbf24" }}>₹2 Crore Scholarship Pool</strong>. Every student scoring 50%+ gets guaranteed fee benefits. Registration is <strong style={{ color:"#4ade80" }}>100% FREE!</strong>
              </p>

              {/* Reward badges */}
              <div className="badge-row">
                {[
                  { s:"95%+", l:"100% Fee Waiver", bg:"linear-gradient(135deg,#f59e0b,#fbbf24)", c:"#1a1a2e" },
                  { s:"85%+", l:"60% Concession",  bg:"linear-gradient(135deg,#10b981,#34d399)", c:"#1a1a2e" },
                  { s:"50%+", l:"Fee Benefits",     bg:"linear-gradient(135deg,#8b5cf6,#a78bfa)", c:"#fff" },
                ].map((r) => (
                  <div key={r.s} className="badge-item" style={{ background:r.bg }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:r.c, lineHeight:1 }}>{r.s}</div>
                    <div style={{ fontSize:11, fontWeight:800, color:r.c, marginTop:2 }}>{r.l}</div>
                  </div>
                ))}
              </div>

              {/* Countdown */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Exam Starts In</div>
                <div className="cd-row">
                  {Object.entries(cd).map(([k,v]) => (
                    <div key={k} className="cd-box">
                      <div style={{ fontFamily:"'Bebas Neue'", fontSize:28, color:"#fbbf24", lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.55)", textTransform:"uppercase", letterSpacing:1 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="hero-ctas" style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
                <button className="btn-o pulse" onClick={goForm} style={{ fontSize:15, padding:"14px 32px" }}>🎓 Register for FREE Now</button>
                <div className="hero-checks" style={{ display:"flex", gap:14, color:"rgba(255,255,255,.8)", fontSize:13 }}>
                  <span><span style={{ color:"#4ade80" }}>✓</span> No exam fee</span>
                  <span><span style={{ color:"#4ade80" }}>✓</span> Instant registration</span>
                </div>
              </div>
            </div>

            {/* RIGHT – FORM */}
            <div id="reg-form" className="fcard">
              <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#f97316,#dc2626)", color:"#fff", borderRadius:50, padding:"6px 20px", fontSize:12, fontWeight:800, whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(249,115,22,.4)" }}>
                🆓 FREE Registration
              </div>

              {!submitted ? (
                <>
                  <h3 style={{ fontFamily:"'Bebas Neue'", fontSize:24, color:"#1a56db", textAlign:"center", marginBottom:4 }}>Register Your Child</h3>
                  <p style={{ fontSize:13, color:"#6b7280", textAlign:"center", marginBottom:18 }}>Scholarship Test · Dec 21, 2025</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    <input className="fi" placeholder="Student's Full Name *" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                    <input className="fi" placeholder="Parent's Name" value={form.parent} onChange={e => setForm({...form, parent:e.target.value})} />
                    <input className="fi" type="tel" placeholder="Mobile Number *" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                    <select className="fi" value={form.grade} onChange={e => setForm({...form, grade:e.target.value})}>
                      <option value="">Select Grade *</option>
                      {["Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"].map(g => <option key={g}>{g}</option>)}
                    </select>
                    <select className="fi" value={form.branch} onChange={e => setForm({...form, branch:e.target.value})}>
                      <option value="">Select Branch *</option>
                      {BRANCHES.map(b => <option key={b.name} value={b.name}>{b.full}</option>)}
                    </select>
                    <button className="btn-b" onClick={submit} style={{ fontSize:15, padding:"14px", marginTop:4 }}>
                      Register Now – It's FREE! 🎓
                    </button>
                  </div>
                  <p style={{ fontSize:11, color:"#9ca3af", textAlign:"center", marginTop:10 }}>🔒 Your information is safe with us.</p>
                </>
              ) : (
                <div style={{ textAlign:"center", padding:"16px 0" }}>
                  <div style={{ fontSize:52, marginBottom:10 }}>🎉</div>
                  <h3 style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:"#1a56db", marginBottom:8 }}>You're Registered!</h3>
                  <p style={{ color:"#4b5563", fontSize:15, lineHeight:1.65 }}>
                    Thank you, <strong>{form.name}</strong>!<br />We'll call you at <strong>{form.phone}</strong>.
                  </p>
                  <div style={{ marginTop:16, background:"#f0f4ff", borderRadius:12, padding:16 }}>
                    <div style={{ fontWeight:800, color:"#1a56db" }}>📅 December 21, 2025</div>
                    <div style={{ color:"#6b7280", fontSize:14, marginTop:4 }}>Branch: {form.branch}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats bar */}
          <div className="stats">
            {[["₹2 Crore","Scholarship Pool"],["4","Campuses"],["49+","Years Legacy"],["FREE","Registration"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div className="snum" style={{ fontFamily:"'Bebas Neue'", fontSize:34, color:"#fbbf24" }}>{n}</div>
                <div className="slbl" style={{ fontSize:12, color:"rgba(255,255,255,.65)" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCHOLARSHIP REWARDS ── */}
        <section className="sec" style={{ background:"#fff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">SCHOLARSHIP STRUCTURE</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Your Score = Your Scholarship</span>
              <p style={{ color:"#6b7280", fontSize:15, maxWidth:440, margin:"10px auto 0", lineHeight:1.65 }}>
                Every student scoring above 50% wins. Higher the score, bigger the reward!
              </p>
            </div>
            <div className="g3">
              {[
                { pct:"95%+", label:"100% Tuition Fee Waiver", desc:"Study completely FREE for 2026-27!", icon:"🥇", grad:"linear-gradient(135deg,#f59e0b,#fbbf24)", tag:"TOP SCORER" },
                { pct:"85%+", label:"60% Fee Concession", desc:"Save significantly on your tuition fees!", icon:"🥈", grad:"linear-gradient(135deg,#1a56db,#3b82f6)", tag:"HIGH SCORER" },
                { pct:"50%+", label:"Guaranteed Fee Benefits", desc:"Every qualifying student gets rewarded.", icon:"🥉", grad:"linear-gradient(135deg,#8b5cf6,#a78bfa)", tag:"ELIGIBLE" },
              ].map(r => (
                <div key={r.pct} className="card" style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 6px 28px rgba(0,0,0,.09)" }}>
                  <div style={{ background:r.grad, padding:"28px 20px", textAlign:"center" }}>
                    <div style={{ fontSize:40 }}>{r.icon}</div>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:56, color:"#fff", lineHeight:1 }}>{r.pct}</div>
                    <div style={{ background:"rgba(255,255,255,.22)", borderRadius:50, padding:"4px 12px", display:"inline-block", fontSize:11, fontWeight:800, color:"#fff", letterSpacing:1.5, marginTop:6 }}>{r.tag}</div>
                  </div>
                  <div style={{ padding:"20px 22px 24px", background:"#fff" }}>
                    <h3 style={{ fontWeight:800, fontSize:16, color:"#1a1a2e", marginBottom:6 }}>{r.label}</h3>
                    <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRANCHES ── */}
        <section className="sec" style={{ background:"#f0f4ff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">4 LOCATIONS</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Choose Your Nearest Campus</span>
            </div>
            <div className="g4">
              {BRANCHES.map(b => (
                <div key={b.name} className="card" style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.07)" }}>
                  <div style={{ background:"linear-gradient(135deg,#1a56db,#0a1f6e)", padding:"24px 16px", textAlign:"center" }}>
                    <div style={{ fontSize:32, marginBottom:6 }}>🏫</div>
                    <h3 style={{ color:"#fff", fontWeight:800, fontSize:13, lineHeight:1.4 }}>{b.full}</h3>
                  </div>
                  <div style={{ padding:16 }}>
                    <div style={{ display:"flex", gap:6, marginBottom:8, alignItems:"flex-start" }}>
                      <span style={{ flexShrink:0, fontSize:13 }}>📍</span>
                      <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.5 }}>{b.address}</p>
                    </div>
                    <div style={{ display:"flex", gap:6, marginBottom:12, alignItems:"center" }}>
                      <span style={{ fontSize:13 }}>📞</span>
                      <a href={"tel:"+b.phone} style={{ fontSize:13, color:"#1a56db", fontWeight:700, textDecoration:"none" }}>{b.phone}</a>
                    </div>
                    <button className="btn-b" onClick={goForm} style={{ fontSize:13, padding:"10px" }}>
                      Register – {b.name} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="sec" style={{ background:"linear-gradient(150deg,#0a1f6e,#1a56db)" }}>
          <div className="sec-in" style={{ textAlign:"center" }}>
            <div className="pill-w">OUR LEGACY</div>
            <span className="st" style={{ color:"#fff", marginBottom:12, display:"block" }}>
              <span style={{ color:"#fbbf24" }}>49+ Years</span> of Excellence
            </span>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.84)", lineHeight:1.7, maxWidth:520, margin:"10px auto 32px" }}>
              Vignan Schools has been shaping young minds for over four decades with academic excellence, modern learning, and character development.
            </p>
            <div className="g5">
              {[
                ["🏆","49+ Years","Trusted Legacy"],
                ["👨‍🏫","Expert Faculty","Digital Classrooms"],
                ["🔬","IIT-JEE / NEET","Foundation Programs"],
                ["🏅","Safe Campus","Disciplined Environment"],
                ["⚽","Sports + Academics","All-Round Growth"],
              ].map(([icon,t,s]) => (
                <div key={t} style={{ background:"rgba(255,255,255,.1)", borderRadius:14, padding:"18px 12px", border:"1px solid rgba(255,255,255,.14)", textAlign:"center" }}>
                  <div style={{ fontSize:26, marginBottom:7 }}>{icon}</div>
                  <div style={{ fontWeight:800, fontSize:13, color:"#fff", marginBottom:3 }}>{t}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.65)" }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="sec" style={{ background:"#fff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">PARENT TESTIMONIALS</div>
              <span className="st" style={{ color:"#1a1a2e" }}>What Parents Say About Vignan</span>
            </div>
            <div className="g3">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="card" style={{ background:"#f8faff", borderRadius:18, padding:24, border:"1px solid #e0eaff", position:"relative", boxShadow:"0 3px 14px rgba(0,0,0,.05)" }}>
                  <div style={{ fontSize:44, color:"#dbeafe", position:"absolute", top:10, right:14, fontFamily:"Georgia", lineHeight:1 }}>"</div>
                  <p style={{ color:"#374151", lineHeight:1.75, fontSize:14, marginBottom:16 }}>{t.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#1a56db,#0a1f6e)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:14, flexShrink:0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:14, color:"#1a1a2e" }}>{t.name}</div>
                      <div style={{ fontSize:12, color:"#9ca3af" }}>{t.grade}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sec" style={{ background:"#f0f4ff" }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div className="sec-hd">
              <div className="pill-b">FAQ</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Frequently Asked Questions</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FAQS.map((f,i) => (
                <div key={i} style={{ background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.05)", border:openFaq===i?"2px solid #1a56db":"2px solid transparent", transition:"border-color .2s" }}>
                  <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                    style={{ width:"100%", padding:"16px 18px", background:"none", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"var(--font)", gap:8 }}>
                    <span style={{ fontWeight:700, fontSize:14, color:"#1a1a2e", textAlign:"left" }}>{f.q}</span>
                    <span style={{ fontSize:22, color:"#1a56db", flexShrink:0, fontWeight:300, display:"inline-block", transform:openFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform .25s ease" }}>+</span>
                  </button>
                  {openFaq===i && (
                    <div style={{ padding:"0 18px 14px", borderTop:"1px solid #e5edff" }}>
                      <div style={{ paddingTop:10, color:"#374151", fontSize:14, lineHeight:1.65 }}>✅ {f.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="sec" style={{ background:"linear-gradient(135deg,#f97316,#dc2626)", textAlign:"center" }}>
          <div style={{ maxWidth:600, margin:"0 auto" }}>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:44, lineHeight:1.1, letterSpacing:1, color:"#fff", marginBottom:14 }}>
              Your Child's Best Opportunity<br />Is Just One Test Away!
            </h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,.9)", lineHeight:1.65, maxWidth:460, margin:"0 auto 28px" }}>
              Join students across Hyderabad competing for ₹2 Crore in scholarships. December 21st — don't miss it!
            </p>
            <button onClick={goForm} className="btn-o"
              style={{ fontSize:18, padding:"16px 44px", background:"#fff", color:"#f97316", boxShadow:"0 10px 34px rgba(0,0,0,.18)" }}>
              🎓 Register for Free Now
            </button>
            <p style={{ marginTop:12, fontSize:12, color:"rgba(255,255,255,.65)" }}>
              Seats are limited · Scholarships based on availability
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background:"#0a1f6e", color:"rgba(255,255,255,.5)", textAlign:"center", padding:"22px 20px", fontSize:13 }}>
          <div style={{ color:"rgba(255,255,255,.88)", fontWeight:800, marginBottom:4, fontSize:14 }}>Vignan Schools Hyderabad</div>
          <div>ECIL · Patancheru · Medchal · Ghatkesar</div>
          <div style={{ marginTop:4 }}>© 2025 Vignan Schools. All rights reserved.</div>
        </footer>

        {/* ── MOBILE STICKY BAR ── */}
        <div className="mob-bar">
          <button className="btn-o pulse" onClick={goForm} style={{ width:"100%", fontSize:15, padding:"14px" }}>
            🎓 Register FREE – Dec 21st Scholarship Test
          </button>
        </div>

      </div>
    </>
  );
}
