import { useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { worldPaths } from "../../data/worldPaths";
import { hiddenIds, extraMarkers } from "../../data/mapOverrides";
import {
  DEFAULT_TRANSFORM,
  calculateZoomAtPoint,
  clampZoom,
} from "../../lib/mapGeometry";

export default function WorldMap({
  visitedCodes = [],
  wishlistCodes = [],
  onSelectCountry,
  lang,
  t,
}) {
  const [transform, setTransform] = useState(DEFAULT_TRANSFORM);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const svgRef = useRef(null);

  // Filter out hidden IDs
  const pathsToRender = worldPaths.filter((p) => !hiddenIds.includes(p.id));

  // Pointer event handlers for Pan & Zoom
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - transform.x,
      y: e.clientY - transform.y,
    };
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }));
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (svgRef.current) {
      try {
        svgRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore pointer release errors
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const pointX = e.clientX - rect.left;
    const pointY = e.clientY - rect.top;
    const delta = e.deltaY < 0 ? 1.2 : 0.8;

    setTransform((prev) => calculateZoomAtPoint(prev, prev.k * delta, pointX, pointY));
  };

  const handleZoomIn = () => {
    setTransform((prev) => ({ ...prev, k: clampZoom(prev.k * 1.3) }));
  };

  const handleZoomOut = () => {
    setTransform((prev) => ({ ...prev, k: clampZoom(prev.k / 1.3) }));
  };

  const handleResetZoom = () => {
    setTransform(DEFAULT_TRANSFORM);
  };

  return (
    <div className="pp-map-wrap">
      {/* Map Controls Overlay */}
      <div className="pp-map-controls" aria-label="Map controls">
        <button
          type="button"
          className="pp-map-btn"
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
        <button
          type="button"
          className="pp-map-btn"
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          type="button"
          className="pp-map-btn"
          onClick={handleResetZoom}
          aria-label="Reset map view"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* SVG Map Canvas */}
      <svg
        ref={svgRef}
        className="pp-map-svg"
        viewBox="0 0 1000 500"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        aria-label="Interactive world map"
      >
        <defs>
          {/* Shared Diagonal Hatch Pattern for Visited Countries */}
          <pattern
            id="pp-visited-hatch"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
          </pattern>
        </defs>

        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>
          {pathsToRender.map((country) => {
            const isVisited = visitedCodes.includes(country.id);
            const isWishlist = wishlistCodes.includes(country.id);

            let className = "pp-country-path";
            if (isVisited) className += " is-visited";
            if (isWishlist) className += " is-wishlist";

            const countryName = country.name;

            return (
              <g key={country.id}>
                <path
                  d={country.d}
                  className={className}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCountry(country);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${countryName}${isVisited ? " (Visited)" : isWishlist ? " (Wishlist)" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectCountry(country);
                    }
                  }}
                />

                {/* Visited Hatch Overlay */}
                {isVisited && (
                  <path
                    d={country.d}
                    fill="url(#pp-visited-hatch)"
                    pointerEvents="none"
                  />
                )}

                {/* Small Country Centroid Marker for micro-states / small islands */}
                {(country.isSmall || extraMarkers.some((m) => m.id === country.id)) && (
                  <circle
                    cx={country.centroid[0]}
                    cy={country.centroid[1]}
                    r={isVisited ? 4 : 3}
                    className={`pp-small-marker ${isVisited ? "is-visited" : isWishlist ? "is-wishlist" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCountry(country);
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
