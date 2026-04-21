import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ── CONFIG — replace with your values ────────────────────────────
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
const API_BASE = "https://YOUR_RAILWAY_URL.railway.app";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0d1b2a; --navy-mid: #162538; --navy-light: #1e3250;
    --cream: #f5f0e8; --cream-dim: #ede7d9;
    --amber: #e8a230; --amber-dim: #c4871f;
    --red: #d64045; --green: #4a9e6b;
    --text-primary: #f5f0e8; --text-dim: #8fa3b8;
    --border: rgba(245,240,232,0.08);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--navy); color: var(--text-primary); min-height: 100vh; overflow-x: hidden; }
  .grain { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); opacity: 0.4; }
  .app { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; }
  .header { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid var(--border); }
  .logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--cream); cursor: pointer; }
  .logo span { color: var(--amber); }
  .badge { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--amber); border: 1px solid var(--amber); border-radius: 2px; padding: 3px 8px; }
  .header-right { display: flex; gap: 10px; align-items: center; }
  .user-email { font-size: 12px; color: var(--text-dim); font-family: 'DM Mono', monospace; }
  .tier-badge { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; }
  .tier-badge.free { color: var(--text-dim); border: 1px solid var(--border); }
  .tier-badge.pro { color: var(--amber); border: 1px solid rgba(232,162,48,0.4); background: rgba(232,162,48,0.08); }
  .btn-ghost { background: none; border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; border-radius: 4px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 13px; transition: all 0.2s; }
  .btn-ghost:hover { border-color: var(--cream); color: var(--cream); }
  .btn-amber { background: var(--amber); border: none; color: var(--navy); cursor: pointer; border-radius: 4px; padding: 8px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.2s; }
  .btn-amber:hover { background: var(--amber-dim); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(13,27,42,0.85); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 12px; padding: 40px; width: 100%; max-width: 420px; animation: slideUp 0.25s ease; position: relative; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--cream); margin-bottom: 8px; }
  .modal-sub { font-size: 14px; color: var(--text-dim); margin-bottom: 28px; line-height: 1.6; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; color: var(--text-dim); font-family: 'DM Mono', monospace; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .form-input { width: 100%; background: var(--navy); border: 1px solid var(--border); border-radius: 6px; color: var(--cream); font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 12px 14px; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--amber); }
  .form-input::placeholder { color: var(--text-dim); }
  .btn-full { width: 100%; background: var(--amber); border: none; color: var(--navy); cursor: pointer; border-radius: 6px; padding: 13px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; transition: all 0.2s; margin-top: 8px; }
  .btn-full:hover:not(:disabled) { background: var(--amber-dim); }
  .btn-full:disabled { opacity: 0.5; cursor: not-allowed; }
  .modal-switch { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-dim); }
  .modal-switch button { background: none; border: none; color: var(--amber); cursor: pointer; font-size: 13px; text-decoration: underline; }
  .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 22px; line-height: 1; }
  .auth-error { background: rgba(214,64,69,0.1); border: 1px solid rgba(214,64,69,0.3); border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #f0a0a2; margin-bottom: 16px; }
  .auth-success { background: rgba(74,158,107,0.1); border: 1px solid rgba(74,158,107,0.3); border-radius: 6px; padding: 10px 14px; font-size: 13px; color: #7dcca0; margin-bottom: 16px; }
  .hero { max-width: 760px; margin: 0 auto; padding: 72px 48px 52px; text-align: center; }
  .hero-eyebrow { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--amber); margin-bottom: 20px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 900; line-height: 1.1; color: var(--cream); margin-bottom: 20px; }
  .hero-title em { font-style: italic; color: var(--amber); }
  .hero-sub { font-size: 17px; line-height: 1.7; color: var(--text-dim); max-width: 520px; margin: 0 auto 36px; }
  .use-cases { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 48px; }
  .pill { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 1px; color: var(--text-dim); border: 1px solid var(--border); border-radius: 20px; padding: 5px 12px; transition: all 0.2s; cursor: default; }
  .pill:hover { border-color: var(--amber); color: var(--amber); }
  .usage-bar-wrap { max-width: 900px; margin: 0 auto; padding: 0 48px; }
  .usage-bar { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 8px; padding: 14px 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
  .usage-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-dim); white-space: nowrap; }
  .usage-track { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .usage-fill { height: 100%; border-radius: 2px; background: var(--amber); transition: width 0.4s ease; }
  .usage-fill.full { background: var(--red); }
  .usage-count { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-dim); white-space: nowrap; }
  .usage-upgrade { background: none; border: 1px solid rgba(232,162,48,0.4); color: var(--amber); cursor: pointer; border-radius: 4px; padding: 6px 14px; font-size: 12px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; white-space: nowrap; }
  .usage-upgrade:hover { background: rgba(232,162,48,0.08); }
  .upload-container { padding: 0 48px 80px; max-width: 900px; margin: 0 auto; }
  .tabs { display: flex; border-bottom: 1px solid var(--border); }
  .tab { background: none; border: none; cursor: pointer; padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text-dim); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
  .tab.active { color: var(--amber); border-bottom-color: var(--amber); }
  .tab:hover { color: var(--cream); }
  .upload-panel { background: var(--navy-mid); border: 1px solid var(--border); border-top: none; border-radius: 0 0 8px 8px; padding: 32px; }
  .dropzone { border: 2px dashed var(--border); border-radius: 8px; padding: 56px 32px; text-align: center; cursor: pointer; transition: all 0.25s; position: relative; }
  .dropzone:hover, .dropzone.drag-over { border-color: var(--amber); background: rgba(232,162,48,0.04); }
  .dropzone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
  .dropzone-icon { width: 48px; height: 48px; margin: 0 auto 16px; background: rgba(232,162,48,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .dropzone-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); margin-bottom: 8px; }
  .dropzone-sub { font-size: 13px; color: var(--text-dim); }
  .dropzone-sub strong { color: var(--amber); }
  .file-selected { display: flex; align-items: center; gap: 12px; background: rgba(232,162,48,0.08); border: 1px solid rgba(232,162,48,0.3); border-radius: 6px; padding: 14px 18px; margin-top: 16px; }
  .file-name { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--cream); flex: 1; }
  .file-remove { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 18px; padding: 0; transition: color 0.2s; }
  .file-remove:hover { color: var(--red); }
  textarea { width: 100%; height: 220px; background: var(--navy); border: 1px solid var(--border); border-radius: 6px; color: var(--cream); font-family: 'DM Mono', monospace; font-size: 13px; line-height: 1.7; padding: 20px; resize: vertical; outline: none; transition: border-color 0.2s; }
  textarea:focus { border-color: var(--amber); }
  textarea::placeholder { color: var(--text-dim); }
  .analyse-row { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; flex-wrap: wrap; gap: 12px; }
  .analyse-hint { font-size: 12px; color: var(--text-dim); }
  .btn-analyse { background: var(--amber); border: none; color: var(--navy); cursor: pointer; border-radius: 6px; padding: 12px 28px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; transition: all 0.2s; }
  .btn-analyse:hover:not(:disabled) { background: var(--amber-dim); transform: translateY(-1px); }
  .btn-analyse:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .gate { border: 1px dashed rgba(232,162,48,0.3); border-radius: 8px; padding: 40px 32px; text-align: center; }
  .gate-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--cream); margin-bottom: 10px; }
  .gate-sub { font-size: 14px; color: var(--text-dim); margin-bottom: 24px; line-height: 1.65; }
  .gate-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .limit-gate { background: rgba(214,64,69,0.06); border: 1px solid rgba(214,64,69,0.25); border-radius: 8px; padding: 32px; text-align: center; }
  .limit-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--cream); margin-bottom: 10px; }
  .limit-sub { font-size: 14px; color: var(--text-dim); margin-bottom: 24px; line-height: 1.65; }
  .loading-state { padding: 60px 32px; text-align: center; }
  .spinner { width: 40px; height: 40px; margin: 0 auto 20px; border: 2px solid var(--border); border-top-color: var(--amber); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 8px; }
  .loading-steps { font-size: 13px; color: var(--text-dim); font-family: 'DM Mono', monospace; }
  .results { animation: fadeUp 0.4s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .results-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
  .results-title { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--cream); }
  .results-meta { font-size: 12px; color: var(--text-dim); margin-top: 4px; font-family: 'DM Mono', monospace; }
  .btn-restart { background: none; border: 1px solid var(--border); color: var(--text-dim); cursor: pointer; border-radius: 4px; padding: 8px 16px; font-size: 13px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-restart:hover { border-color: var(--cream); color: var(--cream); }
  .risk-banner { display: flex; align-items: center; gap: 16px; padding: 18px 22px; border-radius: 8px; margin-bottom: 24px; border: 1px solid; }
  .risk-banner.low { background: rgba(74,158,107,0.08); border-color: rgba(74,158,107,0.3); }
  .risk-banner.medium { background: rgba(232,162,48,0.08); border-color: rgba(232,162,48,0.3); }
  .risk-banner.high { background: rgba(214,64,69,0.08); border-color: rgba(214,64,69,0.3); }
  .risk-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
  .risk-banner.low .risk-dot { background: var(--green); }
  .risk-banner.medium .risk-dot { background: var(--amber); }
  .risk-banner.high .risk-dot { background: var(--red); }
  .risk-label { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
  .risk-banner.low .risk-label { color: var(--green); }
  .risk-banner.medium .risk-label { color: var(--amber); }
  .risk-banner.high .risk-label { color: var(--red); }
  .risk-desc { font-size: 14px; color: var(--text-dim); flex: 1; }
  .section { margin-bottom: 24px; }
  .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 17px; color: var(--cream); }
  .section-body { background: var(--navy); border: 1px solid var(--border); border-radius: 8px; padding: 20px 24px; font-size: 15px; line-height: 1.75; color: var(--cream); }
  .clause-list { display: flex; flex-direction: column; gap: 12px; }
  .clause-item { background: var(--navy); border: 1px solid var(--border); border-radius: 8px; padding: 18px 20px; border-left: 3px solid; transition: transform 0.15s; }
  .clause-item:hover { transform: translateX(3px); }
  .clause-item.safe { border-left-color: var(--green); }
  .clause-item.caution { border-left-color: var(--amber); }
  .clause-item.danger { border-left-color: var(--red); }
  .clause-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .clause-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; padding: 2px 8px; border-radius: 2px; }
  .clause-item.safe .clause-tag { color: var(--green); background: rgba(74,158,107,0.12); }
  .clause-item.caution .clause-tag { color: var(--amber); background: rgba(232,162,48,0.12); }
  .clause-item.danger .clause-tag { color: var(--red); background: rgba(214,64,69,0.12); }
  .clause-name { font-size: 14px; font-weight: 500; color: var(--cream); }
  .clause-plain { font-size: 14px; color: var(--text-dim); line-height: 1.65; }
  .flags-list { display: flex; flex-direction: column; gap: 10px; }
  .flag-item { display: flex; gap: 12px; align-items: flex-start; background: rgba(214,64,69,0.06); border: 1px solid rgba(214,64,69,0.2); border-radius: 6px; padding: 14px 16px; }
  .flag-bullet { color: var(--red); font-size: 14px; margin-top: 2px; flex-shrink: 0; }
  .flag-text { font-size: 14px; color: var(--cream); line-height: 1.6; }
  .action-list { display: flex; flex-direction: column; gap: 10px; }
  .action-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .action-item:last-child { border-bottom: none; }
  .action-num { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--amber); flex-shrink: 0; margin-top: 2px; }
  .action-text { font-size: 14px; color: var(--cream); line-height: 1.65; }
  .paywall { margin-top: 32px; background: linear-gradient(135deg, rgba(232,162,48,0.08) 0%, rgba(13,27,42,0) 60%); border: 1px solid rgba(232,162,48,0.25); border-radius: 10px; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
  .paywall-text h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 6px; }
  .paywall-text p { font-size: 14px; color: var(--text-dim); line-height: 1.6; }
  .paywall-features { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
  .paywall-feature { font-size: 13px; color: var(--text-dim); display: flex; align-items: center; gap: 8px; }
  .paywall-feature::before { content: "✓"; color: var(--green); font-weight: 700; }
  .btn-upgrade { background: var(--amber); border: none; color: var(--navy); cursor: pointer; border-radius: 6px; padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; white-space: nowrap; transition: all 0.2s; }
  .btn-upgrade:hover:not(:disabled) { background: var(--amber-dim); transform: translateY(-1px); }
  .btn-upgrade:disabled { opacity: 0.6; cursor: not-allowed; }
  .price-tag { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-dim); text-align: center; margin-top: 8px; }
  .error-box { background: rgba(214,64,69,0.08); border: 1px solid rgba(214,64,69,0.3); border-radius: 6px; padding: 16px 20px; margin-top: 16px; font-size: 14px; color: #f0a0a2; }
  .footer { border-top: 1px solid var(--border); padding: 24px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: auto; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--text-dim); }
  .footer-logo span { color: var(--amber); }
  .footer-links { display: flex; gap: 20px; }
  .footer-link { font-size: 12px; color: var(--text-dim); cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: var(--cream); }
  @media (max-width: 640px) {
    .header { padding: 16px 20px; }
    .hero { padding: 48px 20px 36px; }
    .upload-container { padding: 0 20px 48px; }
    .usage-bar-wrap { padding: 0 20px; }
    .footer { padding: 20px; }
    .paywall { flex-direction: column; }
    .badge { display: none; }
  }
`;

const SAMPLE_TEXT = `EMPLOYMENT CONTRACT - EXCERPT

13. POST-TERMINATION RESTRICTIONS
13.1 The Employee agrees that for a period of 24 months following the termination of employment, they shall not directly or indirectly engage in any business activity which competes with the Company's business within a 50-mile radius of any office in which the Employee has worked.

13.2 The Employee shall not solicit or attempt to solicit any client, customer, or prospect of the Company with whom the Employee had material contact during the 12 months prior to termination.

14. INTELLECTUAL PROPERTY
14.1 All work product, inventions, or developments created by the Employee during or outside of working hours shall be the exclusive property of the Company.

15. DATA & MONITORING
15.1 The Company reserves the right to monitor all communications made using Company equipment including emails, messages, and browser activity without prior notice.

16. VARIATION
16.1 The Company reserves the right to vary the terms of this contract with 7 days notice.`;

export default function ClearClause() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [tab, setTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.access_token);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) fetchProfile(session.access_token);
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(token) {
    try {
      const res = await fetch(`${API_BASE}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setProfile(await res.json());
    } catch (e) { console.error("Profile fetch failed:", e); }
  }

  async function handleSignUp() {
    setAuthLoading(true); setAuthError(""); setAuthSuccess("");
    const { error } = await supabase.auth.signUp({
      email: authForm.email, password: authForm.password,
      options: { emailRedirectTo: window.location.origin }
    });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else setAuthSuccess("Check your email to confirm your account.");
  }

  async function handleSignIn() {
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: authForm.email, password: authForm.password
    });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else setAuthModal(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setResult(null); setFile(null); setText("");
  }

  async function handleUpgrade() {
    if (!session) { setAuthModal("signup"); return; }
    setCheckoutLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Failed to start checkout. Please try again.");
    } catch (e) { setError("Failed to start checkout."); }
    finally { setCheckoutLoading(false); }
  }

  const handleFile = (f) => {
    if (f?.type === "application/pdf") { setFile(f); setError(""); }
    else if (f) setError("Please upload a PDF file.");
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const readFileAsBase64 = (f) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Read failed"));
    r.readAsDataURL(f);
  });

  async function analyse() {
    if (!session) { setAuthModal("signup"); return; }
    setLoading(true); setResult(null); setError("");
    try {
      let body;
      if (tab === "upload" && file) {
        const pdf_base64 = await readFileAsBase64(file);
        body = { pdf_base64 };
      } else {
        body = { text: tab === "paste" ? text : SAMPLE_TEXT };
      }
      const res = await fetch(`${API_BASE}/api/analyse`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.status === 402) { setError("free_limit"); return; }
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data.result);
      fetchProfile(session.access_token);
    } catch (err) {
      if (err.message !== "free_limit") setError(err.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  const canAnalyse = (tab === "upload" && file) || (tab === "paste" && text.trim().length > 80) || tab === "sample";
  const riskLevel = result?.risk_level?.toLowerCase() || "medium";
  const usageUsed = profile?.usage?.used || 0;
  const usageLimit = profile?.usage?.limit || 3;
  const isPro = profile?.profile?.tier === "pro";
  const usagePct = isPro ? 0 : Math.min((usageUsed / usageLimit) * 100, 100);

  return (
    <>
      <style>{STYLES}</style>
      <div className="grain" />
      <div className="app">

        {authModal && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setAuthModal(null)}>
            <div className="modal">
              <button className="modal-close" onClick={() => setAuthModal(null)}>×</button>
              <div className="modal-title">{authModal === "signup" ? "Create your account" : "Welcome back"}</div>
              <div className="modal-sub">{authModal === "signup" ? "3 free analyses included. No credit card required." : "Sign in to access your analyses."}</div>
              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}
              {!authSuccess && (
                <>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="you@example.com" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && (authModal === "signup" ? handleSignUp() : handleSignIn())} />
                  </div>
                  <button className="btn-full" disabled={authLoading || !authForm.email || !authForm.password} onClick={authModal === "signup" ? handleSignUp : handleSignIn}>
                    {authLoading ? "Please wait…" : authModal === "signup" ? "Create account →" : "Sign in →"}
                  </button>
                  <div className="modal-switch">
                    {authModal === "signup"
                      ? <>Already have an account? <button onClick={() => { setAuthModal("signin"); setAuthError(""); }}>Sign in</button></>
                      : <>No account yet? <button onClick={() => { setAuthModal("signup"); setAuthError(""); }}>Sign up free</button></>}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <header className="header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="logo" onClick={() => { setResult(null); setError(""); }}>Clear<span>Clause</span></div>
            <div className="badge">Beta</div>
          </div>
          <div className="header-right">
            {session ? (
              <>
                <span className="user-email">{session.user.email}</span>
                <span className={`tier-badge ${isPro ? "pro" : "free"}`}>{isPro ? "Pro" : "Free"}</span>
                {!isPro && <button className="btn-amber" onClick={handleUpgrade} disabled={checkoutLoading}>Upgrade</button>}
                <button className="btn-ghost" onClick={handleSignOut}>Sign out</button>
              </>
            ) : (
              <>
                <button className="btn-ghost" onClick={() => setAuthModal("signin")}>Sign in</button>
                <button className="btn-amber" onClick={() => setAuthModal("signup")}>Get started free</button>
              </>
            )}
          </div>
        </header>

        {!result && !loading && (
          <>
            <section className="hero">
              <p className="hero-eyebrow">AI-Powered Document Analysis · Built for the UK</p>
              <h1 className="hero-title">Documents written for lawyers.<br /><em>Now readable by everyone.</em></h1>
              <p className="hero-sub">Upload any contract, tenancy agreement, employment letter, or terms of service. Get a plain English breakdown with key clauses and red flags in seconds.</p>
              <div className="use-cases">
                {["Tenancy agreements","Employment contracts","Terms of service","GDPR policies","Freelance contracts","NDAs","Service agreements","Mortgage docs"].map(u => (
                  <span key={u} className="pill">{u}</span>
                ))}
              </div>
            </section>

            {session && !isPro && (
              <div className="usage-bar-wrap">
                <div className="usage-bar">
                  <span className="usage-label">Monthly usage</span>
                  <div className="usage-track">
                    <div className={`usage-fill ${usageUsed >= usageLimit ? "full" : ""}`} style={{ width: `${usagePct}%` }} />
                  </div>
                  <span className="usage-count">{usageUsed} / {usageLimit}</span>
                  <button className="usage-upgrade" onClick={handleUpgrade} disabled={checkoutLoading}>{checkoutLoading ? "Loading…" : "Upgrade →"}</button>
                </div>
              </div>
            )}

            <div className="upload-container">
              <div className="tabs">
                {[["upload","📄 Upload PDF"],["paste","✏️ Paste text"],["sample","🧪 Try sample"]].map(([id, label]) => (
                  <button key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
                ))}
              </div>
              <div className="upload-panel">
                {error === "free_limit" ? (
                  <div className="limit-gate">
                    <div className="limit-title">You've used your 3 free analyses</div>
                    <div className="limit-sub">Upgrade to Pro for unlimited document analyses, negotiation tips, and UK law compliance checks.</div>
                    <button className="btn-upgrade" onClick={handleUpgrade} disabled={checkoutLoading}>{checkoutLoading ? "Redirecting…" : "Upgrade to Pro — £9.99/month →"}</button>
                  </div>
                ) : !session ? (
                  <>
                    {tab === "sample" && (
                      <div style={{ background: "var(--navy)", border: "1px solid var(--border)", borderRadius: 6, padding: "20px 24px", marginBottom: 20 }}>
                        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--amber)", marginBottom: 12 }}>Sample: Employment Contract Extract</p>
                        <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{SAMPLE_TEXT}</pre>
                      </div>
                    )}
                    <div className="gate">
                      <div className="gate-title">Sign up to analyse this document</div>
                      <div className="gate-sub">Free account includes 3 analyses per month.<br />No credit card required.</div>
                      <div className="gate-actions">
                        <button className="btn-amber" onClick={() => setAuthModal("signup")}>Create free account →</button>
                        <button className="btn-ghost" onClick={() => setAuthModal("signin")}>Sign in</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {tab === "upload" && (
                      <>
                        <div className={`dropzone ${dragOver ? "drag-over" : ""}`} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileRef.current?.click()}>
                          <input ref={fileRef} type="file" accept=".pdf" onChange={e => handleFile(e.target.files[0])} />
                          <div className="dropzone-icon">📄</div>
                          <div className="dropzone-title">Drop your PDF here</div>
                          <div className="dropzone-sub">or <strong>click to browse</strong> · PDF up to 10MB</div>
                        </div>
                        {file && (
                          <div className="file-selected">
                            <span>📎</span>
                            <span className="file-name">{file.name}</span>
                            <button className="file-remove" onClick={() => setFile(null)}>×</button>
                          </div>
                        )}
                      </>
                    )}
                    {tab === "paste" && <textarea placeholder="Paste your contract, terms, or any legal text here…" value={text} onChange={e => setText(e.target.value)} />}
                    {tab === "sample" && (
                      <div style={{ background: "var(--navy)", border: "1px solid var(--border)", borderRadius: 6, padding: "20px 24px" }}>
                        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--amber)", marginBottom: 12 }}>Sample: Employment Contract Extract</p>
                        <pre style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{SAMPLE_TEXT}</pre>
                      </div>
                    )}
                    {error && error !== "free_limit" && <div className="error-box">⚠️ {error}</div>}
                    <div className="analyse-row">
                      <span className="analyse-hint">🔒 Documents are not stored. Processed securely.</span>
                      <button className="btn-analyse" onClick={analyse} disabled={!canAnalyse || loading}>Analyse document →</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="upload-container">
            <div className="upload-panel">
              <div className="loading-state">
                <div className="spinner" />
                <div className="loading-title">Analysing your document…</div>
                <div className="loading-steps">Reading clauses · Identifying risks · Translating to plain English</div>
              </div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="upload-container">
            <div className="results">
              <div className="results-header">
                <div>
                  <div className="results-title">Document Analysis</div>
                  <div className="results-meta">Analysed just now · {result.doc_type || "Legal Document"}</div>
                </div>
                <button className="btn-restart" onClick={() => { setResult(null); setFile(null); setText(""); setError(""); }}>← Analyse another</button>
              </div>
              <div className={`risk-banner ${riskLevel}`}>
                <div className="risk-dot" />
                <div>
                  <div className="risk-label">{result.risk_level} Risk</div>
                  <div className="risk-desc">{result.risk_summary}</div>
                </div>
              </div>
              <div className="section">
                <div className="section-head"><span>📋</span><span className="section-title">Plain English Summary</span></div>
                <div className="section-body">{result.summary}</div>
              </div>
              {result.clauses?.length > 0 && (
                <div className="section">
                  <div className="section-head"><span>🔍</span><span className="section-title">Key Clauses Explained</span></div>
                  <div className="clause-list">
                    {result.clauses.map((c, i) => (
                      <div key={i} className={`clause-item ${c.severity}`}>
                        <div className="clause-header">
                          <span className="clause-tag">{c.severity}</span>
                          <span className="clause-name">{c.name}</span>
                        </div>
                        <div className="clause-plain">{c.plain_english}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.red_flags?.length > 0 && (
                <div className="section">
                  <div className="section-head"><span>🚩</span><span className="section-title">Red Flags</span></div>
                  <div className="flags-list">
                    {result.red_flags.map((f, i) => (
                      <div key={i} className="flag-item">
                        <span className="flag-bullet">▲</span>
                        <span className="flag-text">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {result.actions?.length > 0 && (
                <div className="section">
                  <div className="section-head"><span>✅</span><span className="section-title">What You Should Do</span></div>
                  <div className="section-body">
                    <div className="action-list">
                      {result.actions.map((a, i) => (
                        <div key={i} className="action-item">
                          <span className="action-num">0{i + 1}</span>
                          <span className="action-text">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {!isPro && (
                <div className="paywall">
                  <div className="paywall-text">
                    <h3>Get the full picture with Pro</h3>
                    <p>Unlock negotiation tips, UK law compliance checks, and unlimited documents.</p>
                    <div className="paywall-features">
                      <span className="paywall-feature">Unlimited document analyses</span>
                      <span className="paywall-feature">Negotiation suggestions per clause</span>
                      <span className="paywall-feature">UK law compliance checker</span>
                      <span className="paywall-feature">PDF export of full report</span>
                    </div>
                  </div>
                  <div>
                    <button className="btn-upgrade" onClick={handleUpgrade} disabled={checkoutLoading}>{checkoutLoading ? "Redirecting…" : "Upgrade to Pro →"}</button>
                    <div className="price-tag">£9.99/month · cancel anytime</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="footer-logo">Clear<span>Clause</span></div>
          <div className="footer-links">
            {["Privacy","Terms","Pricing","Contact"].map(l => <span key={l} className="footer-link">{l}</span>)}
          </div>
        </footer>
      </div>
    </>
  );
}
