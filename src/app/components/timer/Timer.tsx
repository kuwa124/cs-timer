'use client';

import { ReturnHome } from '@/app/components/ReturnHome';
import { TimerControls } from '@/app/components/timer/features/TimerControls';
import { TimerDisplay } from '@/app/components/timer/features/TimerDisplay';
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
      <TimerDisplay time={timerstate.timeRemaining} formatTime={formatTime} />

      {/* ボタンコンテナ */}
      <TimerControls
        isRunning={timerstate.isRunning}
        isPaused={timerstate.isPaused}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        stopTimer={startTimer}
      />

      <p className='text-gray-400 mt-10 text-center'>VOICEVOX:四国めたん</p>
    </div>
  );
};
