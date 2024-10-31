import { atom } from 'recoil';

// タイマー終了フラグを管理するatom
export const isEndingStateAtom = atom<boolean>({
  key: 'isEndingStateAtom', // 一意のキー
  default: false, // 初期値はfalse（タイマーがまだ終了していない状態）
});
