
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  focusX?: number;
  focusY?: number;
}

export function fitRectToRect(containerRect: Rect, childRect: Rect) {

  const {
    width: childRectWidth,
    height: childRectHeight,
    focusX: childRectFocusX,
    focusY: childRectFocusY,
  } = childRect;

  const widthMultiplier = childRectWidth / containerRect.width;
  const heightMultiplier = childRectHeight / containerRect.height;
  const minMultiplier = Math.min(widthMultiplier, heightMultiplier);

  const appliedChildRectFocusX = childRectFocusX ?? childRectWidth / 2;
  const appliedChildRectFocusY = childRectFocusY ?? childRectHeight / 2;

  const fitRect: Rect = {
    x: appliedChildRectFocusX * minMultiplier,
    y: appliedChildRectFocusY * minMultiplier,
    width: childRectWidth * minMultiplier,
    height: childRectHeight * minMultiplier,
  };



}