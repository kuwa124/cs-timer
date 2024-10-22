import { useAnnounce } from '@/hooks/useAnnounce';
import { useCallback, useRef, useState } from 'react';

type UseTimer = {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  formatTime: (seconds: number) => string;
};

// タイマーのカスタムフック
export const useTimer = (): UseTimer => {
  // 残り時間の状態（秒）
  const [timeRemaining, setTimeRemaining] = useState<number>(60 * 60);
  // タイマーが実行中かどうかの状態
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // タイマーが一時停止中かどうかの状態
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // setIntervalの参照を保持するためのref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // アナウンス機能のフックを使用
  const { announce, checkAnnouncements } = useAnnounce();

  // 開始前のカウントダウン状態を追加
  const [isStartCountdown, setIsStartCountdown] = useState(false);

  // タイマーを開始する関数を修正
  const startTimer = useCallback(() => {
    if (!isRunning && !isStartCountdown) {
      // カウントダウン開始
      setIsStartCountdown(true);
      announce('それでは、計測を始めます。よーい、スタート').then(() => {
        // アナウンス終了後にタイマーを開始
        setIsStartCountdown(false);
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime <= 0) {
              // タイマーが0になったら終了
              clearInterval(intervalRef.current!);
              announce('終了です');
              return 0;
            }
            // アナウンスのチェック
            checkAnnouncements(prevTime);
            return prevTime - 1;
          });
        }, 1000);
      });
    } else if (isPaused) {
      // 一時停止中の場合、タイマーを再開
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
  }, [isRunning, isPaused, announce, checkAnnouncements]);

  // タイマーを一時停止する関数
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPaused(true);
  }, []);

  // タイマーを停止してリセットする関数
  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
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
