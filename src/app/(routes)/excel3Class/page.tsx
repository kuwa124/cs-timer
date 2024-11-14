import { Timer } from '@/app/components/Timer';
import { getPageData } from '@/constants/pageConfig';
import { Announcoments } from '@/types/type';

const excel3ClassAnnouncements: Announcoments[] = [
  // 45分（2700秒）から経過した分数後にアナウンス
  // 何分経過後のアナウンスか、わかりやすいように「○○ * 60」で記載
  { time: 2700 - 20 * 60, file: '/excel/01_20minProgress.wav' },
  { time: 2700 - 30 * 60, file: '/excel/02_30minProgress.wav' },
  { time: 2700 - 35 * 60, file: '/common/04_10minutesAgo.wav' },
  { time: 2700 - 40 * 60, file: '/common/05_5minutesAgo.wav' },
  { time: 2700 - 42 * 60, file: '/common/06_3minutesAgo.wav' },
  { time: 2700 - 44 * 60, file: '/common/07_1minutesAgo.wav' },
];

const Excel3Class = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Timer
        title={getPageData('EXCEL3_CLASS').title}
        announcements={excel3ClassAnnouncements}
        time={2700}
      />
    </div>
  );
};

export default Excel3Class;
