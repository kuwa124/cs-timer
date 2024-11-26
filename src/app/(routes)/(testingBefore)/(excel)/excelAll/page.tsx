import { Header } from '@/components/Header';
import { Timer } from '@/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const excelAllTestingAnnouncements: Announcoments[] = [
  // 60分（3600秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 3600 - 30 * 60, file: '/common/03_30minProgress.wav' },
  { time: 3600 - 35 * 60, file: '/threeLevel/01_10minutesAgo.wav' },
  { time: 3600 - 40 * 60, file: '/threeLevel/02_5minutesAgo.wav' },
  { time: 3600 - 42 * 60, file: '/threeLevel/03_3minutesAgo.wav' },
  { time: 3600 - 44 * 60, file: '/threeLevel/04_1minutesAgo.wav' },
  { time: 3600 - 45 * 60, file: '/threeLevel/05_end.wav' },
  { time: 3600 - 55 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 3600 - 57 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 3600 - 59 * 60, file: '/common/07_1minutesAgo.wav' },
];

const Excel3AllTesting = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header title={getPageData('EXCEL_ALL').titleConfig} />
      <Timer announcements={excelAllTestingAnnouncements} time={3600} />
    </div>
  );
};

export default Excel3AllTesting;
