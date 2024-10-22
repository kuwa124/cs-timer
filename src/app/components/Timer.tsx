'use client';

import { useTimer } from '@/hooks/useTimer';

export const Timer = () => {
  const {
    formatTime,
    isPaused,
    isRunning,
    pauseTimer,
    startTimer,
    stopTimer,
    timeRemaining,
  } = useTimer();

  return (
    <div className='bg-white rounded-xl p-8 shadow-lg'>
      {/* タイマー表示 */}
      <div className='text-8xl font-bold text-gray-800 mb-6 text-center'>
        {formatTime(timeRemaining)}
      </div>
      {/* ボタンコンテナ */}
      <div className='flex justify-center space-x-4'>
        {/* 再生/一時停止ボタン */}
        {!isRunning || isPaused ? (
          <button
            className='px-6 py-3 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition-colors duration-300'
            onClick={startTimer}
          >
            {isPaused ? '再開' : '再生'}
          </button>
        ) : (
          <button
            className='px-6 py-3 bg-yellow-500 text-white rounded-lg text-xl hover:bg-yellow-600 transition-colors duration-300'
            onClick={pauseTimer}
          >
            一時停止
          </button>
        )}
        {/* 停止ボタン */}
        <button
          className='px-6 py-3 bg-red-500 text-white rounded-lg text-xl hover:bg-red-600 transition-colors duration-300'
          onClick={stopTimer}
        >
          停止
        </button>
      </div>
    </div>
  );
};
