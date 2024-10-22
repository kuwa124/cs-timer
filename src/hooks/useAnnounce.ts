import axios from 'axios';
import { useCallback } from 'react';

type UseAnnounce = {
  announce: (message: string) => Promise<void>;
  checkAnnouncements: (time: number) => void;
};

// アナウンス機能のカスタムフック
export const useAnnounce = (): UseAnnounce => {
  // アナウンスを行う関数
  const announce = useCallback(async (message: string): Promise<void> => {
    try {
      const response = await axios.post(
        '/api/voicevox/audio/',
        {
          text: message,
          speaker: 1,
          format: 'wav',
        },
        {
          responseType: 'arraybuffer',
        }
      );

      // 音声データを再生
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(response.data);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      return new Promise<void>((resolve) => {
        source.onended = () => resolve();
        source.start(0);
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.message === 'Network Error') {
        console.error(
          'CORS エラーが発生しました。API へのアクセスが制限されています。'
        );
        // ユーザーにフレンドリーなエラーメッセージを表示
      } else {
        console.error('予期せぬエラーが発生しました:', error);
      }
      throw error; // エラーを再スローして、呼び出し元で処理できるようにする
    }
  }, []);

  // アナウンスのタイミングをチェックする関数
  const checkAnnouncements = useCallback(
    (time: number) => {
      const announcements = [
        { time: 3602 - 30 * 60, message: '30分経過しました' },
        { time: 3602 - 40 * 60, message: 'Word3級のかた、10分前です' },
        { time: 3602 - 45 * 60, message: 'Word3級のかた、5分前です' },
        { time: 3602 - 47 * 60, message: 'Word3級のかた、3分前です' },
        { time: 3602 - 49 * 60, message: 'Word3級のかた、1分前です' },
        {
          time: 3602 - 50 * 60,
          message: 'Word3級のかた、終了です。2級のかた、10分前です',
        },
        { time: 3602 - 55 * 60, message: '5分前です' },
        { time: 3602 - 57 * 60, message: '3分前です' },
        { time: 3602 - 59 * 60, message: '1分前です' },
      ];

      const announcement = announcements.find((a) => a.time === time);
      if (announcement) {
        announce(announcement.message).catch((error) => {
          console.error('アナウンスの再生に失敗しました:', error);
        });
      }
    },
    [announce]
  );

  return { announce, checkAnnouncements };
};
