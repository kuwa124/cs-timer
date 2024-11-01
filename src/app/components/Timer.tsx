'use client';

import { ReturnHome } from '@/app/components/ReturnHome';
import { useTimer } from '@/hooks/useTimer';
import { Announcoments } from '@/types/type';

type TimerProps = {
  title: string;
  announcements: Announcoments[];
};

export const Timer = ({ title, announcements }: TimerProps) => {
  const { timerstate, formatTime, pauseTimer, startTimer, stopTimer } =
    useTimer(announcements);

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
        {formatTime(timerstate.timeRemaining)}
      </div>

      {/* ボタンコンテナ */}
      <div className='flex justify-center space-x-4'>
        {!timerstate.isRunning || timerstate.isPaused ? (
          <button
            className='px-6 py-3 bg-green-400 shadow-lg w-32 text-white rounded-lg text-xl hover:bg-green-600 transition-colors duration-300'
            onClick={startTimer}
          >
            {timerstate.isPaused ? '再開' : '再生'}
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
