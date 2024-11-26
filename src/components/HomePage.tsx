import { HomeTextarea } from '@/components/HomeTextarea';
import Image from 'next/image';

export const HomePage = () => {
  return (
    <main className='flex justify-center items-center min-h-screen bg-gray-100 p-4 gap-4 sm:gap-10 lg:gap-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4 items-start'>
        {/* メインビジュアルエリア */}
        <div className='relative w-full sm:w-[500px] sm:h-[500px] aspect-square max-w-md'>
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
        <HomeTextarea />
      </div>
    </main>
  );
};
