import { Timer } from '@/app/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const Word3BeforeTestingAnnouncements: Announcoments[] = [
  // 50分（3000秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3000 - 30 * 60, file: '10_30minProgress.wav' },
  { time: 3000 - 40 * 60, file: '11_10minutesAgo.wav' },
  { time: 3000 - 45 * 60, file: '12_5minutesAgo.wav' },
  { time: 3000 - 47 * 60, file: '06_3minutesAgo.wav' },
  { time: 3000 - 49 * 60, file: '07_1minutesAgo.wav' },
];

const Word3BeforeTesting = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Timer
        title={getPageData('WORD3_BEFORE_TESTING').title}
        announcements={Word3BeforeTestingAnnouncements}
      />
    </div>
  );
};

export default Word3BeforeTesting;
