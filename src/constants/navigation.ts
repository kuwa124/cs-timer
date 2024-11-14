import { getPageData } from '@/constants/pageConfig';
import { NavigationButton } from '@/types/type';

// ページ間の移動用ボタンの設定を配列で定義
// getPageData関数で安全にデータを取得
export const navigationButtons: NavigationButton[] = [
  {
    title: getPageData('WORD3_CLASS').title, // ボタンに表示するテキスト
    path: getPageData('WORD3_CLASS').path, // クリック時の移動先URL
  },
  {
    title: getPageData('WORD3_BEFORE_TESTING').title, // ボタンに表示するテキスト
    path: getPageData('WORD3_BEFORE_TESTING').path, // クリック時の移動先URL
  },
  {
    title: getPageData('EXCEL3_CLASS').title, // ボタンに表示するテキスト
    path: getPageData('EXCEL3_CLASS').path, // クリック時の移動先URL
  },
];
