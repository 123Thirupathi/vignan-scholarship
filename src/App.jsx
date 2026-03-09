import { useState, useEffect } from "react";
import './index.css';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzku3AU1EBBMyC2LhGFyBjCepBZesUkF8i51HniHkiisnSH5c6TjUUkmiBmnr8bWkMo/exec";
const BRANCHES = [
  { name: "ECIL", full: "Vignan School – ECIL", address: "Plot No. 12, ECIL Cross Roads, Hyderabad – 500062", phone: "+91 98765 43210" },
  { name: "Patancheru", full: "Vignan School – Patancheru", address: "Survey No. 45, Patancheru, Sangareddy – 502319", phone: "+91 98765 43211" },
  { name: "Medchal", full: "Vignan School – Medchal", address: "NH-44, Medchal Road, Medchal – 501401", phone: "+91 98765 43212" },
  { name: "Ghatkesar", full: "Vignan School – Ghatkesar", address: "Beside RTC Bus Stand, Ghatkesar – 501301", phone: "+91 98765 43213" },
];

const FAQS = [
  { q: "Is the registration free?", a: "Yes, 100% free. No hidden charges whatsoever." },
  { q: "Who is eligible for the scholarship test?", a: "Students from Grades 3 to 8 are eligible." },
  { q: "Which branches are included?", a: "ECIL, Patancheru, Medchal, and Ghatkesar." },
  { q: "When will results be announced?", a: "Within 5–7 days after the exam (by December 29th)." },
  { q: "How will scholarships be applied?", a: "On tuition fees for the 2026–27 academic year." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", grade: "Grade 7 Parent", text: "My child improved academically and personally. Vignan's disciplined environment and caring teachers made a huge difference. The scholarship made it very affordable!", initials: "PS" },
  { name: "Rajesh Kumar", grade: "Grade 5 Parent", text: "The academic planning and attention to each child is truly impressive. We saved 60% on fees through the scholarship test.", initials: "RK" },
  { name: "Sunitha Reddy", grade: "Grade 6 Parent", text: "Vignan's 49-year legacy speaks for itself. The scholarship opportunity was a real blessing for our family.", initials: "SR" },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", parent: "", phone: "", grade: "", branch: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
      const diff = target.getTime() - new Date().getTime();
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
  setLoading(true);
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
    setSubmitted(true);
  } catch (err) {
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        #root { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
        .app { width: 100%; overflow-x: hidden; font-family: 'Nunito', sans-serif; color: #1a1a2e; background: #f0f4ff; }
        .nav { position: fixed; top: 0; left: 0; width: 100%; z-index: 999; display: flex; align-items: center; justify-content: space-between; padding: 12px 40px; transition: all 0.3s; }
        .nav.solid { background: rgba(255,255,255,0.97); box-shadow: 0 2px 20px rgba(0,0,0,0.08); backdrop-filter: blur(12px); }
        .hero { width: 100%; background: linear-gradient(150deg, #0a1f6e 0%, #1a56db 58%, #1e3a8a 100%); padding-top: 80px; }
        .hero-grid { width: 100%; max-width: 1300px; margin: 0 auto; padding: 60px 60px 56px; display: grid; grid-template-columns: 1fr 430px; gap: 60px; align-items: start; }
        .hl { font-family: 'Bebas Neue', sans-serif; font-size: 72px; line-height: 0.95; letter-spacing: 2px; color: #fff; }
        .stats { width: 100%; background: rgba(0,0,0,0.22); border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-wrap: wrap; justify-content: space-around; gap: 12px; padding: 24px 60px; }
        .fcard { width: 100%; background: #fff; border-radius: 22px; padding: 38px 30px 30px; box-shadow: 0 28px 80px rgba(0,0,0,0.3); position: relative; }
        .fi { width: 100%; padding: 13px 16px; border: 2px solid #dbeafe; border-radius: 10px; font-size: 15px; font-family: 'Nunito', sans-serif; color: #1a1a2e; background: #fff; outline: none; appearance: none; -webkit-appearance: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .fi:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.12); }
        .btn-o { background: linear-gradient(135deg,#f97316,#dc2626); color: #fff; border: none; border-radius: 50px; font-family: 'Nunito',sans-serif; font-weight: 800; cursor: pointer; transition: transform 0.18s, box-shadow 0.18s; box-shadow: 0 6px 22px rgba(249,115,22,0.44); }
        .btn-o:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(249,115,22,0.6); }
        .btn-o:active { transform: scale(0.97); }
        .btn-b { background: linear-gradient(135deg,#1a56db,#1e3a8a); color: #fff; border: none; border-radius: 50px; width: 100%; font-family: 'Nunito',sans-serif; font-weight: 800; cursor: pointer; transition: transform 0.18s, box-shadow 0.18s; box-shadow: 0 6px 20px rgba(26,86,219,0.35); }
        .btn-b:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(26,86,219,0.52); }
        .btn-b:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .sec { width: 100%; padding: 80px 60px; }
        .sec-in { max-width: 1200px; margin: 0 auto; }
        .sec-hd { text-align: center; margin-bottom: 52px; }
        .st { font-family: 'Bebas Neue',sans-serif; font-size: 48px; letter-spacing: 1px; display: block; }
        .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
        .g5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 18px; }
        .pill-b { display:inline-block; background:#dbeafe; color:#1a56db; border-radius:50px; padding:6px 18px; font-size:13px; font-weight:700; margin-bottom:12px; }
        .pill-w { display:inline-block; background:rgba(255,255,255,0.16); color:#fff; border-radius:50px; padding:6px 18px; font-size:13px; font-weight:700; margin-bottom:14px; }
        .card { transition: transform 0.22s, box-shadow 0.22s; }
        .card:hover { transform: translateY(-5px); }
        @keyframes pulse { 0%,100% { box-shadow: 0 6px 22px rgba(249,115,22,0.44); } 50% { box-shadow: 0 6px 36px rgba(249,115,22,0.72), 0 0 0 6px rgba(249,115,22,0.14); } }
        .pulse { animation: pulse 2.5s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 8px; vertical-align: middle; }
        .brow { display:flex; gap:12px; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .brow::-webkit-scrollbar { display:none; }
        .crow { display:flex; gap:10px; }
        .mob-bar { display:none; position:fixed; bottom:0; left:0; width:100%; z-index:998; background:#fff; padding:12px 16px; box-shadow:0 -4px 18px rgba(0,0,0,0.1); border-top:2px solid #e5edff; }
        @media (max-width: 1200px) { .hero-grid { padding: 56px 40px 52px; gap: 48px; grid-template-columns: 1fr 400px; } .stats { padding: 22px 40px; } .sec { padding: 72px 40px; } .hl { font-size: 64px; } }
        @media (max-width: 1024px) { .hero-grid { padding: 48px 32px 44px; gap: 36px; grid-template-columns: 1fr 370px; } .stats { padding: 20px 32px; } .sec { padding: 64px 32px; } .hl { font-size: 56px; } .g5 { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 860px) {
          .nav { padding: 12px 20px; } .nav-desk { display:none !important; }
          .hero-grid { grid-template-columns: 1fr !important; padding: 36px 20px 44px; gap: 32px; }
          .hero-left { text-align: center; } .hl { font-size: 48px; } .hero-p { max-width: 100% !important; }
          .brow { justify-content: center; } .crow { justify-content: center; }
          .ctas-desk { display:none !important; } .cta-mob { display:block !important; }
          .stats { padding: 18px 20px; gap: 8px; } .stats .snum { font-size: 28px !important; } .stats .slbl { font-size: 11px !important; }
          .sec { padding: 52px 20px; } .st { font-size: 32px; } .sec-hd { margin-bottom: 36px; }
          .g3 { grid-template-columns: 1fr; gap: 18px; } .g4 { grid-template-columns: repeat(2,1fr); gap: 16px; } .g5 { grid-template-columns: repeat(2,1fr); gap: 14px; }
          .mob-bar { display:block; } footer { padding-bottom: 84px !important; }
        }
        @media (max-width: 480px) { .hl { font-size: 38px; } .g4 { grid-template-columns: 1fr; } .cta-big { font-size: 16px !important; padding: 16px 28px !important; } }
        .cta-mob { display: none; }
      `}</style>

      <div className="app">

        {/* NAV */}
        <nav className={"nav" + (scrolled ? " solid" : "")}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, background:"linear-gradient(135deg,#1a56db,#1e3a8a)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🎓</div>
            <div>
              <div style={{ fontWeight:900, fontSize:15, color:scrolled?"#1a1a2e":"#fff", lineHeight:1.2 }}>Vignan Schools</div>
              <div style={{ fontSize:11, color:scrolled?"#6b7280":"rgba(255,255,255,0.7)" }}>Hyderabad</div>
            </div>
          </div>
          <button className="btn-o pulse nav-desk" onClick={goForm} style={{ fontSize:14, padding:"11px 28px" }}>
            🆓 Register FREE Now
          </button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", top:"-5%", right:"8%", pointerEvents:"none" }} />
          <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)", bottom:"15%", left:"3%", pointerEvents:"none" }} />

          <div className="hero-grid">
            {/* LEFT */}
            <div className="hero-left">
              <div style={{ marginBottom:18 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(251,191,36,0.18)", border:"1px solid rgba(251,191,36,0.4)", borderRadius:50, padding:"6px 16px" }}>
                  <span>🗓️</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"#fcd34d" }}>December 21, Sunday · All 4 Branches</span>
                </span>
              </div>
              <h1 className="hl" style={{ marginBottom:18 }}>
                Hyderabad's<br />
                <span style={{ color:"#fbbf24" }}>BIGGEST</span><br />
                Scholarship Test
              </h1>
              <p className="hero-p" style={{ fontSize:17, color:"rgba(255,255,255,0.88)", lineHeight:1.7, marginBottom:26, maxWidth:500 }}>
                Win from a <strong style={{ color:"#fbbf24" }}>₹2 Crore Scholarship Pool</strong>. Every student scoring 50%+ gets guaranteed fee benefits. Registration is 100% FREE!
              </p>
              <div className="brow" style={{ marginBottom:26 }}>
                {[
                  { s:"95%+", l:"100% Fee Waiver", bg:"linear-gradient(135deg,#f59e0b,#fbbf24)", c:"#1a1a2e" },
                  { s:"85%+", l:"60% Concession",  bg:"linear-gradient(135deg,#10b981,#34d399)", c:"#1a1a2e" },
                  { s:"50%+", l:"Fee Benefits",     bg:"linear-gradient(135deg,#8b5cf6,#a78bfa)", c:"#fff" },
                ].map((r) => (
                  <div key={r.s} style={{ background:r.bg, borderRadius:14, padding:"12px 20px", textAlign:"center", flexShrink:0, minWidth:120 }}>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:r.c, lineHeight:1 }}>{r.s}</div>
                    <div style={{ fontSize:11, fontWeight:800, color:r.c, marginTop:2 }}>{r.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Exam Starts In</div>
                <div className="crow">
                  {Object.entries(cd).map(([k,v]) => (
                    <div key={k} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.16)", borderRadius:11, padding:"10px 13px", textAlign:"center", minWidth:68 }}>
                      <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:"#fbbf24", lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:1 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ctas-desk" style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
                <button className="btn-o pulse" onClick={goForm} style={{ fontSize:16, padding:"15px 36px" }}>🎓 Register for FREE Now</button>
                <div style={{ display:"flex", gap:16, color:"rgba(255,255,255,0.8)", fontSize:14 }}>
                  <span><span style={{ color:"#4ade80" }}>✓</span> No exam fee</span>
                  <span><span style={{ color:"#4ade80" }}>✓</span> Instant registration</span>
                </div>
              </div>
              <button className="btn-o cta-mob" onClick={goForm} style={{ width:"100%", fontSize:17, padding:"16px", marginTop:6 }}>
                🎓 Register for FREE Now
              </button>
            </div>

            {/* RIGHT – FORM */}
            <div id="reg-form" className="fcard">
              <div style={{ position:"absolute", top:-15, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#f97316,#dc2626)", color:"#fff", borderRadius:50, padding:"7px 22px", fontSize:13, fontWeight:800, whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(249,115,22,0.4)" }}>
                🆓 FREE Registration
              </div>
              {!submitted ? (
                <>
                  <h3 style={{ fontFamily:"'Bebas Neue'", fontSize:26, color:"#1a56db", textAlign:"center", marginBottom:4 }}>Register Your Child</h3>
                  <p style={{ fontSize:13, color:"#6b7280", textAlign:"center", marginBottom:20 }}>Scholarship Test · Dec 21, 2025</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <input className="fi" placeholder="Student's Full Name *" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
                    <input className="fi" placeholder="Parent's Name" value={form.parent} onChange={(e)=>setForm({...form,parent:e.target.value})} />
                    <input className="fi" type="tel" placeholder="Mobile Number *" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
                    <select className="fi" value={form.grade} onChange={(e)=>setForm({...form,grade:e.target.value})}>
                      <option value="">Select Grade *</option>
                      {["Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"].map((g)=><option key={g} value={g}>{g}</option>)}
                    </select>
                    <select className="fi" value={form.branch} onChange={(e)=>setForm({...form,branch:e.target.value})}>
                      <option value="">Select Branch *</option>
                      {BRANCHES.map((b)=><option key={b.name} value={b.name}>{b.full}</option>)}
                    </select>
                    <button className="btn-b" onClick={submit} disabled={loading} style={{ fontSize:16, padding:"15px" }}>
                      {loading ? <><span className="spinner"></span>Submitting...</> : "Register Now – It's FREE! 🎓"}
                    </button>
                  </div>
                  <p style={{ fontSize:11, color:"#9ca3af", textAlign:"center", marginTop:10 }}>🔒 Your information is safe with us.</p>
                </>
              ) : (
                <div style={{ textAlign:"center", padding:"12px 0" }}>
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
            {[["₹2 Crore","Scholarship Pool"],["4","Campuses"],["49+","Years Legacy"],["FREE","Registration"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div className="snum" style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:"#fbbf24" }}>{n}</div>
                <div className="slbl" style={{ fontSize:13, color:"rgba(255,255,255,0.65)" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SCHOLARSHIP REWARDS */}
        <section className="sec" style={{ background:"#fff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">SCHOLARSHIP STRUCTURE</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Your Score = Your Scholarship</span>
              <p style={{ color:"#6b7280", fontSize:16, maxWidth:460, margin:"10px auto 0", lineHeight:1.65 }}>Every student scoring above 50% wins. Higher the score, bigger the reward!</p>
            </div>
            <div className="g3">
              {[
                { pct:"95%+", label:"100% Tuition Fee Waiver", desc:"Study completely FREE for 2026-27!", icon:"🥇", grad:"linear-gradient(135deg,#f59e0b,#fbbf24)", tag:"TOP SCORER" },
                { pct:"85%+", label:"60% Fee Concession", desc:"Save significantly on your tuition fees!", icon:"🥈", grad:"linear-gradient(135deg,#1a56db,#3b82f6)", tag:"HIGH SCORER" },
                { pct:"50%+", label:"Guaranteed Fee Benefits", desc:"Every qualifying student gets rewarded.", icon:"🥉", grad:"linear-gradient(135deg,#8b5cf6,#a78bfa)", tag:"ELIGIBLE" },
              ].map((r)=>(
                <div key={r.pct} className="card" style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 6px 28px rgba(0,0,0,0.09)" }}>
                  <div style={{ background:r.grad, padding:"32px 24px", textAlign:"center" }}>
                    <div style={{ fontSize:42 }}>{r.icon}</div>
                    <div style={{ fontFamily:"'Bebas Neue'", fontSize:60, color:"#fff", lineHeight:1 }}>{r.pct}</div>
                    <div style={{ background:"rgba(255,255,255,0.22)", borderRadius:50, padding:"4px 14px", display:"inline-block", fontSize:11, fontWeight:800, color:"#fff", letterSpacing:1.5, marginTop:6 }}>{r.tag}</div>
                  </div>
                  <div style={{ padding:"22px 24px 26px", background:"#fff" }}>
                    <h3 style={{ fontWeight:800, fontSize:17, color:"#1a1a2e", marginBottom:6 }}>{r.label}</h3>
                    <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.6 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANCHES */}
        <section className="sec" style={{ background:"#f0f4ff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">4 LOCATIONS</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Choose Your Nearest Campus</span>
            </div>
            <div className="g4">
              {BRANCHES.map((b)=>(
                <div key={b.name} className="card" style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.07)" }}>
                  <div style={{ background:"linear-gradient(135deg,#1a56db,#0a1f6e)", padding:"26px 18px", textAlign:"center" }}>
                    <div style={{ fontSize:36, marginBottom:6 }}>🏫</div>
                    <h3 style={{ color:"#fff", fontWeight:800, fontSize:14, lineHeight:1.4 }}>{b.full}</h3>
                  </div>
                  <div style={{ padding:18 }}>
                    <div style={{ display:"flex", gap:7, marginBottom:8, alignItems:"flex-start" }}>
                      <span style={{ flexShrink:0 }}>📍</span>
                      <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.5 }}>{b.address}</p>
                    </div>
                    <div style={{ display:"flex", gap:7, marginBottom:14, alignItems:"center" }}>
                      <span>📞</span>
                      <a href={"tel:"+b.phone} style={{ fontSize:14, color:"#1a56db", fontWeight:700, textDecoration:"none" }}>{b.phone}</a>
                    </div>
                    <button className="btn-b" onClick={goForm} style={{ fontSize:13, padding:"11px" }}>Register – {b.name} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="sec" style={{ background:"linear-gradient(150deg,#0a1f6e,#1a56db)" }}>
          <div className="sec-in" style={{ textAlign:"center" }}>
            <div className="pill-w">OUR LEGACY</div>
            <span className="st" style={{ color:"#fff", marginBottom:14 }}>
              <span style={{ color:"#fbbf24" }}>49+ Years</span> of Excellence
            </span>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.84)", lineHeight:1.7, maxWidth:560, margin:"12px auto 36px" }}>
              Vignan Schools has been shaping young minds for over four decades with a strong focus on academic excellence, modern learning, and character development.
            </p>
            <div className="g5">
              {[
                ["🏆","49+ Years","Trusted Legacy"],
                ["👨‍🏫","Expert Faculty","Digital Classrooms"],
                ["🔬","IIT-JEE / NEET","Foundation Programs"],
                ["🏅","Safe Campus","Disciplined Environment"],
                ["⚽","Sports + Academics","All-Round Growth"],
              ].map(([icon,t,s])=>(
                <div key={t} style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"20px 14px", border:"1px solid rgba(255,255,255,0.14)", textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontWeight:800, fontSize:14, color:"#fff", marginBottom:4 }}>{t}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)" }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="sec" style={{ background:"#fff" }}>
          <div className="sec-in">
            <div className="sec-hd">
              <div className="pill-b">PARENT TESTIMONIALS</div>
              <span className="st" style={{ color:"#1a1a2e" }}>What Parents Say About Vignan</span>
            </div>
            <div className="g3">
              {TESTIMONIALS.map((t)=>(
                <div key={t.name} className="card" style={{ background:"#f8faff", borderRadius:18, padding:26, border:"1px solid #e0eaff", position:"relative", boxShadow:"0 3px 14px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize:48, color:"#dbeafe", position:"absolute", top:12, right:16, fontFamily:"Georgia", lineHeight:1 }}>"</div>
                  <p style={{ color:"#374151", lineHeight:1.75, fontSize:15, marginBottom:18 }}>{t.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#1a56db,#1e3a8a)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:900, fontSize:15, flexShrink:0 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:15, color:"#1a1a2e" }}>{t.name}</div>
                      <div style={{ fontSize:12, color:"#9ca3af" }}>{t.grade}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec" style={{ background:"#f0f4ff" }}>
          <div style={{ maxWidth:700, margin:"0 auto" }}>
            <div className="sec-hd">
              <div className="pill-b">FAQ</div>
              <span className="st" style={{ color:"#1a1a2e" }}>Frequently Asked Questions</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FAQS.map((f,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:openFaq===i?"2px solid #1a56db":"2px solid transparent", transition:"border-color 0.2s" }}>
                  <button onClick={()=>setOpenFaq(openFaq===i ? null : i)} style={{ width:"100%", padding:"17px 20px", background:"none", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontFamily:"'Nunito',sans-serif", gap:10 }}>
                    <span style={{ fontWeight:700, fontSize:15, color:"#1a1a2e", textAlign:"left" }}>{f.q}</span>
                    <span style={{ fontSize:22, color:"#1a56db", flexShrink:0, fontWeight:300, display:"inline-block", transform:openFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform 0.25s ease" }}>+</span>
                  </button>
                  {openFaq===i && (
                    <div style={{ padding:"0 20px 16px", borderTop:"1px solid #e5edff" }}>
                      <div style={{ paddingTop:12, color:"#374151", fontSize:15, lineHeight:1.65 }}>✅ {f.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="sec" style={{ background:"linear-gradient(135deg,#f97316,#dc2626)", textAlign:"center" }}>
          <div style={{ maxWidth:640, margin:"0 auto" }}>
            <h2 style={{ fontFamily:"'Bebas Neue'", fontSize:52, lineHeight:1.1, letterSpacing:1, color:"#fff", marginBottom:14 }}>
              Your Child's Best Opportunity<br />Is Just One Test Away!
            </h2>
            <p style={{ fontSize:17, color:"rgba(255,255,255,0.9)", lineHeight:1.65, maxWidth:480, margin:"0 auto 32px" }}>
              Join students across Hyderabad competing for ₹2 Crore in scholarships. December 21st — don't miss it!
            </p>
            <button onClick={goForm} className="btn-o cta-big" style={{ fontSize:20, padding:"18px 52px", background:"#fff", color:"#f97316", boxShadow:"0 10px 34px rgba(0,0,0,0.18)" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="scale(1.04)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform="scale(1)"; }}>
              🎓 Register for Free Now
            </button>
            <p style={{ marginTop:14, fontSize:13, color:"rgba(255,255,255,0.65)" }}>Seats are limited · Scholarships based on availability</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background:"#0a1f6e", color:"rgba(255,255,255,0.5)", textAlign:"center", padding:"24px 20px", fontSize:13 }}>
          <div style={{ color:"rgba(255,255,255,0.88)", fontWeight:800, marginBottom:5, fontSize:14 }}>Vignan Schools Hyderabad</div>
          <div>ECIL · Patancheru · Medchal · Ghatkesar</div>
          <div style={{ marginTop:5 }}>© 2025 Vignan Schools. All rights reserved.</div>
        </footer>

        {/* MOBILE STICKY BAR */}
        <div className="mob-bar">
          <button className="btn-o pulse" onClick={goForm} style={{ width:"100%", fontSize:16, padding:"15px" }}>
            🎓 Register FREE – Dec 21st Scholarship Test
          </button>
        </div>

      </div>
    </>
  );
}
