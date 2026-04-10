/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora:  ["Sora", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
      },
      colors: {
        page: "#030d1a",
      },
      backgroundImage: {
        // Full-page mesh gradient (used in Home, Bookings, Login)
        "page-mesh":
          "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,80,180,0.45), transparent)," +
          "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,160,140,0.35), transparent)," +
          "radial-gradient(ellipse 50% 40% at 60% 20%, rgba(0,120,200,0.2),  transparent)," +
          "radial-gradient(ellipse 40% 60% at 10% 80%, rgba(0,60,140,0.25),  transparent)",
        // Ambient orb decorations
        "orb-tl": "radial-gradient(circle, rgba(0,120,220,0.14), transparent 70%)",
        "orb-br": "radial-gradient(circle, rgba(0,200,180,0.10), transparent 70%)",
      },
      keyframes: {
        // Login page animation (existing — preserved as-is)
        fadeSlideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Home & Bookings card animation
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        // ── Login page stagger (existing — preserved) ──────────────────
        "fade-1": "fadeSlideUp 0.6s ease 0.1s both",
        "fade-2": "fadeSlideUp 0.6s ease 0.2s both",
        "fade-3": "fadeSlideUp 0.6s ease 0.3s both",
        "fade-4": "fadeSlideUp 0.6s ease 0.4s both",
        "fade-5": "fadeSlideUp 0.6s ease 0.5s both",
        "fade-6": "fadeSlideUp 0.6s ease 0.6s both",
        // ── Home & Bookings cards ───────────────────────────────────────
        card: "fadeUp 0.45s ease both",
      },
      backdropBlur: {
        "3xl": "24px",
      },
      boxShadow: {
        // Named shadows used across Home, Bookings, Login
        brand:        "0 4px 16px rgba(14,165,233,0.4)",
        card:         "0 4px 24px rgba(0,0,0,0.25)",
        "card-hover": "0 8px 32px rgba(14,165,233,0.15)",
        search:       "0 8px 40px rgba(0,0,0,0.3)",
        btn:          "0 8px 24px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
        "btn-sm":     "0 4px 14px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
    },
  },
  plugins: [],
};