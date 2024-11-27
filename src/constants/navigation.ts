import { getPageData } from '@/constants/pageConfig';
import { NavigationButton } from '@/types/type';

// ページ間の移動用ボタンの設定を配列で定義
// getPageData関数で安全にデータを取得
// `project://src\constants\pageConfig.ts ` から取得します。

// 試験練習計測用
export const testingBeforeNavigationButtons: NavigationButton[] = [
  {
    titleConfig: getPageData('WORD3_CLASS').titleConfig, // ボタンに表示するテキスト
    path: getPageData('WORD3_CLASS').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('WORD3_BEFORE_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('WORD3_BEFORE_TESTING').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('WORD_ALL').titleConfig, // ボタンに表示するテキスト
    path: getPageData('WORD_ALL').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('ALL').titleConfig, // ボタンに表示するテキスト
    path: getPageData('ALL').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('EXCEL3_CLASS').titleConfig, // ボタンに表示するテキスト
    path: getPageData('EXCEL3_CLASS').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('EXCEL3_BEFORE_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('EXCEL3_BEFORE_TESTING').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('EXCEL_ALL').titleConfig, // ボタンに表示するテキスト
    path: getPageData('EXCEL_ALL').path, // クリック時の移動先URL
  },
];

// CS検定用
export const testNavigationButtons: NavigationButton[] = [
  {
    titleConfig: getPageData('WORD3_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('WORD3_TESTING').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('WORD2_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('WORD2_TESTING').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('EXCEL3_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('EXCEL3_TESTING').path, // クリック時の移動先URL
  },

  {
    titleConfig: getPageData('EXCEL2_TESTING').titleConfig, // ボタンに表示するテキスト
    path: getPageData('EXCEL2_TESTING').path, // クリック時の移動先URL
  },
];
