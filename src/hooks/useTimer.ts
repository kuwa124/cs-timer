// 必要なモジュールをインポート
import { useAnnounce } from '@/hooks/useAnnounce';
import { useCallback, useRef, useState } from 'react';

// タイマーフックの戻り値の型定義
type UseTimer = {
  timeRemaining: number; // 残り時間（秒）
  isRunning: boolean; // タイマーが実行中かどうか
  isPaused: boolean; // タイマーが一時停止中かどうか
  startTimer: () => void; // タイマーを開始する関数
  pauseTimer: () => void; // タイマーを一時停止する関数
  stopTimer: () => void; // タイマーを停止する関数
  formatTime: (seconds: number) => string; // 時間をフォーマットする関数
};

// タイマーのカスタムフック
export const useTimer = (): UseTimer => {
  // 残り時間の状態（秒）
  const [timeRemaining, setTimeRemaining] = useState<number>(50 * 60);

  // タイマーが実行中かどうかの状態
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // タイマーが一時停止中かどうかの状態
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // setIntervalの参照を保持するためのref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // アナウンス機能のフックを使用
  const { announce, checkAnnouncements } = useAnnounce();

  // 開始前のカウントダウン状態を追加
  const [isStartCountdown, setIsStartCountdown] = useState<boolean>(false);

  // 指定された時間(ミリ秒)だけ待機する関数
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // タイマーを開始する関数
  const startTimer = useCallback(async () => {
    if (!isRunning && !isStartCountdown) {
      try {
        // カウントダウン開始
        setIsStartCountdown(true);

        // 最初の音声を再生
        await announce('01_ready.wav');

        // 5秒間待機
        await sleep(2000);

        // 2番目の音声を再生
        await announce('02_start.wav');

        // タイマー開始
        setIsStartCountdown(false);
        setIsRunning(true);

        // インターバルを設定
        intervalRef.current = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime <= 0) {
              // タイマーが0になったら終了
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              announce('end.wav');
              return 0;
            }
            // アナウンスのチェック
            checkAnnouncements(prevTime);
            return prevTime - 1;
          });
        }, 1000);
      } catch (error) {
        // エラーハンドリング
        console.error('音声再生エラー:', error);
        setIsStartCountdown(false);
      }
    } else if (isPaused) {
      // 一時停止中の場合、タイマーを再開
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
  }, [isRunning, isPaused, announce, checkAnnouncements]); // 依存配列を正しく指定

  // タイマーを一時停止する関数
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
  }, []);

  // タイマーを停止してリセットする関数
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(60 * 60);
  }, []);

  // 時間をフォーマットする関数
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }, []);

  // フックの戻り値を返す
  return {
    timeRemaining,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    stopTimer,
    formatTime,
  };
};
