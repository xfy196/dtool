export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  healthRisk: string;
}

export interface BmiClassification {
  range: string;
  category: string;
  risk: string;
  color: string;
}

export const CLASSIFICATION_TABLE: BmiClassification[] = [
  {
    range: '< 18.5',
    category: '偏瘦',
    risk: '营养不足风险',
    color: 'text-blue-600'
  },
  {
    range: '18.5 - 23.9',
    category: '正常',
    risk: '健康风险较低',
    color: 'text-green-600'
  },
  {
    range: '24 - 27.9',
    category: '超重',
    risk: '轻度健康风险',
    color: 'text-yellow-600'
  },
  { range: '≥ 28', category: '肥胖', risk: '高健康风险', color: 'text-red-600' }
];

const CATEGORY_MAP: Record<
  BmiCategory,
  { categoryLabel: string; healthRisk: string }
> = {
  underweight: { categoryLabel: '偏瘦', healthRisk: '营养不足风险' },
  normal: { categoryLabel: '正常', healthRisk: '健康风险较低' },
  overweight: { categoryLabel: '超重', healthRisk: '轻度健康风险' },
  obese: { categoryLabel: '肥胖', healthRisk: '高健康风险' }
};

export function calculateBmi(heightCm: number, weightKg: number): BmiResult {
  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    return { bmi: 0, category: 'normal', categoryLabel: '-', healthRisk: '-' };
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  let category: BmiCategory;
  if (bmi < 18.5) {
    category = 'underweight';
  } else if (bmi < 24) {
    category = 'normal';
  } else if (bmi < 28) {
    category = 'overweight';
  } else {
    category = 'obese';
  }

  const { categoryLabel, healthRisk } = CATEGORY_MAP[category];

  return { bmi: rounded, category, categoryLabel, healthRisk };
}

export function getCategoryColor(category: BmiCategory): string {
  switch (category) {
    case 'underweight':
      return 'text-blue-600';
    case 'normal':
      return 'text-green-600';
    case 'overweight':
      return 'text-yellow-600';
    case 'obese':
      return 'text-red-600';
  }
}
