import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import moment from "moment";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import PageTitle from "../components/PageTitle";
import { useReactToPrint } from "react-to-print";

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

function PrintIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9V3h12v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="20" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 18v3h12v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="13.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TicketIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 9a2 2 0 010-4h20a2 2 0 010 4v1a2 2 0 000 4v1a2 2 0 010 4H2a2 2 0 010-4v-1a2 2 0 000-4V9z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 5v14" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
    </svg>
  );
}

function SeatIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 10V5a2 2 0 014 0v5M15 10V5a2 2 0 014 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 14v4M17 14v4M5 18h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RouteIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 16.5V12a6 6 0 016-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Booking Card ───────────────────────────────────────────────────────────

function BookingCard({ booking, index, onPrint }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 animate-card"
      style={{
        animationDelay: `${index * 0.07}s`,
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.12)";
        e.currentTarget.style.borderColor = "rgba(14,165,233,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Left accent bar + card top */}
      <div className="flex">
        {/* Coloured left strip */}
        <div
          className="w-1 flex-shrink-0"
          style={{
            background: "linear-gradient(180deg, #0ea5e9, #14b8a6)",
          }}
        />

        <div className="flex-1 min-w-0">
          {/* Top section */}
          <div
            className="px-5 pt-4 pb-4 flex items-start justify-between gap-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Bus icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(20,184,166,0.2))",
                  border: "1px solid rgba(14,165,233,0.2)",
                }}
              >
                <BusIcon size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white m-0 leading-tight truncate">
                  {booking.name}
                </p>
                <p
                  className="text-[0.63rem] m-0 mt-0.5 tracking-wider uppercase"
                  style={{ color: "rgba(147,210,230,0.45)" }}
                >
                  #{booking.number}
                </p>
              </div>
            </div>

            {/* Seats badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl flex-shrink-0"
              style={{
                background: "rgba(20,184,166,0.1)",
                border: "1px solid rgba(20,184,166,0.2)",
              }}
            >
              <span style={{ color: "rgba(94,234,212,0.75)" }}>
                <SeatIcon size={12} />
              </span>
              <span
                className="text-[0.65rem] font-medium"
                style={{ color: "rgba(94,234,212,0.9)" }}
              >
                {booking.seats.join(", ")}
              </span>
            </div>
          </div>

          {/* Middle: route + meta */}
          <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            {/* Route */}
            <div className="flex items-center gap-2">
              <span
                className="text-base font-semibold text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {booking.from}
              </span>
              <span style={{ color: "rgba(56,189,248,0.35)" }}>
                <ArrowIcon size={13} />
              </span>
              <span
                className="text-base font-semibold text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {booking.to}
              </span>
            </div>

            {/* Date + Time pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ color: "rgba(147,210,230,0.5)" }}>
                  <CalendarIcon size={11} />
                </span>
                <span className="text-[0.65rem]" style={{ color: "rgba(186,230,255,0.7)" }}>
                  {booking.journeyDate}
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ color: "rgba(147,210,230,0.5)" }}>
                  <ClockIcon size={11} />
                </span>
                <span className="text-[0.65rem]" style={{ color: "rgba(186,230,255,0.7)" }}>
                  {booking.departure}
                </span>
              </div>
            </div>
          </div>

          {/* Footer: print */}
          <div
            className="px-5 py-2.5 flex justify-end"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <button
              onClick={() => onPrint(booking)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[0.72rem] font-semibold text-white border-0 cursor-pointer transition-all duration-200 hover:-translate-y-px active:scale-[0.98] tracking-wide"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                boxShadow: "0 4px 14px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              <PrintIcon size={12} />
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  // Original logic — untouched
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());

      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => ({
          ...booking,
          ...booking.bus,
          key: booking._id,
        }));
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
  getBookings();
}, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* ════ PAGE HEADER ════ */}
      <div className="mb-8 animate-fade-1">
        {/* Eyebrow */}
        <p
          className="text-[0.62rem] tracking-[0.2em] uppercase mb-2 m-0"
          style={{ color: "rgba(56,189,248,0.55)" }}
        >
          My Account
        </p>

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h1
            className="text-3xl sm:text-4xl font-light text-white m-0 leading-snug"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your{" "}
            <em style={{ color: "#38bdf8", fontStyle: "italic" }}>Bookings</em>
          </h1>

          {bookings.length > 0 && (
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium mb-1"
              style={{
                color: "rgba(125,211,252,0.9)",
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.22)",
              }}
            >
              <TicketIcon size={13} />
              {bookings.length} ticket{bookings.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p
          className="text-xs mt-2 m-0"
          style={{ color: "rgba(147,210,230,0.38)" }}
        >
          {bookings.length > 0
            ? "All your upcoming and past journeys in one place"
            : "Your booked journeys will appear here"}
        </p>
      </div>

      {/* ════ BOOKINGS LIST ════ */}
      <div className="animate-fade-2">

        {/* Section rule */}
        {bookings.length > 0 && (
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[0.6rem] tracking-[0.18em] uppercase font-medium whitespace-nowrap"
              style={{ color: "rgba(56,189,248,0.4)" }}
            >
              All journeys · {bookings.length}
            </span>
            <div
              className="flex-1 h-px rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(14,165,233,0.18), transparent)",
              }}
            />
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
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
              <TicketIcon size={24} />
            </div>
            <p
              className="text-2xl font-light text-white mb-1 m-0"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              No bookings yet
            </p>
            <p
              className="text-xs m-0 mt-1"
              style={{ color: "rgba(147,210,230,0.35)" }}
            >
              Your upcoming journeys will appear here
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {bookings.map((booking, index) => (
            <BookingCard
              key={booking.key}
              booking={booking}
              index={index}
              onPrint={(record) => {
                setSelectedBooking(record);
                setShowPrintModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ════ PRINT MODAL ════ */}
      {showPrintModal && (
        <Modal
          title={
            <span
              className="flex items-center gap-2"
              style={{ color: "rgba(186,230,255,0.8)", fontFamily: "'Sora', sans-serif" }}
            >
              <PrintIcon size={15} />
              Print Ticket
            </span>
          }
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          {/* Printable ticket — all data fields untouched */}
          <div
            ref={componentRef}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Ticket header */}
            <div
              className="flex items-center gap-3 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                }}
              >
                <BusIcon size={15} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white m-0">
                  {selectedBooking.name}
                </p>
                <p
                  className="text-[0.62rem] m-0 tracking-wider uppercase"
                  style={{ color: "rgba(147,210,230,0.45)" }}
                >
                  #{selectedBooking.number}
                </p>
              </div>
            </div>

            {/* Route banner */}
            <div
              className="flex items-center justify-center gap-3 py-3 rounded-xl"
              style={{
                background: "rgba(14,165,233,0.06)",
                border: "1px solid rgba(14,165,233,0.12)",
              }}
            >
              <span
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {selectedBooking.from}
              </span>
              <span style={{ color: "rgba(56,189,248,0.4)" }}>
                <ArrowIcon size={16} />
              </span>
              <span
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {selectedBooking.to}
              </span>
            </div>

            {/* Date + Time grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 mb-1"
                  style={{ color: "rgba(147,210,230,0.5)" }}
                >
                  <CalendarIcon size={12} />
                  <span className="text-[0.58rem] tracking-[0.14em] uppercase">
                    Journey Date
                  </span>
                </div>
                <p className="text-sm font-medium text-sky-100 m-0">
                  {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
                </p>
              </div>
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 mb-1"
                  style={{ color: "rgba(147,210,230,0.5)" }}
                >
                  <ClockIcon size={12} />
                  <span className="text-[0.58rem] tracking-[0.14em] uppercase">
                    Departure
                  </span>
                </div>
                <p className="text-sm font-medium text-sky-100 m-0">
                  {selectedBooking.departure}
                </p>
              </div>
            </div>

            {/* Seats */}
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(20,184,166,0.07)",
                border: "1px solid rgba(20,184,166,0.15)",
              }}
            >
              <div
                className="flex items-center gap-1.5 mb-1.5"
                style={{ color: "rgba(94,234,212,0.55)" }}
              >
                <SeatIcon size={12} />
                <span className="text-[0.58rem] tracking-[0.14em] uppercase">
                  Seat Numbers
                </span>
              </div>
              <p
                className="text-sm font-semibold m-0 tracking-[0.06em]"
                style={{ color: "rgba(94,234,212,0.95)" }}
              >
                {selectedBooking.seats}
              </p>
            </div>

            {/* Total amount */}
            <div
              className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(20,184,166,0.08))",
                border: "1px solid rgba(14,165,233,0.18)",
              }}
            >
              <span
                className="text-[0.68rem] tracking-[0.14em] uppercase"
                style={{ color: "rgba(147,210,230,0.65)" }}
              >
                Total Amount
              </span>
              <span className="text-base font-bold text-white">
                ₹{selectedBooking.fare * selectedBooking.seats.length} /-
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;