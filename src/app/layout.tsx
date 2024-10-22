import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// カスタムフォントGeistVF.woffをインポートし、--font-geist-sansというカスタムプロパティに割り当てる
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

// カスタムフォントGeistMonoVF.woffをインポートし、--font-geist-monoというカスタムプロパティに割り当てる
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// プロジェクトのメタデータを定義
export const metadata: Metadata = {
  title: 'CS計測',
  description: 'CS検定の計測を行うアプリです。',
};

// プロジェクトのルートレイアウトを定義
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='jp'>
      <body
        // カスタムフォントのプロパティとantialiasedクラスを適用
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
