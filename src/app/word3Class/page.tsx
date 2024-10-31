import { Timer } from '@/app/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const Word3ClassAnnouncements: Announcoments[] = [
  // 50分（3000秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3000 - 10 * 60, file: '03_10minProgress.wav' },
  { time: 3000 - 35 * 60, file: '11_10minutesAgo.wav' },
  { time: 3000 - 45 * 60, file: '05_5minutesAgo.wav' },
  { time: 3000 - 47 * 60, file: '06_3minutesAgo.wav' },
  { time: 3000 - 49 * 60, file: '07_1minutesAgo.wav' },
];

const Word3Class = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Timer
        title={getPageData('WORD3_CLASS').title}
        announcements={Word3ClassAnnouncements}
      />
    </div>
  );
};

export default Word3Class;
