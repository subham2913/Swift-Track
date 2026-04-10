
import { Form, message } from "antd";
import { Link,  } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

// ── Reusable sub-components to keep JSX flat and readable ──────────────────

function BusIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="12" rx="3" fill="white" fillOpacity="0.9" />
      <circle cx="7" cy="19" r="2.5" fill="white" />
      <circle cx="17" cy="19" r="2.5" fill="white" />
      <rect x="5" y="4" width="14" height="5" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="5" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.8)" />
      <rect x="10" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.6)" />
      <rect x="15" y="10" width="4" height="3" rx="1" fill="rgba(14,165,233,0.5)" />
    </svg>
  );
}

function Brand({ size = "lg" }) {
  const isLg = size === "lg";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${isLg ? "w-9 h-9" : "w-8 h-8"} rounded-xl flex items-center justify-center flex-shrink-0`}
        style={{
          background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
          boxShadow: isLg ? "0 4px 16px rgba(14,165,233,0.4)" : "none",
        }}>
        <BusIcon size={isLg ? 18 : 16} />
      </div>
      <span className={`${isLg ? "text-xl" : "text-lg"} text-white tracking-tight font-semibold`}>
        BookMyBus
      </span>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="block text-[0.68rem] font-medium tracking-[0.14em] uppercase mb-2 text-sky-400/75">
      {children}
    </label>
  );
}

function GlassInput({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={[
        "w-full box-border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200",
        "bg-white/[0.06] border border-white/10 text-sky-100 placeholder-sky-900/60",
        "focus:bg-white/[0.09] focus:border-sky-400/55 focus:ring-2 focus:ring-sky-400/10",
      ].join(" ")}
      style={{ fontFamily: "'Sora', sans-serif" }}
    />
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    bg: "bg-sky-400/10",
    title: "500+ Routes across India",
    sub: "Major cities to remote destinations",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(56,189,248,0.85)" />
      </svg>
    ),
  },
  {
    bg: "bg-teal-400/10",
    title: "Real-time bus tracking",
    sub: "Live GPS updates every 30 seconds",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(20,184,166,0.85)" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="rgba(20,184,166,0.85)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    bg: "bg-sky-400/10",
    title: "Instant e-tickets",
    sub: "Paperless boarding, hassle-free travel",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="rgba(56,189,248,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const STATS = [
  { val: "500+", label: "Routes" },
  { val: "50K+", label: "Travellers" },
  { val: "99%", label: "On Time" },
];

// ── Main component ─────────────────────────────────────────────────────────

function Login() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      {/* ── Page wrapper — mesh gradient background ── */}
      <div
        className="min-h-screen w-full flex"
        style={{
          fontFamily: "'Sora', sans-serif",
          backgroundColor: "#030d1a",
          backgroundImage: [
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,80,180,0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,160,140,0.35) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 40% at 60% 20%, rgba(0,120,200,0.2) 0%, transparent 50%)",
            "radial-gradient(ellipse 40% 60% at 10% 80%, rgba(0,60,140,0.25) 0%, transparent 55%)",
          ].join(", "),
        }}>

        {/* ════════════════ LEFT PANEL ════════════════ */}
        <div className="hidden lg:flex w-[52%] min-h-screen flex-col justify-between p-14 relative overflow-hidden">

          {/* Ambient orbs — purely decorative, inline style justified */}
          <div className="absolute w-[500px] h-[500px] rounded-full -top-24 -left-24 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,220,0.18) 0%, transparent 70%)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full -bottom-20 -right-16 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,200,180,0.14) 0%, transparent 70%)" }} />

          {/* Brand */}
          <div className="relative z-10">
            <Brand size="lg" />
          </div>

          {/* Hero + features */}
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase mb-3 text-sky-400/80">
                Trusted by 50,000+ travellers
              </p>
              <h2
                className="text-[2.6rem] leading-[1.15] text-white font-light mb-4"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                Travel smarter,<br />
                <em className="text-sky-400">arrive happier.</em>
              </h2>
              <p className="text-sm leading-relaxed text-sky-200/50 max-w-[360px]">
                Book seats, track buses in real-time, and manage every journey from one seamless platform.
              </p>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${f.bg}`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white m-0 leading-tight">{f.title}</p>
                    <p className="text-xs m-0 mt-0.5 text-sky-200/50">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-3">
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-3.5 hover:bg-white/[0.07] transition-colors duration-200">
                <p className="text-lg font-semibold text-white m-0">{s.val}</p>
                <p className="text-[0.62rem] tracking-widest uppercase m-0 mt-0.5 text-sky-300/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ RIGHT PANEL ════════════════ */}
        <div className="w-full lg:w-[48%] min-h-screen flex items-center justify-center px-6 sm:px-12 py-16 relative">

          {/* Subtle centre glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,100,180,0.08) 0%, transparent 70%)" }} />

          <div className="w-full max-w-[420px] relative z-10">

            {/* Mobile-only brand */}
            <div className="lg:hidden mb-10 animate-fade-1">
              <Brand size="sm" />
            </div>

            {/* ── Glass card ── */}
            <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-8 sm:p-10">

              {/* Heading */}
              <div className="animate-fade-1">
                <h2
                  className="text-[1.85rem] font-light text-white mb-1 mt-0 leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Welcome back
                </h2>
                <p className="text-[0.8rem] mb-8 mt-0 text-sky-300/50">
                  Sign in to continue your journey
                </p>
              </div>

              <Form layout="vertical" onFinish={onFinish}>

                {/* Email field */}
                <div className="mb-5 animate-fade-2">
                  <FieldLabel>Email address</FieldLabel>
                  <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                    <GlassInput type="text" placeholder="you@example.com" />
                  </Form.Item>
                </div>

                {/* Password field */}
                <div className="mb-2 animate-fade-3">
                  <FieldLabel>Password</FieldLabel>
                  <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                    <GlassInput type="password" placeholder="••••••••" />
                  </Form.Item>
                </div>

                {/* Forgot password */}
                import {Link} from "react-router-dom";

                <div className="flex justify-end mb-7 animate-fade-3">
                  <Link
                    to="/forgot-password"
                    className="text-[0.75rem] text-sky-400/75 no-underline hover:underline transition-all"
                  >
                    Forgot password?
                  </Link>
                </div>
                {/* Submit */}
                <div className="animate-fade-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl border-none text-sm font-semibold text-white cursor-pointer tracking-wide transition-all duration-200 hover:-translate-y-px active:scale-[0.99]"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%)",
                      boxShadow: "0 8px 32px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                      fontFamily: "'Sora', sans-serif",
                    }}>
                    {"Sign In \u2192"}
                  </button>
                </div>

              </Form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-7 animate-fade-5">
                <hr className="flex-1 border-none border-t border-white/[0.07] m-0" />
                <span className="text-[0.68rem] whitespace-nowrap text-sky-900/80">
                  Don&#39;t have an account?
                </span>
                <hr className="flex-1 border-none border-t border-white/[0.07] m-0" />
              </div>

              {/* Register */}
              <div className="animate-fade-6">
                <Link
                  to="/register"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 text-sky-400/90 bg-sky-400/[0.05] border border-sky-400/25 hover:bg-sky-400/10 hover:border-sky-400/45">
                  Create a free account
                </Link>
              </div>

            </div>

            {/* Footer */}
            <p className="text-center text-[0.7rem] mt-6 animate-fade-6 text-sky-900/70">
              By signing in, you agree to our{" "}
              <Link
                to="/terms"
                className="text-sky-400/50 no-underline hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-sky-400/50 no-underline hover:underline"
              >
                Privacy Policy
              </Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}

export default Login;