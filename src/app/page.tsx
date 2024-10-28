// pages/index.tsx

import Head from 'next/head';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <Head>
        <title>Timer App - Home</title>
        <meta name='description' content='Universal design timer application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='text-center'>
        <h1 className='text-4xl font-bold mb-8 text-gray-800'>
          Welcome to Timer App
        </h1>

        <nav className='flex flex-col space-y-4 text-gray-600'>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
        </nav>
      </main>

      <footer className='mt-8 text-gray-600'>
        <p>Timer App - All rights reserved</p>
      </footer>
    </div>
  );
}
