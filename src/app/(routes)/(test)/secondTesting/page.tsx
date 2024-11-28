import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const SecondTestingAnnouncements: Announcoments[] = [
  // 60分（3600秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3600 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 3600 - 50 * 60, file: '/common/04_10minutesAgo.wav' },
  { time: 3600 - 55 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 3600 - 57 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 3600 - 59 * 60, file: '/common/07_1minutesAgo.wav' },
];

const SecondTesting = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('SECOND_TESTING').titleConfig} />
      <Timer
        announcements={SecondTestingAnnouncements}
        time={3600}
        readySound='/common/10_testingReady.wav'
      />
    </div>
  );
};

export default SecondTesting;
