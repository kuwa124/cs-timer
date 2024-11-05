type TimerControlsProps = {
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
};

export const TimerControls = ({
  isRunning,
  isPaused,
  startTimer,
  pauseTimer,
  stopTimer,
}: TimerControlsProps) => {
  return (
    //   ボタンコンテナ
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
  );
};
