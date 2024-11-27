import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const Excel3TestingAnnouncements: Announcoments[] = [
  // 45分（2700秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 2700 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 2700 - 35 * 60, file: '/common/04_10minutesAgo.wav' },
  { time: 2700 - 40 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 2700 - 42 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 2700 - 44 * 60, file: '/common/07_1minutesAgo.wav' },
];

const Excel3Testing = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('EXCEL3_TESTING').titleConfig} />
      <Timer
        announcements={Excel3TestingAnnouncements}
        time={2700}
        readySound='/common/10_testingReady.wav'
        endSound='/testingExcel/06_2LevelEnd.wav'
      />
    </div>
  );
};

export default Excel3Testing;
