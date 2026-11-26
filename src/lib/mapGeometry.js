export const DEFAULT_TRANSFORM = { x: 0, y: 0, k: 1 };
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 8;

export function clampZoom(zoom) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

export function calculateZoomAtPoint(currentTransform, targetZoom, pointX, pointY) {
  const newK = clampZoom(targetZoom);
  const factor = newK / currentTransform.k;

  const newX = pointX - (pointX - currentTransform.x) * factor;
  const newY = pointY - (pointY - currentTransform.y) * factor;

  return {
    x: newX,
    y: newY,
    k: newK,
  };
}

export function computeFocusTransform(bbox, viewBoxWidth = 1000, viewBoxHeight = 500) {
  if (!bbox || bbox.length < 4) return DEFAULT_TRANSFORM;

  const [minX, minY, maxX, maxY] = bbox;
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);

  const dx = maxX - minX;
  const dy = maxY - minY;
  const x = (minX + maxX) / 2;
  const y = (minY + maxY) / 2;

  const scale = clampZoom(Math.min(8, 0.8 / Math.max(dx / viewBoxWidth, dy / viewBoxHeight)));
  const translateX = viewBoxWidth / 2 - scale * x;
  const translateY = viewBoxHeight / 2 - scale * y;

  return {
    x: translateX,
    y: translateY,
    k: scale,
  };
}
