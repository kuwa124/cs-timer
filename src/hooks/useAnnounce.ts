import { useCallback } from 'react';

type UseAnnounce = {
  announce: (audioFile: string) => Promise<void>;
  checkAnnouncements: (time: number) => void;
};

export const useAnnounce = (): UseAnnounce => {
  // 音声を再生する関数
  const announce = async (audioFile: string): Promise<void> => {
    // try {
      const audio = new Audio(`/audio/${audioFile}`);

      return new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('音声の再生に失敗しました'));
        audio.play().catch(reject);
      });
    // } catch (error) {
    //   console.error('音声再生エラー:', error);
    //   throw error;
    // }
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

      const announcement = announcements.find((a) => a.time === time);
      // if (announcement) {
      //   announce(announcement.file).catch((error) => {
      //     console.error('アナウンスの再生に失敗しました:', error);
      //   });
      // }
    },
    [announce]
  );

  return { announce, checkAnnouncements };
};
