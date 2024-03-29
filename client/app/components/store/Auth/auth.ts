import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "user",
  default: {
    id: null,
  },
  effects_UNSTABLE: [persistAtom],
});
