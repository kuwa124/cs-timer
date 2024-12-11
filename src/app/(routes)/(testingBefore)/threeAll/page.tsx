import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const threeAllAnnouncements: Announcoments[] = [
  // 50分（3000秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3000 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 3000 - 35 * 60, file: '/testingExcel/01_10minutesAgo.wav' },
  { time: 3000 - 40 * 60, file: '/testingExcel/02_5minutesAgo.wav' },
  { time: 3000 - 42 * 60, file: '/testingExcel/03_3minutesAgo.wav' },
  { time: 3000 - 44 * 60, file: '/testingExcel/04_1minutesAgo.wav' },
  { time: 3000 - 45 * 60, file: '/testingExcel/05_3LevelEnd.wav' },
  { time: 3000 - 47 * 60, file: '/testingWord/03_3minutesAgo.wav' },
  { time: 3000 - 49 * 60, file: '/testingWord/04_1minutesAgo.wav' },
];

const threeAllTesting = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('THREE_ALL').titleConfig} />
      <Timer announcements={threeAllAnnouncements} />
    </div>
  );
};

export default threeAllTesting;
