'use client'; // ユーザー操作に適応するための定型文

import { navigationButtons } from '@/constants/navigation';
import Link from 'next/link';
import { useState } from 'react';

export const HomeTextarea = () => {
  // TestingBeforeを表示するためのstate
  const [isTestingBefore, setisTestingBefore] = useState<boolean>(false);

  // Testを表示するためのstate
  const [isTest, setIsTest] = useState<boolean>(false);
  return (
    <div className=' my-4 space-y-4 w-96'>
      <button
        className='text-2xl sm:text-3xl lg:text-4xl  font-bold text-gray-800 cursor-pointer hover:text-yellow-700'
        onClick={() => setisTestingBefore((prev) => !prev)}
      >
        CS検定練習　時間計測
      </button>

      {/* ` TestingBefore ` のボタン部分を展開 */}
      {/* grid-flow-col:列に縦並びで次の列に進む */}
      {isTestingBefore && (
        <nav className='grid grid-rows-3 grid-flow-col gap-y-4 gap-x-10 text-gray-600'>
          {navigationButtons.map((navi) => (
            <Link
              key={navi.path}
              href={navi.path}
              className='w-56 mx-auto px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
              aria-label={`${Object.values(navi.titleConfig).join('')}へ移動`} //titleConfigを連結してタイトル作成
            >
              {/* titleConfigを連結してタイトル作成 */}
              {Object.values(navi.titleConfig).join('')}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
