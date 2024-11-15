import { PageConfig } from '@/types/type';

/** ページ設定の定義
 * - as constで値を完全に固定する（変更不可にする）
 */
export const PAGE_CONFIG: PageConfig = {
  // Word3級計測ページの設定
  WORD3_CLASS: {
    titleConfig: {
      subject: 'Word',
      level: '3',
      examMode: '級計測',
    },
    path: '/word3Class',
  },
  // Word3級計測試験前ページの設定
  WORD3_BEFORE_TESTING: {
    titleConfig: {
      subject: 'Word',
      level: '3',
      examMode: '級計測試験前',
    },
    path: '/word3BeforeTesting',
  },
  // Excel3級計測ページの設定
  EXCEL3_CLASS: {
    titleConfig: {
      subject: 'Excel',
      level: '3',
      examMode: '級計測',
    },
    path: '/excel3Class',
  },
} as const;

// PAGE_CONFIGのキー（WORD3_CLASSなど）の型を作成
// keyof typeofで、オブジェクトのキーを型として取得
export type PageConfigKey = keyof typeof PAGE_CONFIG;

// ページ設定を安全に取得するための関数
// 引数keyには、PageConfigKeyの型（WORD3_CLASS、WORD3_BEFORE_TESTING）しか受け付けない
export function getPageData(key: PageConfigKey) {
  // 指定されたキーに対応するページ設定を返す
  return PAGE_CONFIG[key];
}
