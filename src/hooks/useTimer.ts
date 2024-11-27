import { useAnnounce } from '@/hooks/useAnnounce';
import { TimerProps } from '@/types/type';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimer = {
  timeRemaining: number; // 残り時間（秒）
  isRunning: boolean; // タイマーが実行中かどうか
  isPaused: boolean; // タイマーが一時停止中かどうか
  startTimer: () => void; // タイマーを開始する関数
  pauseTimer: () => void; // タイマーを一時停止する関数
  stopTimer: () => void; // タイマーを停止する関数
  formatTime: (seconds: number) => string; // 時間を「分:秒」形式にフォーマットする関数
  elapsedMinutes: number; //経過時間（分）
};

export const useTimer = ({
  announcements,
  time = 3000,
  readySound = '/common/01_ready.wav',
  endSound = '/common/08_end.wav',
}: TimerProps): UseTimer => {
  const [timeRemaining, setTimeRemaining] = useState<number>(time); // 残り時間の状態（秒）50分を秒に変換(50分*60秒=3000秒)
  const [isRunning, setIsRunning] = useState<boolean>(false); // タイマーが動作中かどうか
  const [isPaused, setIsPaused] = useState<boolean>(false); // 一時停止中かどうか
  const [isStartCountdown, setIsStartCountdown] = useState<boolean>(false); // 開始前のカウントダウン中かどうか
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0); //経過時間の状態

  // setInterval のIDを保持するref
  // useRefを使用することで、値が変更されても再レンダリングが発生しない
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 最後にアナウンスした時間を記録するref
  // 同じ時間での二重アナウンスを防止
  const lastAnnouncementTimeRef = useRef<number | null>(null);

  // タイマー終了フラグを保持するref
  // 終了アナウンスの二重再生を防止
  const isEndingRef = useRef<boolean>(false);

  // アナウンス機能を使用
  const { announce, checkAnnouncements } = useAnnounce(announcements);

  // 指定された時間(ミリ秒)だけ待機する関数
  // Promiseを使って非同期の待機処理を実現します
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // タイマー終了時の処理を行う関数
  const handleTimerEnd = useCallback(async () => {
    // 終了処理が既に実行されている場合は処理をスキップ
    if (isEndingRef.current) return;

    try {
      // 終了処理フラグを立てる
      isEndingRef.current = true;

      // インターバルをクリア
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // 終了アナウンスを再生
      await announce(endSound);

      // タイマーの状態をリセット
      setIsRunning(false);
    } finally {
      // 終了フラグをリセット（エラーが発生しても必ず実行）
      isEndingRef.current = false;
    }
  }, [announce]);

  // タイマーを開始する関数
  // async/awaitを使用して音声の再生を順番に行います
  const startTimer = useCallback(async () => {
    // タイマーが未実行で、開始前カウントダウンも行われていない場合
    if (!isRunning && !isStartCountdown) {
      try {
        setIsStartCountdown(true); // カウントダウン開始

        // 開始時の音声を順番に再生
        await announce(readySound); // 「準備」音声
        await sleep(2000); // 2秒待機
        await announce('/common/02_start.wav'); // 「スタート」音声

        // タイマー開始
        setIsStartCountdown(false);
        setIsRunning(true);

        // 1秒ごとにタイマーを更新
        intervalRef.current = setInterval(() => {
          setTimeRemaining((prev) => Math.max(0, prev - 1));
        }, 1000);
        // } catch (error) {
        //   // エラーが発生した場合の処理
        //   console.error('音声再生エラー:', error);
        //   setIsStartCountdown(false);
        // }
      } finally {
        // エラーが発生しても、カウントダウン状態はリセット
        if (isStartCountdown) {
          setIsStartCountdown(false);
        }
      }
    } else if (isPaused) {
      // 一時停止中の場合、タイマーを再開
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
  }, [isRunning, isPaused, announce]);

  // タイマーを一時停止する関数
  const pauseTimer = useCallback(() => {
    // インターバルをクリアして一時停止状態にする
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // インターバルをクリア
    }
    setIsPaused(true); // 一時停止状態にする
  }, []);

  // タイマーを停止してリセットする関数
  const stopTimer = useCallback(() => {
    // タイマーを完全に停止し、すべての状態を初期値に戻す
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // インターバルをクリア
    }
    // すべての状態を初期値にリセット
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(time); // 50分にリセット
    lastAnnouncementTimeRef.current = null; // アナウンス時間もリセット
    isEndingRef.current = false; // 終了フラグもリセット
  }, []);

  // 時間をフォーマットする関数
  // 秒数を「分:秒」の形式に変換します
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60); // 分を計算
    const remainingSeconds = seconds % 60; // 残りの秒を計算
    // 秒が1桁の場合は先頭に0を付加
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // 10秒未満の場合は0を付加
  }, []);

  // タイマーの時間更新とアナウンスのチェックを行うeffect
  useEffect(() => {
    if (isRunning && !isPaused) {
      // 経過時間（分）を計算
      const totalElapsedSeconds = time - timeRemaining; //合計時間から経過時間を減算
      const currentElapsedMinutes = Math.floor(totalElapsedSeconds / 60); //秒数を60で割って、経過分数を計算（小数点以下切り捨て）
      setElapsedMinutes(currentElapsedMinutes); //経過分数を代入

      // 前回のアナウンス時間と異なる場合のみチェック（二重再生防止）
      if (timeRemaining !== lastAnnouncementTimeRef.current) {
        lastAnnouncementTimeRef.current = timeRemaining;

        // 残り時間に応じたアナウンスをチェック
        checkAnnouncements(timeRemaining);

        // タイマーが0になった場合の処理
        if (timeRemaining === 0) {
          handleTimerEnd();
        }
      }
    }
  }, [timeRemaining, isRunning, isPaused, checkAnnouncements, handleTimerEnd]);

  return {
    timeRemaining,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    stopTimer,
    formatTime,
    elapsedMinutes,
  };
};
