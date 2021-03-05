import { atom, selector } from "recoil";
import { SuperElementAccessExpression } from "typescript";
import { dogState } from './dog';

interface MeatProductsWeights {
  meatWeight: number;
  offalWeight: number;
  liverWeight: number;
  otherWeight: number;
}

interface Suplement {
  value: number;
  unit: string;
}

interface Suplements {
  [key: string]: Suplement;
}

interface SuplementPercentages {
  [key: string]: number
}
interface Weights {
  dogWeight: number;
  fats: number;
  protein: number;
  meatTotalWeight: number;
  vegetableTotalWeight: number;
  meatProductsWeights: MeatProductsWeights;
  suplements: Suplements;
}

interface Percentages {
  fats: number;
  protein: number;
  meatTotalWeight: number;
  vegetableTotalWeight: number;
  meatProductsWeights: MeatProductsWeights;
  suplements: SuplementPercentages;
}

export const nutritionState = atom({
  key: "nutritionState",
  default: {
    fats: 0,
    protein: 0,
    meatTotalWeight: 0,
    vegetableTotalWeight: 0,
    meatProductsWeights: {
      meatWeight: 0,
      offalWeight: 0,
      liverWeight: 0,
      otherWeight: 0,
    },
    suplements: {
      yeasts: {
        value: 0,
        unit: 'mg'
      },
      iodine: {
        value: 0,
        unit: 'mg'
      },
      taurine: {
        value: 0,
        unit: 'mg'
      },
      omega3: {
        value: 0,
        unit: 'mg'
      },
      vitaminD: {
        value: 0,
        unit: 'IU'
      },
      calcium: {
        value: 0,
        unit: 'g'
      }
    }
  },
});

export const targetNutritionState = selector({
  key: 'targetNutritionState',
  get: ({get}): Weights => {
    const dogWeight = get(dogState).weight;
    const foodWeight: number = dogWeight * 0.03;
    const meatTotalWeight = foodWeight * 0.8;
    const vegetableTotalWeight = foodWeight * 0.2; 
    return {
        dogWeight,
        fats: dogWeight * 3,
        protein: dogWeight * 5,
        meatTotalWeight,
        vegetableTotalWeight,
        meatProductsWeights: {
          meatWeight: meatTotalWeight * 0.6,
          offalWeight: meatTotalWeight * 0.2,
          liverWeight: meatTotalWeight * 0.05,
          otherWeight: meatTotalWeight * 0.15,
        },
        suplements: {
          yeasts: {
            value: foodWeight * 0.01,
            unit: 'mg'
          },
          iodine: {
            value: (foodWeight * 0.3) / 100 * 0.12,
            unit: 'mg'
          },
          taurine: {
            value: dogWeight * 25,
            unit: 'mg'
          },
          omega3: {
            value: dogWeight * 30,
            unit: 'mg'
          },
          vitaminD: {
            value: dogWeight * 10,
            unit: 'IU'
          },
          calcium: {
            value: foodWeight * 7,
            unit: 'g'
          }
        }
    }
  }
})

export const percentNutritionState = selector({
  key: 'percentNutritionState',
  get: ({get}): Percentages => {
    const targetState = get(targetNutritionState);
    const currentState = get(nutritionState);
    return {
      fats: currentState.fats / targetState.fats * 100,
      protein: currentState.fats / targetState.protein * 100,
      meatTotalWeight: currentState.meatTotalWeight / targetState.meatTotalWeight * 100,
      vegetableTotalWeight: currentState.vegetableTotalWeight / targetState.vegetableTotalWeight * 100,
      meatProductsWeights: {
          meatWeight: currentState.meatProductsWeights.meatWeight / targetState.meatProductsWeights.meatWeight * 100,
          offalWeight: currentState.meatProductsWeights.offalWeight / targetState.meatProductsWeights.offalWeight * 100,
          liverWeight: currentState.meatProductsWeights.liverWeight / targetState.meatProductsWeights.liverWeight * 100,
          otherWeight: currentState.meatProductsWeights.otherWeight / targetState.meatProductsWeights.otherWeight * 100
      },
      suplements: {
        yeasts: currentState.suplements.yeasts.value / targetState.suplements.yeasts.value * 100,
        iodine: currentState.suplements.iodine.value / targetState.suplements.iodine.value * 100,
        taurine: currentState.suplements.taurine.value / targetState.suplements.taurine.value * 100,
        omega3: currentState.suplements.omega3.value / targetState.suplements.omega3.value * 100,
        vitaminD: currentState.suplements.vitaminD.value / targetState.suplements.vitaminD.value * 100,
        calcium: currentState.suplements.calcium.value / targetState.suplements.calcium.value * 100
      }
    }
  }
});