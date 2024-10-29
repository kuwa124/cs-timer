'use client';

import { ReturnHome } from '@/app/components/ReturnHome';
import { useTimer } from '@/hooks/useTimer';

type TimerProps = {
  title: string;
};

export const Timer = ({ title }: TimerProps) => {
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
    <div className='p-4'>
      {/* タイトル部分 */}
      <div className='flex justify-between items-center'>
        <div className='flex-1'></div>
        <h1 className='text-gray-600 tracking-wide text-center text-4xl'>
          {title}
        </h1>
        <div className='flex-1 text-right'>
          <ReturnHome />
        </div>
      </div>

      {/* タイマー表示 */}
      <div className='text-[300px] font-bold text-gray-800  text-center'>
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
      <p className='text-gray-400 mt-10 text-center'>VOICEVOX:四国めたん</p>
    </div>
  );
};
