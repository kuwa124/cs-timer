import { atom } from 'recoil';

/** 最後のアナウンス時間を管理するatom
 *  同じ時間での二重アナウンスを防止
 */
export const lastAnnouncementTimeStateAtom = atom<number | null>({
  key: 'lastAnnouncementTimeStateAtom', // 一意のキー
  default: null, // 初期値はnull（まだアナウンスが行われていない状態）
});
