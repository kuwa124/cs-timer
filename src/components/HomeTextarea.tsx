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
    <div className='space-y-4'>
      <NavigationButtons
        handleClick={() => setisTestingBefore((prev) => !prev)}
        isTestingBefore={isTestingBefore}
        navigationButtons={testingBeforeNavigationButtons}
        highlightText='練習'
      />

      <NavigationButtons
        handleClick={() => setIsTest((prev) => !prev)}
        isTestingBefore={isTest}
        navigationButtons={testNavigationButtons}
        className='pt-8 border-y-4'
        highlightText='試験'
      />
    </div>
  );
};
