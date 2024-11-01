import { atom } from 'recoil';

export type TimerstateAtom = {
  /** タイマーの残り時間 */
  timeRemaining: number;
  /** タイマーが動作中かどうかのフラグ */
  isRunning: boolean;
  /** タイマーが一時停止中かどうかのフラグ */
  isPaused: boolean;
  /** カウントダウンが始まっているかどうかのフラグ */
  isStartCountdown: boolean;
};

/**
 * タイマーのデフォルト状態
 * @type {TimerstateAtom}
 * @property {number} timeRemaining タイマーの残り時間（デフォルトは50分）
 * @property {boolean} isRunning タイマーが動作中でないことを示す初期フラグ
 * @property {boolean} isPaused タイマーが一時停止中でないことを示す初期フラグ
 * @property {boolean} isStartCountdown カウントダウンが開始されていないことを示す初期フラグ
 */
export const timerstateAtom = atom<TimerstateAtom>({
  key: 'timerstateAtom', // 一意のキー
  default: {
    timeRemaining: 50 * 60, // タイマーの残り時間（デフォルトは50分）
    isRunning: false, // タイマーが動作中かどうかのフラグ
    isPaused: false, // タイマーが一時停止中かどうかのフラグ
    isStartCountdown: false, // カウントダウンが始まっているかどうかのフラグ
  }, // 初期値
});
