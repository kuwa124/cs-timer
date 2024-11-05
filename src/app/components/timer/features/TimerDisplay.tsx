type TimerDisplayProps = {
  time: number;
  formatTime: (time: number) => string;
};

export const TimerDisplay = ({ time, formatTime }: TimerDisplayProps) => {
  return (
    // タイマー表示 
      <div className='text-[300px] font-bold text-gray-800  text-center'>
        {formatTime(time)}
      </div>
  );
};
