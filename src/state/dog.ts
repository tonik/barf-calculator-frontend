import { atom } from "recoil";

export const dogState = atom({
  key: "dogState",
  default: {
    weight: 0,
  },
});

