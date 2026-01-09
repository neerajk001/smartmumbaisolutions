/**
 * Extract ROI from interestRate string
 * @param interestRate - String like "Interest rates starting @ 10.49% p.a."
 * @returns String like "@ 9.99% p.a." or "@ 10.49% p.a."
 */
export function extractROI(interestRate: string): string {
  // Try to match "@ X.XX% p.a." format
  const matchWithPA = interestRate.match(/@\s*(\d+\.?\d*)%\s*p\.a\./i);
  if (matchWithPA) {
    return `@ ${matchWithPA[1]}% p.a.`;
  }
  
  // Fallback: match just "@ X.XX%" and add "p.a."
  const match = interestRate.match(/@\s*(\d+\.?\d*)%/);
  if (match) {
    return `@ ${match[1]}% p.a.`;
  }
  
  return interestRate;
}

