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
    <div>
      <h1 className='text-gray-600 tracking-wide text-center text-4xl'>
        Word計測
      </h1>
      {/* タイマー表示 */}
      <div className='text-[300px] font-bold text-gray-800 mb-6 text-center'>
        {formatTime(timeRemaining)}
      </div>

      {/* ボタンコンテナ */}
      <div className='flex justify-center space-x-4'>
        {!isRunning || isPaused ? (
          <button
            className='px-6 py-3 bg-green-400 shadow-lg w-32 text-white rounded-lg text-xl hover:bg-green-600 transition-colors duration-300'
            onClick={startTimer}
          >
            {isPaused ? '再開' : '再生'}
          </button>
        ) : (
          <button
            className='px-6 py-3 bg-yellow-500 shadow-lg w-32 text-white rounded-lg text-xl hover:bg-yellow-600 transition-colors duration-300'
            onClick={pauseTimer}
          >
            一時停止
          </button>
        )}
        <button
          className='px-6 py-3 bg-red-400 shadow-lg w-32 text-white rounded-lg text-xl hover:bg-red-600 transition-colors duration-300'
          onClick={stopTimer}
        >
          停止
        </button>
      </div>
      <p className='text-gray-400 mt-20 text-center'>VOICEVOX:四国めたん</p>
    </div>
  );
};
