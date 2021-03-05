import { atom, selector } from "recoil";
import { dogState } from './dog';

interface MeatProductsWeights {
  meatWeight: number;
  offalWeight: number;
  liverWeight: number;
  otherWeight: number;
}

interface Weights {
  dogWeight: number;
  fats: number;
  protein: number;
  meatTotalWeight: number;
  vegetableTotalWeight: number;
  meatProductsWeights: MeatProductsWeights;
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
    }
  }
})