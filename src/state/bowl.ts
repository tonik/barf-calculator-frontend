import { atom, selector } from "recoil";

export const bowlState = atom({
  key: "bowlState",
  default: [
    {
      name: "Chicken 🍗",
      value: "chicken",
      id: 1,
      weight: 100,
      fat: 6.0,
      protein: 20,
      type: "meat",
    },
    {
      name: "Chicken 2 🍗",
      value: "chicken-2",
      id: 2,
      weight: 100,
      fat: 4.5,
      protein: 17,
      type: "meat",
    },
    {
      name: "Chicken 3 🍗",
      value: "chicken-3",
      id: 3,
      weight: 100,
      fat: 4.5,
      protein: 17,
      type: "meat",
    },
    {
      name: "Vegetable",
      value: "vegetable",
      id: 4,
      weight: 100,
      fat: 4.5,
      protein: 17,
      type: "vegetable",
    },
  ],
});
