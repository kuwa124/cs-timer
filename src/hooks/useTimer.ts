import { useAnnounce } from '@/hooks/useAnnounce';
import { announcementsStateAtom } from '@/store/announcementsStateAtom';
import { isEndingStateAtom } from '@/store/isEndingStateAtom';
import { lastAnnouncementTimeStateAtom } from '@/store/lastAnnouncementTimeStateAtom';
import { TimerstateAtom, timerstateAtom } from '@/store/timerstateAtom';
import { Announcoments } from '@/types/type';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

type UseTimer = {
  timerstate: TimerstateAtom;
  startTimer: () => void; // タイマーを開始する関数
  pauseTimer: () => void; // タイマーを一時停止する関数
  stopTimer: () => void; // タイマーを停止する関数
  formatTime: (seconds: number) => string; // 時間を「分:秒」形式にフォーマットする関数
};

export const useTimer = (announcements: Announcoments[]): UseTimer => {
  const [timerstate, setTimerstate] = useRecoilState(timerstateAtom);
  const [lastAnnouncementTimeState, setLastAnnouncementTimeState] =
    useRecoilState(lastAnnouncementTimeStateAtom);
  const [isEndingState, setIsEndingState] = useRecoilState(isEndingStateAtom);
  const [, setAnnouncementsState] = useRecoilState(
    announcementsStateAtom
  );

  // setInterval のIDを保持するref
  // useRefを使用することで、値が変更されても再レンダリングが発生しない
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // アナウンス機能を使用
  const { announce, checkAnnouncements } = useAnnounce(announcements);

  // 初期化時にアナウンスを設定
  useEffect(() => {
    setAnnouncementsState(announcements);
  }, [announcements, setAnnouncementsState]);

  // 指定された時間(ミリ秒)だけ待機する関数
  // Promiseを使って非同期の待機処理を実現します
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // タイマー終了時の処理を行う関数
  const handleTimerEnd = useCallback(async () => {
    // 終了処理が既に実行されている場合は処理をスキップ
    if (isEndingState) return;

    // 終了処理フラグを立てる
    setIsEndingState(true);

    // インターバルをクリア
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // 終了アナウンスを再生
    await announce('08_end.wav');

    // タイマーを停止させる
    setTimerstate((prev) => ({
      ...prev,
      isRunning: false,
    }));

    // タイマーの状態をリセット（終了してない）
    setIsEndingState(false);
  }, [announce]);

  // タイマーを開始する関数
  // async/awaitを使用して音声の再生を順番に行います
  const startTimer = useCallback(async () => {
    // タイマーが未実行で、開始前カウントダウンも行われていない場合
    if (!timerstate.isRunning && !timerstate.isStartCountdown) {
      try {
        setTimerstate((prev) => ({ ...prev, isStartCountdown: true }));

        // 開始時の音声を順番に再生
        await announce('01_ready.wav'); // 「準備」音声
        await sleep(2000); // 2秒待機
        await announce('02_start.wav'); // 「スタート」音声

        // タイマー開始
        setTimerstate((prev) => ({
          ...prev,
          isStartCountdown: false,
          isRunning: true,
          isPaused: false,
        }));

        // 1秒ごとにタイマーを更新
        intervalRef.current = setInterval(() => {
          setTimerstate((prev) => ({
            ...prev,
            // Math.max()は0と指定された数値を比較して大きい方を返すため、タイマーが0以下にならず、if文なしでシンプルに書けます
            timeRemaining: Math.max(0, prev.timeRemaining - 1),
          }));
        }, 1000);
      } catch (error) {
        // エラーが発生した場合の処理
        console.error('音声再生エラー:', error);
        setTimerstate((prev) => ({ ...prev, isStartCountdown: false }));
      }
    } else if (timerstate.isPaused) {
      // 一時停止中の場合、タイマーを再開
      setTimerstate((prev) => ({ ...prev, isPaused: false }));
      intervalRef.current = setInterval(() => {
        setTimerstate((prev) => ({
          ...prev,
          // Math.max()は0と指定された数値を比較して大きい方を返すため、タイマーが0以下にならず、if文なしでシンプルに書けます
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
    }
  }, [
    timerstate.isRunning,
    timerstate.isPaused,
    timerstate.isStartCountdown,
    setTimerstate,
    announce,
  ]);

  // タイマーを一時停止する関数
  const pauseTimer = useCallback(() => {
    // インターバルをクリアして一時停止状態にする
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // インターバルをクリア
    }
    setTimerstate((prev) => ({
      ...prev,
      isPaused: true,
    })); // 一時停止状態にする
  }, [setTimerstate]);

  // タイマーを停止してリセットする関数
  const stopTimer = useCallback(() => {
    // タイマーを完全に停止し、すべての状態を初期値に戻す
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // インターバルをクリア
    }
    // すべての状態を初期値にリセット
    setTimerstate({
      timeRemaining: 50 * 60,
      isRunning: false,
      isPaused: false,
      isStartCountdown: false,
    });
    setLastAnnouncementTimeState(null);
    setIsEndingState(false);
  }, [setTimerstate, setLastAnnouncementTimeState, setIsEndingState]);

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
    if (timerstate.isRunning && !timerstate.isPaused) {
      // 前回のアナウンス時間と異なる場合のみチェック（二重再生防止）
      if (timerstate.timeRemaining !== lastAnnouncementTimeState) {
        setLastAnnouncementTimeState(timerstate.timeRemaining);
        // 残り時間に応じたアナウンスをチェック
        checkAnnouncements(timerstate.timeRemaining);

        // タイマーが0になった場合の処理
        if (timerstate.timeRemaining === 0) {
          handleTimerEnd();
        }
      }
    }
  }, [
    timerstate.timeRemaining,
    timerstate.isRunning,
    timerstate.isPaused,
    lastAnnouncementTimeState,
    setLastAnnouncementTimeState,
    checkAnnouncements,
    handleTimerEnd,
  ]);

  return {
    timerstate,
    startTimer,
    pauseTimer,
    stopTimer,
    formatTime,
  };
};
