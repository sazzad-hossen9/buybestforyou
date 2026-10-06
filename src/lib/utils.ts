export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}
