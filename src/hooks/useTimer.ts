import { useAnnounce } from '@/hooks/useAnnounce';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimer = {
  timeRemaining: number; // 残り時間（秒）
  isRunning: boolean; // タイマーが実行中かどうか
  isPaused: boolean; // タイマーが一時停止中かどうか
  startTimer: () => void; // タイマーを開始する関数
  pauseTimer: () => void; // タイマーを一時停止する関数
  stopTimer: () => void; // タイマーを停止する関数
  formatTime: (seconds: number) => string; // 時間をフォーマットする関数
};

export const useTimer = (): UseTimer => {
  const [timeRemaining, setTimeRemaining] = useState<number>(50 * 60); // 残り時間の状態（秒）50分を秒に変換
  const [isRunning, setIsRunning] = useState<boolean>(false); // タイマーが動作中かどうか
  const [isPaused, setIsPaused] = useState<boolean>(false); // 一時停止中かどうか
  const [isStartCountdown, setIsStartCountdown] = useState<boolean>(false); // 開始前のカウントダウン中かどうか

  // タイマーのインターバルを保持するref
  // useRefを使うことで、値が変更されても再レンダリングが発生しない
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 最後にアナウンスした時間を記録するref
  // 二重再生を防ぐために使用
  const lastAnnouncementTimeRef = useRef<number | null>(null);

  // アナウンス機能のフックを使用
  const { announce, checkAnnouncements } = useAnnounce();

  // 指定された時間(ミリ秒)だけ待機する関数
  // Promiseを使って非同期の待機処理を実現します
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // タイマー更新とアナウンスチェックを分離するためのeffect
  // 時間が変化したときのみアナウンスをチェックします
  useEffect(() => {
    if (isRunning && !isPaused) {
      // 現在の時間が最後のアナウンス時間と異なる場合のみチェック
      // これにより二重再生を防ぎます
      if (timeRemaining !== lastAnnouncementTimeRef.current) {
        lastAnnouncementTimeRef.current = timeRemaining;
        checkAnnouncements(timeRemaining);
      }
    }
  }, [timeRemaining, isRunning, isPaused, checkAnnouncements]);

  // タイマーを開始する関数
  // async/awaitを使用して音声の再生を順番に行います
  const startTimer = useCallback(async () => {
    if (!isRunning && !isStartCountdown) {
      try {
        // カウントダウン開始の状態をセット
        setIsStartCountdown(true);

        // 開始時のアナウンスを順番に再生
        await announce('01_ready.wav'); // 「準備」の音声を再生
        await sleep(2000); // 2秒待機
        await announce('02_start.wav'); // 「スタート」の音声を再生

        // タイマー開始の準備
        setIsStartCountdown(false);
        setIsRunning(true);

        // 1秒ごとにタイマーを更新するインターバルを設定
        intervalRef.current = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime <= 0) {
              // タイマーが0になったら終了処理
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              announce('08_end.wav'); // 終了の音声を再生
              return 0;
            }
            return prevTime - 1; // 1秒減らす
          });
        }, 1000);
      } catch (error) {
        // エラーが発生した場合の処理
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
  }, [isRunning, isPaused, announce]);

  // タイマーを一時停止する関数
  const pauseTimer = useCallback(() => {
    // インターバルをクリアして一時停止状態にする
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
  }, []);

  // タイマーを停止してリセットする関数
  const stopTimer = useCallback(() => {
    // タイマーを完全に停止し、すべての状態を初期値に戻す
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(50 * 60); // 50分にリセット
    lastAnnouncementTimeRef.current = null; // アナウンス時間もリセット
  }, []);

  // 時間をフォーマットする関数
  // 秒数を「分:秒」の形式に変換します
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60); // 分を計算
    const remainingSeconds = seconds % 60; // 残りの秒を計算
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // 10秒未満の場合は0を付加
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
