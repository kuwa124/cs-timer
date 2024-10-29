// pages/index.tsx

import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-100 p-4'>
      <div className='flex justify-center items-center'>
        {/* メインビジュアルエリア */}
        <div className='relative w-full aspect-square max-w-4xl mx-auto overflow-hidden'>
          <Image
            // publicフォルダからの相対パス(publicディレクトリは自動的にルート)
            src='/image/main-visual-pcImage-2048×2048.webp'
            alt='メインビジュアル'
            fill
            priority
            className='object-cover'
            aria-hidden
          />
        </div>
        <div>
          <h1 className='text-4xl font-bold mb-8 text-gray-800'>
            Welcome to Timer App
          </h1>

          <nav className='flex flex-col space-y-4 text-gray-600'>
            <p>テスト</p>
            <p>テスト</p>
            <p>テスト</p>
            <p>テスト</p>
          </nav>
        </div>
      </div>

      <footer className='mt-8 text-gray-600'>
        <p>Timer App - All rights reserved</p>
      </footer>
    </main>
  );
}
