import { Col, message, Row } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bus from "../components/Bus";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
// ── Icons ──────────────────────────────────────────────────────────────────

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

function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FieldLabel({ icon, children }) {
  return (
    <label className="flex items-center gap-1.5 text-[0.63rem] font-medium tracking-[0.14em] uppercase mb-2"
      style={{ color: "rgba(56,189,248,0.6)" }}>
      {icon && <span style={{ color: "rgba(56,189,248,0.5)" }}>{icon}</span>}
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
      style={{ fontFamily: "'Sora', sans-serif", colorScheme: "dark" }}
      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200
                 bg-white/[0.05] border border-white/[0.09] text-sky-100 placeholder-sky-900/50
                 focus:bg-white/[0.08] focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/[0.08]"
    />
  );
}

// ── Stat pill ──────────────────────────────────────────────────────────────

function StatPill({ val, label, accent }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-colors duration-200"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.035)")}
    >
      <div
        className="w-1.5 h-6 rounded-full flex-shrink-0"
        style={{ background: accent }}
      />
      <div>
        <p className="text-sm font-semibold text-white m-0 leading-tight">{val}</p>
        <p className="text-[0.58rem] tracking-widest uppercase m-0 mt-0.5" style={{ color: "rgba(147,210,230,0.45)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

function Home() {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  // ── Original logic — untouched ─────────────────────────────────────────
  const getBuses = async () => {
  const tempFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      tempFilters[key] = filters[key];
    }
  });

  try {
    dispatch(ShowLoading());

    const response = await axiosInstance.post(
      "/api/buses/get-all-buses",
      tempFilters
    );

    dispatch(HideLoading());

    if (response.data.success) {
      setBuses(response.data.data);
    } else {
      message.error(response.data.message);
    }
  } catch (error) {
    dispatch(HideLoading());
    message.error(error.message);
  }
};

useEffect(() => {
  getBuses();
  // eslint-disable-next-line
}, []);
  // ──────────────────────────────────────────────────────────────────────

  const activeFiltersCount = [filters.from, filters.to, filters.journeyDate].filter(Boolean).length;
  const filteredBuses = buses.filter((bus) => bus.status === "Yet To Start");

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ════ GREETING STRIP ════ */}
      <div className="mb-8 animate-fade-1">
        <p
          className="text-[0.63rem] tracking-[0.2em] uppercase mb-2 m-0"
          style={{ color: "rgba(56,189,248,0.6)" }}
        >
          Good day, {user?.name ?? "Traveller"} 👋
        </p>
        <h1
          className="text-3xl sm:text-4xl font-light text-white m-0 leading-snug"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where are you{" "}
          <em style={{ color: "#38bdf8", fontStyle: "italic" }}>headed today?</em>
        </h1>
        <p className="text-xs mt-2 m-0" style={{ color: "rgba(147,210,230,0.4)" }}>
          {filteredBuses.length > 0
            ? `${filteredBuses.length} buses available and ready to board`
            : "Search across 500+ routes across India"}
        </p>
      </div>

      {/* ════ STATS ROW ════ */}
      <div className="flex flex-wrap gap-3 mb-8 animate-fade-1">
        <StatPill val="500+" label="Routes"     accent="linear-gradient(180deg, #38bdf8, #0ea5e9)" />
        <StatPill val="50K+" label="Travellers" accent="linear-gradient(180deg, #2dd4bf, #14b8a6)" />
        <StatPill val="99%"  label="On Time"    accent="linear-gradient(180deg, #818cf8, #6366f1)" />
      </div>

      {/* ════ SEARCH CARD ════ */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-8 animate-fade-2"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span style={{ color: "rgba(56,189,248,0.6)" }}>
              <SearchIcon size={14} />
            </span>
            <span
              className="text-[0.65rem] tracking-[0.18em] uppercase font-medium"
              style={{ color: "rgba(56,189,248,0.6)" }}
            >
              Find Your Bus
            </span>
          </div>

          {activeFiltersCount > 0 && (
            <span
              className="text-[0.6rem] font-semibold px-2.5 py-1 rounded-full"
              style={{
                color: "#7dd3fc",
                background: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.25)",
              }}
            >
              {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
            </span>
          )}
        </div>

        {/* Thin accent line under header */}
        <div
          className="h-px mb-6 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(14,165,233,0.25), transparent)" }}
        />

        {/* Fields — original Row/Col logic untouched */}
        <Row gutter={[12, 16]} align="bottom">
          <Col lg={6} sm={24} xs={24}>
            <FieldLabel icon={<MapPinIcon size={11} />}>From</FieldLabel>
            <GlassInput
              type="text"
              placeholder="Departure city"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>

          <Col lg={6} sm={24} xs={24}>
            <FieldLabel icon={<MapPinIcon size={11} />}>To</FieldLabel>
            <GlassInput
              type="text"
              placeholder="Destination city"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>

          <Col lg={6} sm={24} xs={24}>
            <FieldLabel icon={<CalendarIcon size={11} />}>Journey Date</FieldLabel>
            <GlassInput
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) => setFilters({ ...filters, journeyDate: e.target.value })}
            />
          </Col>

          <Col lg={6} sm={24} xs={24}>
            <div className="flex gap-2 pt-1">
              {/* Search button */}
              <button
                onClick={() => getBuses()}
                className="flex-1 py-3 rounded-xl border-0 text-sm font-semibold text-white cursor-pointer tracking-wide transition-all duration-200 hover:-translate-y-px active:scale-[0.99] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%)",
                  boxShadow: "0 6px 20px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                <SearchIcon size={14} />
                Search
              </button>

              {/* Clear button */}
              <button
                onClick={() => setFilters({ from: "", to: "", journeyDate: "" })}
                className="px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5"
                style={{
                  color: "rgba(125,211,252,0.8)",
                  background: "rgba(14,165,233,0.06)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  fontFamily: "'Sora', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(14,165,233,0.12)";
                  e.currentTarget.style.borderColor = "rgba(14,165,233,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(14,165,233,0.06)";
                  e.currentTarget.style.borderColor = "rgba(14,165,233,0.2)";
                }}
              >
                <ClearIcon size={13} />
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {/* ════ BUS RESULTS ════ */}
      <div className="animate-fade-3">

        {/* Section header */}
        {filteredBuses.length > 0 && (
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[0.62rem] tracking-[0.18em] uppercase font-medium whitespace-nowrap"
              style={{ color: "rgba(56,189,248,0.5)" }}
            >
              {filteredBuses.length} result{filteredBuses.length !== 1 ? "s" : ""} · Yet to Start
            </span>
            <div
              className="flex-1 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, rgba(14,165,233,0.2), transparent)" }}
            />
          </div>
        )}

        {/* Empty state */}
        {filteredBuses.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "rgba(14,165,233,0.07)",
                border: "1px solid rgba(14,165,233,0.15)",
              }}
            >
              <BusIcon size={24} />
            </div>
            <p
              className="text-2xl font-light text-white mb-1 m-0"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              No buses found
            </p>
            <p className="text-xs m-0 mt-1" style={{ color: "rgba(147,210,230,0.35)" }}>
              Try adjusting your filters or check back later
            </p>
          </div>
        )}

        {/* Bus cards — original .filter().map() untouched */}
        <Row gutter={[16, 16]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus, index) => (
              <Col lg={12} xs={24} sm={24} key={bus._id || index}>
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 animate-card"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.14)";
                    e.currentTarget.style.borderColor = "rgba(14,165,233,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Bus bus={bus} />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;