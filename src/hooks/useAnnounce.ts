import { useCallback } from 'react';

type UseAnnounce = {
  // 音声ファイル名を受け取り、何も返さない関数
  announce: (audioFile: string) => void;
  // 時間（数値）を受け取り、何も返さない関数
  checkAnnouncements: (time: number) => void;
};

export const useAnnounce = (): UseAnnounce => {
  // 音声を再生する関数を定義
  // audioFile: 再生する音声ファイルの名前を受け取る
  const announce = (audioFile: string): void => {
    // 新しい Audio オブジェクトを作成（指定された音声ファイルを読み込む）
    const audio = new Audio(`/audio/${audioFile}`);
    // 音声を再生
    audio.play();
  };

  // アナウンスのタイミングをチェックする関数
  const checkAnnouncements = useCallback(
    (time: number) => {
      const announcements = [
        // 50分（3000秒）から経過した分数後にアナウンス
        // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
        { time: 3000 - 10 * 60, file: '03_10minProgress.wav' },
        { time: 3000 - 35 * 60, file: '04_35minProgress.wav' },
        { time: 3000 - 45 * 60, file: '05_5minutesAgo.wav' },
        { time: 3000 - 47 * 60, file: '06_3minutesAgo.wav' },
        { time: 3000 - 49 * 60, file: '07_1minutesAgo.wav' },
      ];

      // 現在の時間に一致するアナウンスを検索
      const announcement = announcements.find((a) => a.time === time);
      // アナウンスが見つかった場合、対応する音声を再生
      if (announcement) {
        announce(announcement.file);
      }
    },
    [announce]
  );

  return { announce, checkAnnouncements };
};
