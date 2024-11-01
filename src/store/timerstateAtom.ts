import { atom } from 'recoil';


type TimerstateAtom = {
  /** タイマーの残り時間 */
  timeRemaining: number;
  /** タイマーが動作中かどうかのフラグ */
  isRunning: boolean;
  /** タイマーが一時停止中かどうかのフラグ */
  isPaused: boolean;
  /** カウントダウンが始まっているかどうかのフラグ */
  isStartCountdown: boolean;
};

/** タイマーの状態を管理するatom */
export const timerstateAtom = atom<TimerstateAtom>({
  key: 'timerstateAtom', // 一意のキー
  default: {
    timeRemaining: 50 * 60, // タイマーの残り時間（デフォルトは50分）
    isRunning: false, // タイマーが動作中かどうかのフラグ
    isPaused: false, // タイマーが一時停止中かどうかのフラグ
    isStartCountdown: false, // カウントダウンが始まっているかどうかのフラグ
  }, // 初期値
});
