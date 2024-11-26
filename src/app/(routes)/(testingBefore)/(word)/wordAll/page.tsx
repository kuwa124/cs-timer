import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const wordAllTestingAnnouncements: Announcoments[] = [
  // 60分（3000秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3000 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 3000 - 40 * 60, file: '/threeLevel/01_10minutesAgo.wav' },
  { time: 3000 - 45 * 60, file: '/threeLevel/02_5minutesAgo.wav' },
  { time: 3000 - 47 * 60, file: '/threeLevel/03_3minutesAgo.wav' },
  { time: 3000 - 49 * 60, file: '/threeLevel/04_1minutesAgo.wav' },
  { time: 3000 - 50 * 60, file: '/threeLevel/05_end.wav' },
  { time: 3000 - 55 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 3000 - 57 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 3000 - 59 * 60, file: '/common/07_1minutesAgo.wav' },
];

const Word3AllTesting = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('WORD_ALL').titleConfig} />
      <Timer announcements={wordAllTestingAnnouncements} time={3600} />
    </div>
  );
};

export default Word3AllTesting;
