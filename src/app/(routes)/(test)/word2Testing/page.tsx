import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const word2TestingAnnouncements: Announcoments[] = [
  // 60分（3600秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3600 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 3600 - 40 * 60, file: '/testingWord/01_10minutesAgo.wav' },
  { time: 3600 - 45 * 60, file: '/testingWord/02_5minutesAgo.wav' },
  { time: 3600 - 47 * 60, file: '/testingWord/03_3minutesAgo.wav' },
  { time: 3600 - 49 * 60, file: '/testingWord/04_1minutesAgo.wav' },
  { time: 3600 - 50 * 60, file: '/testingWord/05_3LevelEnd.wav' },
  { time: 3600 - 55 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 3600 - 57 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 3600 - 59 * 60, file: '/common/07_1minutesAgo.wav' },
];

const Word2Testing = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('WORD2_TESTING').titleConfig} />
      <Timer
        announcements={word2TestingAnnouncements}
        time={3600}
        readySound='/common/10_testingReady.wav'
        endSound='/testingWord/06_2LevelEnd.wav'
      />
    </div>
  );
};

export default Word2Testing;
