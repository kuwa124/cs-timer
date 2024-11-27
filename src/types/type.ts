/** 再生する音声ファイルの型
 * @property {number} time - 経過時間（秒）
 * @property {string} file - 再生するファイルのパス*/
export type Announcoments = {
  /** 経過時間（秒） */
  time: number;
  /** 再生するファイルのパス*/
  file: string;
};

/** タイトルの型定義
 * @property {string} subject - 画面に表示する科目名やカテゴリーの文字列
 * @property {string} level - 試験のレベルを表す文字列（例: "3" など）
 * @property {string} examMode - 試験のモードやレベルに関連する後半の文章 */
export type TitleConfig = {
  /** 画面に表示する文字列 */
  subject: string;
  /** 試験の級の数字 */
  level: string;
  /** 級の後半の文章 */
  examMode: string;
};

/** ナビゲーションボタンの型定義
 * @property {TitleConfig} titleConfig - タイトル設定（画面に表示する文字列）
 * @property {string} path - ページのURL */
export type NavigationButton = {
  /** タイトル設定（画面に表示する文字列） */
  titleConfig: TitleConfig;
  /** ページのURL */
  path: string;
};

/** ページ設定の型定義
 * - `Readonly<T>`で全体を包むことで、設定値の変更を防ぎ、読み取り専用にする
 * - 参考サイト：サバイバルTypeScript
 * - https://typescriptbook.jp/reference/type-reuse/utility-types/readonly
 * - 任意の文字列キーを使用してナビゲーションボタンの設定を定義
 * @property {[key: string]} - 任意のページキー
 * @property {NavigationButton} - ページ設定用のナビゲーションボタン */
export type PageConfig = Readonly<{
  /** 任意のページキー */
  [key: string]: Readonly<NavigationButton>;
}>;


/** タイマーコンポーネントのプロパティ型
 * @property {Announcoments[]} announcements - 経過時間ごとに再生する音声ファイルの一覧
 * @property {number} [time] - タイマーの初期時間（秒）
 * @property {string} [readySound] - タイマー準備完了時に再生する音声ファイル
 * @property {string} [endSound] - タイマー終了時に再生する音声ファイル
 */

export type TimerProps = {
  announcements: Announcoments[];
  time?: number;
  readySound?: string;
  endSound?: string;
};
