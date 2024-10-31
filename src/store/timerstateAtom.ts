import { atom } from 'recoil';

type Timerstate = {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  isStartCountdown: boolean;
};

export const timerstateAtom = atom<Timerstate>({
  key: 'timerstate', // 一意のキー
  default: {
    timeRemaining: 50 * 60, // タイマーの残り時間（デフォルトは50分）
    isRunning: false, // タイマーが動作中かどうかのフラグ
    isPaused: false, // タイマーが一時停止中かどうかのフラグ
    isStartCountdown: false, // カウントダウンが始まっているかどうかのフラグ
  }, // 初期値
});
