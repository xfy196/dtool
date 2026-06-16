/**
 * Loan calculator domain models and pure calculation utilities.
 *
 * Supports two Chinese mortgage conventions:
 *   - 等额本息 (Equal Monthly Installment, EMI): fixed payment each month.
 *   - 等额本金 (Equal Principal): equal principal share each month, interest
 *     decreases month over month. The "monthly payment" reported here is the
 *     first month (highest), which is what consumers usually compare against
 *     the EMI to assess upfront affordability.
 */

export type RepaymentType = 'equal-payment' | 'equal-principal';

export interface LoanResult {
  /**
   * Fixed monthly payment for `equal-payment`,
   * or the first-month payment for `equal-principal`.
   */
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

const EMPTY_RESULT: LoanResult = {
  monthlyPayment: 0,
  totalInterest: 0,
  totalPayment: 0
};

/**
 * Calculate loan repayment details.
 *
 * @param principal  Total loan amount in 元.
 * @param annualRate Annual interest rate in percent, e.g. 3.1 means 3.1%.
 * @param months     Total number of monthly installments.
 * @param type       Repayment method.
 */
export function calculateLoan(
  principal: number,
  annualRate: number,
  months: number,
  type: RepaymentType
): LoanResult {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(months) ||
    principal <= 0 ||
    months <= 0 ||
    annualRate < 0
  ) {
    return { ...EMPTY_RESULT };
  }

  const monthlyRate = annualRate / 100 / 12;

  return type === 'equal-payment'
    ? calculateEqualPayment(principal, monthlyRate, months)
    : calculateEqualPrincipal(principal, monthlyRate, months);
}

/** 等额本息: fixed monthly payment over the full term. */
function calculateEqualPayment(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
  }
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  return { monthlyPayment, totalInterest, totalPayment };
}

/**
 * 等额本金: equal principal share each month, interest is computed on the
 * remaining balance. Total interest follows the arithmetic series
 *   Σ_{k=0..n-1} (P - k·P/n)·r = P·r·(n+1)/2
 */
function calculateEqualPrincipal(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  const monthlyPrincipal = principal / months;
  const firstMonthInterest = principal * monthlyRate;
  const monthlyPayment = monthlyPrincipal + firstMonthInterest;
  const totalInterest = ((months + 1) * principal * monthlyRate) / 2;
  const totalPayment = principal + totalInterest;
  return { monthlyPayment, totalInterest, totalPayment };
}

/** Format a number as currency with thousand separators and 2 decimal places. */
export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
