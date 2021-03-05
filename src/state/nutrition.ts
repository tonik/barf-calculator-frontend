import { atom, selector } from "recoil";

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
