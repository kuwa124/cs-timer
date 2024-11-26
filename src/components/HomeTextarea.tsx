'use client'; // ユーザー操作に適応するための定型文

import { NavigationButtons } from '@/components/NavigationButtons';
import {
  testingBeforeNavigationButtons,
  testNavigationButtons,
} from '@/constants/navigation';
import { useState } from 'react';

export const HomeTextarea = () => {
  // TestingBeforeを表示するためのstate
  const [isTestingBefore, setisTestingBefore] = useState<boolean>(false);

  // Testを表示するためのstate
  const [isTest, setIsTest] = useState<boolean>(false);

  return (
    <div className='space-y-8'>
      <NavigationButtons
        handleClick={() => setisTestingBefore((prev) => !prev)}
        isTestingBefore={isTestingBefore}
        navigationButtons={testingBeforeNavigationButtons}
      >
        CS検定
        <span className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800'>
          練習
        </span>
        　時間計測
      </NavigationButtons>

      <NavigationButtons
        handleClick={() => setIsTest((prev) => !prev)}
        isTestingBefore={isTest}
        navigationButtons={testNavigationButtons}
      >
        CS検定
        <span className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800'>
          試験
        </span>
        　時間計測
      </NavigationButtons>
    </div>
  );
};
