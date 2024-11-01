import { Announcoments } from '@/types/type';
import { useCallback, useRef } from 'react';

/** 音声キュー(待ち配列）のアイテム型を定義
 *  @property {string} audioFile - 再生する音声ファイル名
 *  @property {() => void} onComplete - 再生完了時に実行するコールバック関数
 */
type QueueItem = {
  /** 再生する音声ファイル名 */
  audioFile: string;
  /** 再生完了時に実行するコールバック関数 */
  onComplete?: () => void;
};

/**
 * 音声通知に関する関数をまとめた型
 * @property {(audioFile: string) => Promise<void>} announce - 音声ファイル名を受け取り、Promiseを返す関数
 * @property {(time: number) => void} checkAnnouncements - 時間（数値）を受け取り、何も返さない関数
 */
type UseAnnounce = {
  // 音声ファイル名を受け取り、Promiseを返す関数
  announce: (audioFile: string) => Promise<void>;
  // 時間（数値）を受け取り、何も返さない関数
  checkAnnouncements: (time: number) => void;
};

// フックの引数として announcements を受け取る
export const useAnnounce = (announcements: Announcoments[]): UseAnnounce => {
  // 音声キューを管理するための参照を作成
  const queueRef = useRef<QueueItem[]>([]);
  // 現在再生中かどうかを管理する参照を作成
  const isPlayingRef = useRef<boolean>(false);

  // キューから次の音声を再生する関数
  const playNext = useCallback(async () => {
    // 再生中の場合は何もしない
    if (isPlayingRef.current) return;
    // キューが空の場合は何もしない
    if (queueRef.current.length === 0) return;

    // キューから次のアイテムを取得
    const nextItem = queueRef.current[0];
    // 再生中フラグを立てる
    isPlayingRef.current = true;

    try {
      // 新しい Audio オブジェクトを作成
      // publicフォルダからの相対パス(publicディレクトリは自動的にルート)
      const audio = new Audio(`/audio/${nextItem.audioFile}`);

      // 音声ファイルが正常にロードされた時のイベントリスナー
      audio.addEventListener('loadeddata', () => {
        console.log('音声ファイルのロードに成功しました:', nextItem.audioFile);
      });

      // 音声ファイルのエラーイベントリスナー
      audio.addEventListener('error', (e: Event) => {
        const audioElement = e.target as HTMLAudioElement;
        console.error('音声ファイルのロード中にエラーが発生:', {
          error: audioElement.error,
          src: audio.src,
          readyState: audio.readyState,
        });
      });

      // 音声再生終了時のイベントリスナー
      audio.addEventListener('ended', () => {
        console.log('音声の再生が完了しました:', nextItem.audioFile);
        // キューから再生済みのアイテムを削除
        queueRef.current.shift();
        // 再生中フラグを下ろす
        isPlayingRef.current = false;
        // コールバックがある場合は実行
        if (nextItem.onComplete) {
          nextItem.onComplete();
        }
        // 次の音声を再生
        playNext();
      });

      // 音声を再生
      await audio.play();
      console.log('音声の再生を開始しました:', nextItem.audioFile);
    } catch (error) {
      // エラーオブジェクトの型を Error として扱う
      const err = error as Error;
      console.error('音声再生エラー:', {
        name: err.name,
        message: err.message,
        file: nextItem.audioFile,
      });
      // エラー発生時もキューから削除して次へ進む
      queueRef.current.shift();
      isPlayingRef.current = false;
      playNext();
    }
  }, []);

  // 音声を再生する関数を定義
  const announce = useCallback(
    async (audioFile: string): Promise<void> => {
      return new Promise((resolve) => {
        // キューに音声を追加
        queueRef.current.push({
          audioFile,
          onComplete: resolve,
        });
        // キューの再生を開始
        playNext();
      });
    },
    [playNext]
  );

  // アナウンスのタイミングをチェックする関数
  const checkAnnouncements = useCallback(
    (time: number) => {
      // 現在の時間に一致するアナウンスを検索
      const announcement = announcements.find((a) => a.time === time);

      // アナウンスが見つかった場合、対応する音声を再生
      if (announcement) {
        console.log('一致する音声ファイルが見つかりました:', announcement.file);
        announce(announcement.file).catch((error) => {
          console.error('アナウンス再生エラー:', error);
        });
      }
    },
    [announce, announcements]
  );

  return { announce, checkAnnouncements };
};
