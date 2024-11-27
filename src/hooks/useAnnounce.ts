import { Announcoments } from '@/types/type';
import { useCallback, useEffect, useRef } from 'react';

// 音声キューのアイテムの型定義
type QueueItem = {
  audioFile: string; // 再生する音声ファイルのパス
  onComplete?: () => void; // 再生完了時のコールバック関数
};

// フックが返す関数の型定義
type UseAnnounce = {
  announce: (audioFile: string) => Promise<void>; // 音声ファイル名を受け取り、Promiseを返す関数
  checkAnnouncements: (time: number) => void; // アナウンスチェック関数
};

export const useAnnounce = (announcements: Announcoments[]): UseAnnounce => {
  // 音声ファイルのキャッシュを管理するRef
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  // 再生待ちの音声キューを管理するRef
  const queueRef = useRef<QueueItem[]>([]);
  // 現在音声を再生中かどうかを管理するRef
  const isPlayingRef = useRef<boolean>(false);

  // 音声ファイルを事前にロードする関数
  const preloadAudio = useCallback((audioPath: string) => {
    // まだキャッシュされていない場合のみ実行
    if (!audioCache.current.has(audioPath)) {
      // 新しいAudioオブジェクトを作成
      const audio = new Audio(`/audio${audioPath}`);
      audio.preload = 'auto'; // 音声を積極的にプリロード
      // キャッシュに保存
      audioCache.current.set(audioPath, audio);
    }
  }, []);

  // アナウンスで使用される音声ファイルを事前にロード
  useEffect(() => {
    // 全てのアナウンスの音声ファイルをプリロード
    announcements.forEach((announcement) => {
      preloadAudio(announcement.file);
    });
  }, [announcements, preloadAudio]);

  // キューから次の音声を再生する関数
  const playNext = useCallback(async () => {
    // 既に再生中か、キューが空の場合は何もしない
    if (isPlayingRef.current || queueRef.current.length === 0) return;

    // キューの先頭のアイテムを取得
    const nextItem = queueRef.current[0];
    // 再生中フラグを立てる
    isPlayingRef.current = true;

    try {
      // キャッシュされた音声を取得するか、新しく作成
      let audio = audioCache.current.get(nextItem.audioFile);
      if (!audio) {
        audio = new Audio(`/audio/${nextItem.audioFile}`);
        audioCache.current.set(nextItem.audioFile, audio);
      }

      // 音声再生終了時の処理

      audio.addEventListener(
        'ended',
        () => {
          queueRef.current.shift(); // キューから再生済みのアイテムを削除
          isPlayingRef.current = false; // 再生フラグをオフ
          // コールバックがある場合は実行
          if (nextItem.onComplete) {
            nextItem.onComplete(); // 完了コールバックを実行
          }
          playNext(); // 次の音声を再生
        },
        { once: true }
      ); // イベントリスナーは1回だけ実行
      // 音声を再生
      await audio.play();
    } catch {
      // エラー発生時もキューから削除して次へ進む
      queueRef.current.shift(); //再生し終わった音声をキューから削除
      isPlayingRef.current = false; // 再生中フラグをオフ
      // 次の音声を再生
      playNext();
    }
  }, []);

  // 音声を再生キューに追加する関数
  const announce = useCallback(
    async (audioFile: string): Promise<void> => {
      return new Promise((resolve) => {
        queueRef.current.push({
          audioFile,
          onComplete: resolve,
        });
        playNext();
      });
    },
    [playNext]
  );

  // 指定された時間のアナウンスをチェックして再生する関数
  const checkAnnouncements = useCallback(
    (time: number) => {
      // 現在の時間に一致するアナウンスを検索
      const announcement = announcements.find((a) => a.time === time);

      // アナウンスが見つかった場合、対応する音声を再生
      if (announcement) {
        announce(announcement.file);
      }
    },
    [announce, announcements]
  );

  return { announce, checkAnnouncements };
};
