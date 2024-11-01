import { atom } from 'recoil';

/** タイマー終了フラグを管理するatom
 *  終了アナウンスの二重再生を防止
 */
export const isEndingStateAtom = atom<boolean>({
  key: 'isEndingStateAtom', // 一意のキー
  default: false, // 初期値はfalse（タイマーがまだ終了していない状態）
});
