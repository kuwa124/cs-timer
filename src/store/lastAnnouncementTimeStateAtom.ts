import { atom } from 'recoil';

export const lastAnnouncementTimeStateAtom = atom<number | null>({
  key: 'lastAnnouncementTimeStateAtom', // 一意のキー
  default: null, // 初期値はnull（まだアナウンスが行われていない状態）
});
