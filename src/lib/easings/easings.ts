export function easeInOutExpo(x: number): number {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}
