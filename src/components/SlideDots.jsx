export default function SlideDots({ total, index, onSelect }) {
  return (
    <div className="dots" role="tablist" aria-label="Slides">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === index}
          aria-label={`Slide ${i + 1}`}
          className={`dot ${i === index ? "is-active" : ""}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
