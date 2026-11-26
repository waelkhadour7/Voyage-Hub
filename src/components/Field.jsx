export default function Field({ label, name, required, type = "text", placeholder, options }) {
  return (
    <label className="field">
      <span>{label}{required && <i> *</i>}</span>
      {options ? (
        <select name={name} required={required} defaultValue="">
          <option value="" disabled>Select {label}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder || `Enter ${label.toLowerCase()}`} />
      )}
    </label>
  );
}
