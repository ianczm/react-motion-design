export class Vector2D {
  x: number;
  y: number;

  static of(x: number, y: number) {
    return new Vector2D(x, y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    const x = this.x;
    const y = this.y;
    return Math.sqrt(x * x + y * y);
  }
}

export function getNormalizedDistanceFromCenter1D(cursorPos: number, parent: { pos: number; width: number }) {
  const delta = cursorPos - parent.pos;
  const normalizedDelta = delta / parent.width;
  return 2 * normalizedDelta - 1;
}

export function getNormalizedDistanceFromCenter2D(
  cursor: { x: number; y: number },
  parent: { x: number; y: number; width: number; height: number },
): Vector2D {
  const x = getNormalizedDistanceFromCenter1D(cursor.x, { pos: parent.x, width: parent.width });
  const y = getNormalizedDistanceFromCenter1D(cursor.y, { pos: parent.y, width: parent.height });
  return Vector2D.of(x, y);
}
