// 再生する音声ファイルの型
export type Announcoments = {
  /** 経過時間（秒） */
  time: number;
  /** 再生するファイル */
  file: string;
};

// ナビゲーションボタンの型定義
export type NavigationButton = {
  /** 画面に表示する文字列 */
  title: string;
  /** pathはページのURL */
  path: string;
};

// ページ設定の定義の型
// Readonly<T>で全体を包むことで、設定値の変更を防ぐ（読み取り専用になる）
// https://typescriptbook.jp/reference/type-reuse/utility-types/readonly
// 参考サイト：サバイバルTypeScript
export type PageConfig = Readonly<{
  // [key: string]は、任意の文字列をキーとして使えることを示す
  [key: string]: Readonly<NavigationButton>;
}>;
