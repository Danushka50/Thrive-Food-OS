import type { PlateItemMacros, ThriveIngredient, ThriveIngredientQuantity } from '../types/types';

type NutritionRecord = Record<string, unknown>;

const ZERO_MACROS: PlateItemMacros = {
  protein: 0,
  carbs: 0,
  fats: 0,
  kcal: 0,
};

const NUTRITION_CONTAINER_KEYS = [
  'nutrition',
  'nutrition_info',
  'nutrition_facts',
  'nutritional_info',
  'nutritional_values',
  'macros',
  'macro',
  'macro_totals',
  'nutrients',
  'values',
] as const;

const MACRO_FIELD_KEYS = {
  protein: {
    direct: [
      'protein',
      'proteins',
      'protein_g',
      'proteins_g',
      'protein_grams',
      'proteinGrams',
    ],
    per100: ['protein_per_100g', 'proteinPer100g', 'proteins_per_100g'],
  },
  carbs: {
    direct: [
      'carbs',
      'carbohydrates',
      'carb',
      'carbs_g',
      'carbohydrates_g',
      'carbs_grams',
      'carbohydrate_grams',
      'carbsGrams',
      'carbohydratesGrams',
    ],
    per100: [
      'carbs_per_100g',
      'carbohydrates_per_100g',
      'carbsPer100g',
      'carbohydratesPer100g',
    ],
  },
  fats: {
    direct: ['fat', 'fats', 'fat_g', 'fats_g', 'fat_grams', 'fats_grams', 'fatGrams', 'fatsGrams'],
    per100: ['fat_per_100g', 'fats_per_100g', 'fatPer100g', 'fatsPer100g'],
  },
  kcal: {
    direct: ['kcal', 'calories', 'energy', 'energy_kcal', 'calories_kcal', 'kcal_total', 'kcalTotal'],
    per100: [
      'kcal_per_100g',
      'calories_per_100g',
      'energy_per_100g',
      'kcalPer100g',
      'caloriesPer100g',
    ],
  },
} as const;

const isRecord = (value: unknown): value is NutritionRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const matchedValue = value.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    if (matchedValue) {
      return Number(matchedValue[0]);
    }
  }

  return null;
};

const inferQuantityGrams = (quantity: ThriveIngredientQuantity | null) => {
  if (!quantity) {
    return 0;
  }

  if (typeof quantity.quantity_grams === 'number' && Number.isFinite(quantity.quantity_grams)) {
    return quantity.quantity_grams;
  }

  const matchedValue = quantity.quantity_value.match(/(\d+(?:\.\d+)?)\s*g/i);
  return matchedValue ? Number(matchedValue[1]) : 0;
};

const getNutritionRecords = (source: unknown): NutritionRecord[] => {
  if (!isRecord(source)) {
    return [];
  }

  const nestedRecords = NUTRITION_CONTAINER_KEYS.flatMap((key) => {
    const nestedValue = source[key];

    if (Array.isArray(nestedValue)) {
      return nestedValue.filter(isRecord);
    }

    return isRecord(nestedValue) ? [nestedValue] : [];
  });

  return [source, ...nestedRecords];
};

const readMacroValue = (
  records: NutritionRecord[],
  directKeys: readonly string[],
  per100Keys: readonly string[],
  quantityGrams: number,
) => {
  for (const record of records) {
    for (const key of directKeys) {
      const matchedValue = toNumber(record[key]);
      if (matchedValue !== null) {
        return matchedValue;
      }
    }

    if (quantityGrams > 0) {
      for (const key of per100Keys) {
        const matchedValue = toNumber(record[key]);
        if (matchedValue !== null) {
          return (matchedValue * quantityGrams) / 100;
        }
      }
    }
  }

  return 0;
};

export const createEmptyMacros = (): PlateItemMacros => ({ ...ZERO_MACROS });

export const getPlateItemMacros = (
  ingredient: ThriveIngredient,
  quantity: ThriveIngredientQuantity | null,
): PlateItemMacros => {
  const quantityGrams = inferQuantityGrams(quantity);
  const nutritionRecords = [
    ...getNutritionRecords(quantity),
    ...getNutritionRecords(ingredient),
    ...getNutritionRecords(ingredient.default_quantity),
  ];

  return {
    protein: readMacroValue(
      nutritionRecords,
      MACRO_FIELD_KEYS.protein.direct,
      MACRO_FIELD_KEYS.protein.per100,
      quantityGrams,
    ),
    carbs: readMacroValue(
      nutritionRecords,
      MACRO_FIELD_KEYS.carbs.direct,
      MACRO_FIELD_KEYS.carbs.per100,
      quantityGrams,
    ),
    fats: readMacroValue(
      nutritionRecords,
      MACRO_FIELD_KEYS.fats.direct,
      MACRO_FIELD_KEYS.fats.per100,
      quantityGrams,
    ),
    kcal: readMacroValue(
      nutritionRecords,
      MACRO_FIELD_KEYS.kcal.direct,
      MACRO_FIELD_KEYS.kcal.per100,
      quantityGrams,
    ),
  };
};
