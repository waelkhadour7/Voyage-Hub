export default function FormSection({ number, title, subtitle, children }) {
  return (
    <section className="card">
      <div className="card-head">
        <span className="num">{number}</span>
        <div><h4>{title}</h4><p>{subtitle}</p></div>
      </div>
      <div className="fields">{children}</div>
    </section>
  );
}
