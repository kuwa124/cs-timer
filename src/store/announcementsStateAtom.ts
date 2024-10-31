import { Announcoments } from '@/types/type';
import { atom } from 'recoil';

// アナウンスの設定を管理するatom
export const announcementsStateAtom = atom<Announcoments[]>({
  key: 'announcementsStateAtom', // 一意のキー
  default: [], // 初期値は空の配列（アナウンスが何も設定されていない状態）
});
