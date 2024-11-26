import { getPageData } from '@/constants/pageConfig';
import { NavigationButton } from '@/types/type';

// ページ間の移動用ボタンの設定を配列で定義
// getPageData関数で安全にデータを取得
// `project://src\constants\pageConfig.ts ` から取得します。
export const navigationButtons: NavigationButton[] = [
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
