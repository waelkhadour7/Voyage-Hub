import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Plane, X, ShieldCheck } from "lucide-react";
import SmartTrip from "./SmartTrip";
import SchengenCalculatorModal from "./SchengenCalculatorModal";

function readTrip() {
  try { const trip = JSON.parse(localStorage.getItem("voyage.smartTrip.v1")); return trip && typeof trip === "object" ? trip : null; } catch { return null; }
}

export default function SmartTripSummary() {
  const [open, setOpen] = useState(false);
  const [schengenOpen, setSchengenOpen] = useState(false);
  const [trip, setTrip] = useState(readTrip);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const close = () => { setOpen(false); setTrip(readTrip()); };

  useEffect(() => {
    const handleSchengen = () => setSchengenOpen(true);
    window.addEventListener("voyage:open-schengen", handleSchengen);
    return () => window.removeEventListener("voyage:open-schengen", handleSchengen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      const controls = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]')];
      if (!controls.length) return;
      if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls[controls.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === controls[controls.length - 1]) { e.preventDefault(); controls[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); previousFocus?.focus(); };
  }, [open]);

  const upcoming = trip?.destination && (!trip.returnDate || trip.returnDate >= new Date().toLocaleDateString("en-CA"));

  return <>
    <section className="trip-summary container" aria-labelledby="trip-summary-title">
      <div className="trip-summary-card">
        <span className="trip-summary-icon"><Plane size={22} /></span>
        <div className="trip-summary-copy">
          <span className="trip-summary-label">YOUR TRAVEL COMPANION</span>
          <h2 id="trip-summary-title">My Smart Trip & Visa Wallet</h2>
          <p>{upcoming ? `${trip.destination}${trip.departure ? ` · ${trip.departure}` : ""}` : "Keep your plans, checklist, budget, and Schengen 90/180-day stay limit together."}</p>
        </div>
        <div className="trip-summary-actions">
          <button type="button" className="trip-summary-btn" onClick={() => setOpen(true)}>
            {upcoming ? "View trip" : "Start planning"} <ArrowRight size={17} />
          </button>
          <button type="button" className="trip-summary-btn trip-summary-btn-schengen" onClick={() => setSchengenOpen(true)}>
            <ShieldCheck size={17} /> Schengen Calculator
          </button>
        </div>
      </div>
    </section>

    {open && createPortal(<div className="trip-dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}><div ref={dialogRef} className="trip-dialog" role="dialog" aria-modal="true" aria-label="My Smart Trip"><div className="trip-dialog-bar"><strong>My Smart Trip</strong><button ref={closeRef} type="button" onClick={close} aria-label="Close trip planner"><X size={20} /></button></div><div className="trip-dialog-body"><SmartTrip /></div></div></div>, document.body)}

    <SchengenCalculatorModal isOpen={schengenOpen} onClose={() => setSchengenOpen(false)} />
  </>;
}
