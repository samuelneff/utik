
export type Axis = 'x' | 'y';
export interface Size {
  width: number;
  height: number;
}

export interface ReducedSize extends Size {
  originalChildSize: Size;
  conatinerSize: Size;
  multiplier: number;
  clippedAxis: Axis;
}
export function fitPreservingAspectRatio(child: Size, container: Size): ReducedSize {

  const {
    width: childWidth,
    height: childHeight,
  } = child;

  const {
    width: containerWidth,
    height: containerHeight,
  } = container;

  const widthMultiplier = childWidth / containerWidth;
  const heightMultiplier = childHeight / containerHeight;
  const minMultiplier = Math.min(widthMultiplier, heightMultiplier);

  return {
    originalChildSize: child,
    conatinerSize: container,
    multiplier: minMultiplier,
    width: childWidth / minMultiplier,
    height: childHeight / minMultiplier,
    clippedAxis: minMultiplier === widthMultiplier ? 'y' : 'x',
  };
}
