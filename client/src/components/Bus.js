import React from "react";
import { useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RouteIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 12h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function CalendarIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FareIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 8h4.5a2 2 0 010 4H9m0-4v8m0-4h5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Bus Card ───────────────────────────────────────────────────────────────

function Bus({ bus }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08] backdrop-blur-3xl font-sora">

      {/* ── Card header — bus name + status badge ── */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3 border-b border-white/[0.06]">
        <div>
          <p className="text-[0.6rem] tracking-[0.16em] uppercase text-sky-400/60 font-medium m-0 mb-1">
            Bus Service
          </p>
          <h1 className="text-base font-semibold text-white m-0 leading-tight font-serif">
            {bus.name}
          </h1>
        </div>

        {/* Status pill */}
        <span className="flex-shrink-0 text-[0.6rem] font-semibold px-2.5 py-1 rounded-full tracking-wide
                         bg-teal-400/10 border border-teal-400/20 text-teal-300/90">
          {bus.status}
        </span>
      </div>

      {/* ── Route row ── */}
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between gap-2">

          {/* From */}
          <div className="flex-1">
            <p className="text-[0.58rem] tracking-[0.14em] uppercase text-sky-400/50 font-medium m-0 mb-1 flex items-center gap-1">
              <RouteIcon size={11} /> From
            </p>
            <p className="text-sm font-semibold text-sky-100 m-0 font-serif">{bus.from}</p>
          </div>

          {/* Arrow divider */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
            <span className="text-sky-400/35"><ArrowIcon size={16} /></span>
            <div className="w-10 h-px bg-gradient-to-r from-sky-500/20 via-sky-400/40 to-sky-500/20" />
          </div>

          {/* To */}
          <div className="flex-1 text-right">
            <p className="text-[0.58rem] tracking-[0.14em] uppercase text-sky-400/50 font-medium m-0 mb-1 flex items-center justify-end gap-1">
              To <RouteIcon size={11} />
            </p>
            <p className="text-sm font-semibold text-sky-100 m-0 font-serif">{bus.to}</p>
          </div>

        </div>
      </div>

      {/* ── Fare + Date + CTA ── */}
      <div className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap">

        {/* Fare */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          <span className="text-sky-300/60"><FareIcon size={13} /></span>
          <div>
            <p className="text-[0.58rem] tracking-[0.12em] uppercase text-sky-400/50 m-0 leading-none mb-0.5">Fare</p>
            <p className="text-sm font-bold text-white m-0 leading-none">₹{bus.fare} /-</p>
          </div>
        </div>

        {/* Journey Date */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          <span className="text-sky-300/60"><CalendarIcon size={13} /></span>
          <div>
            <p className="text-[0.58rem] tracking-[0.12em] uppercase text-sky-400/50 m-0 leading-none mb-0.5">Journey Date</p>
            <p className="text-sm font-semibold text-sky-100 m-0 leading-none">{bus.journeyDate}</p>
          </div>
        </div>

        {/* Book Now CTA — original onClick logic untouched */}
        <button
          onClick={() => { navigate(`/book-now/${bus._id}`); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-0 text-sm font-semibold text-white
                     cursor-pointer tracking-wide transition-all duration-200 hover:-translate-y-px active:scale-[0.98]
                     bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400
                     shadow-[0_4px_14px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]"
        >
          Book Now
          <ChevronIcon size={14} />
        </button>

      </div>
    </div>
  );
}

export default Bus;