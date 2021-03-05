import { atom, selector } from "recoil";
import { groupBy } from "lodash-es";

type FoodProduct = {
  name: string;
  value: string;
  id: number;
  weight: number;
  fat: number;
  protein: number;
  type: string;
};

export const bowlState = atom({
  key: "bowlState",
  default: [] as FoodProduct[],
});

export const bowlGroupedByTypeState = selector({
  key: "bowlGroupedByTypeState",
  get: ({ get }) => {
    const bowl = get(bowlState);

    return groupBy(bowl, (product: any) => product.type);
  },
});
