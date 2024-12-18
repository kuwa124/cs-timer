'use client';

import { useTimer } from '@/hooks/useTimer';
import { TimerProps } from '@/types/type';

export const Timer = ({
  announcements,
  time,
  readySound,
  endSound,
}: TimerProps) => {
  const {
    formatTime,
    isPaused,
    isRunning,
    pauseTimer,
    startTimer,
    stopTimer,
    timeRemaining,
    elapsedMinutes,
    isStartCountdown,
  } = useTimer({ announcements, time, readySound, endSound });

  return (
    <div className='p-4 flex flex-col items-center'>
      {/* タイマー表示 */}
      {elapsedMinutes !== 0 && (
        <p className='text-gray-500'>
          経過時間:　
          <span className='tracking-wider text-gray-600 font-medium text-4xl'>
            {elapsedMinutes}
          </span>
          分
        </p>
      )}

      <p className='text-gray-500 text-lg font-normal mt-4'>- 残り時間 -</p>
      <h1 className='text-9xl sm:text-[250px] font-bold text-gray-800 text-center mb-10'>
        {formatTime(timeRemaining)}
      </h1>

      {/* ボタンコンテナ */}
      <div className='flex justify-center space-x-4'>
        {!isRunning || isPaused ? (
          <button
            className={`px-6 py-3 bg-green-400 shadow-lg w-32 text-white rounded-lg text-xl hover:bg-green-600 transition-colors duration-300 ${
              isStartCountdown && 'cursor-not-allowed'
            }`}
            onClick={startTimer}
            disabled={isStartCountdown}
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
