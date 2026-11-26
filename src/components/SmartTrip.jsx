import { useEffect, useState } from "react";
import { Plane, CheckCircle2, Wallet, StickyNote } from "lucide-react";
import "../styles-smart-trip.css";

const key = "voyage.smartTrip.v1";
const initial = { destination: "", departure: "", returnDate: "", budget: "", spent: "", notes: "", checked: [] };
const tasks = ["Check passport validity", "Confirm flights and accommodation", "Check entry requirements", "Arrange travel insurance", "Pack essentials"];

export default function SmartTrip() {
  const [trip, setTrip] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved && typeof saved === "object" ? { ...initial, ...saved, checked: Array.isArray(saved.checked) ? saved.checked : [] } : initial;
    } catch { return initial; }
  });
  const [saveError, setSaveError] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(trip)); setSaveError(false); }
    catch { setSaveError(true); }
  }, [trip]);
  const update = (field) => (event) => setTrip((previous) => ({ ...previous, [field]: event.target.value }));
  const toggle = (task) => setTrip((previous) => ({ ...previous, checked: previous.checked.includes(task) ? previous.checked.filter((item) => item !== task) : [...previous.checked, task] }));
  const remaining = Number(trip.budget || 0) - Number(trip.spent || 0);
  return (
    <section className="smart-trip" id="smart-trip" aria-labelledby="smart-title" lang="en" dir="ltr">
      <div className="smart-wrap">
        <div className="smart-heading"><span className="smart-kicker"><Plane size={16} /> YOUR TRAVEL COMPANION</span><h2 id="smart-title">My Smart Trip</h2><p>All the little details, together in one place. Plan your next adventure at your own pace.</p></div>
        <div className="smart-layout">
          <div className="smart-panel smart-details"><h3><Plane size={19} /> Trip details</h3><div className="smart-fields"><label>Destination<input value={trip.destination} onChange={update("destination")} placeholder="Where are you going?" /></label><label>Departure<input type="date" value={trip.departure} onChange={update("departure")} /></label><label>Return<input type="date" value={trip.returnDate} min={trip.departure || undefined} onChange={update("returnDate")} /></label></div>{trip.departure && trip.returnDate && trip.returnDate < trip.departure && <p className="smart-error" role="alert">Return date must be after departure.</p>}</div>
          <div className="smart-panel"><h3><CheckCircle2 size={19} /> Travel checklist <span>{trip.checked.filter((item) => tasks.includes(item)).length}/{tasks.length}</span></h3><div className="smart-tasks">{tasks.map((task) => <label key={task}><input type="checkbox" checked={trip.checked.includes(task)} onChange={() => toggle(task)} /><span>{task}</span></label>)}</div><p className="smart-hint">Always confirm entry rules with official sources before travelling.</p></div>
          <div className="smart-panel"><h3><Wallet size={19} /> Budget tracker</h3><div className="smart-fields smart-money"><label>Planned budget<input type="number" min="0" step="any" inputMode="decimal" value={trip.budget} onChange={update("budget")} placeholder="0.00" /></label><label>Amount spent<input type="number" min="0" step="any" inputMode="decimal" value={trip.spent} onChange={update("spent")} placeholder="0.00" /></label></div><p className="smart-balance">{remaining < 0 ? "Over budget" : "Remaining"}<strong>{Math.abs(remaining).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></p><p className="smart-hint">Use the same currency for both amounts.</p></div>
          <div className="smart-panel"><h3><StickyNote size={19} /> Trip notes</h3><label className="smart-note-label">Keep useful details close<textarea value={trip.notes} onChange={update("notes")} placeholder="Booking details, ideas, or things to remember…" rows="4" /></label></div>
        </div>
        <p className="smart-save" role="status">{saveError ? "Unable to save on this device. Your changes may be lost." : "Your trip is saved on this device."}</p>
      </div>
    </section>
  );
}
