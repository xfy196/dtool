export interface DataRow {
  rowIndex: number;
  values: number[];
  average: number;
  sum: number;
}

export interface SummaryData {
  rowCount: number;
  totalCount: number;
  overallAverage: number;
  totalSum: number;
  columnSums: number[];
  columnAverages: number[];
  maxColumns: number;
}

export interface ParseResult {
  rows: DataRow[];
  summary: SummaryData;
  error: string | null;
}

export const EXAMPLE_DATA = `1 2 3
4 5 6
7 8 9`;

function roundTo(n: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

export function parseAndCalculate(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { rows: [], summary: createEmptySummary(), error: null };
  }

  const lines = trimmed.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length === 0) {
    return { rows: [], summary: createEmptySummary(), error: null };
  }

  const rows: DataRow[] = [];
  let maxColumns = 0;

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\s+/);
    const values: number[] = [];
    for (const p of parts) {
      const num = Number(p);
      if (isNaN(num)) {
        return {
          rows: [],
          summary: createEmptySummary(),
          error: `第 ${i + 1} 行包含非数字内容: "${p}"`
        };
      }
      values.push(num);
    }
    if (values.length === 0) continue;
    maxColumns = Math.max(maxColumns, values.length);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = values.length > 0 ? sum / values.length : 0;
    rows.push({
      rowIndex: i + 1,
      values,
      average: roundTo(avg),
      sum: roundTo(sum)
    });
  }

  const totalCount = rows.reduce((acc, r) => acc + r.values.length, 0);
  const totalSum = rows.reduce((acc, r) => acc + r.sum, 0);

  const columnSums: number[] = [];
  const columnCounts: number[] = [];
  for (const row of rows) {
    for (let c = 0; c < row.values.length; c++) {
      columnSums[c] = (columnSums[c] || 0) + row.values[c];
      columnCounts[c] = (columnCounts[c] || 0) + 1;
    }
  }

  const columnAverages = columnSums.map((s, i) =>
    columnCounts[i] > 0 ? roundTo(s / columnCounts[i]) : 0
  );
  const roundedColumnSums = columnSums.map((s) => roundTo(s));

  const overallAverage = totalCount > 0 ? roundTo(totalSum / totalCount) : 0;

  return {
    rows,
    summary: {
      rowCount: rows.length,
      totalCount,
      overallAverage,
      totalSum: roundTo(totalSum),
      columnSums: roundedColumnSums,
      columnAverages,
      maxColumns
    },
    error: null
  };
}

function createEmptySummary(): SummaryData {
  return {
    rowCount: 0,
    totalCount: 0,
    overallAverage: 0,
    totalSum: 0,
    columnSums: [],
    columnAverages: [],
    maxColumns: 0
  };
}
