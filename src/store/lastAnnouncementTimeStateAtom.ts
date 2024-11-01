import { atom } from 'recoil';

/** 最後のアナウンス時間を管理するatom */
export const lastAnnouncementTimeStateAtom = atom<number | null>({
  key: 'lastAnnouncementTimeStateAtom', // 一意のキー
  default: null, // 初期値はnull（まだアナウンスが行われていない状態）
});
