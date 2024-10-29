import Image from 'next/image';
import Link from 'next/link';

type NavigationButton = {
  label: string; // ボタンに表示するラベル
  path: string; // ボタンをクリックした際の遷移先のパス
};

// ナビゲーションボタン定義
const navigationButtons: NavigationButton[] = [
  {
    label: 'Word3級',
    path: '/word3Class',
  },
  // {
  //   label: 'ストップウォッチ',
  //   path: '',
  // },
  // {
  //   label: 'アラーム',
  //   path: '',
  // },
  // {
  //   label: '設定',
  //   path: '',
  // },
];

export const HomePage = () => {
  return (
    <main className='flex flex-col sm:flex-row justify-center items-center min-h-screen bg-gray-100 p-4 gap-4 sm:gap-10 lg:gap-20'>
      {/* メインビジュアルエリア */}
      <div className='relative w-full aspect-square max-w-md'>
        <Image
          // publicフォルダからの相対パス(publicディレクトリは自動的にルート)
          src='/image/main-visual-pcImage-2048×2048.webp'
          alt='メインビジュアル'
          fill // fill: 親要素いっぱいに画像を表示(親要素にposition: relativeが必要)
          priority // priority: 優先的に読み込む（ファーストビューの画像に推奨）
          className='object-cover' // object-cover: アスペクト比を保ちながら親要素にフィット
          aria-hidden
        />
      </div>

      {/* テキストコンテンツエリア */}
      <div className='my-4 space-y-4'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-gray-800'>
          CS検定練習　時間計測
        </h1>

        <nav className='flex flex-col items-center space-y-4 text-gray-600'>
          {navigationButtons.map((navi) => (
            <Link
              key={navi.label}
              href={navi.path}
              className='w-56 mx-auto px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
              aria-label={`${navi.label}へ移動`}
            >
              {navi.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
};
