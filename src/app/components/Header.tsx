import { ReturnHome } from '@/app/components/ReturnHome';
import { TitleConfig } from '@/types/type';

type HeaderProps = {
  title: TitleConfig;
};

export const Header = ({ title }: HeaderProps) => {
  const { subject, level, examMode } = title;
  return (
    //タイトル部分
    <div className='flex justify-between items-center container mx-auto px-10'>
      <div className='flex-1'></div>
      <h1 className='text-gray-600 tracking-wide text-center text-3xl'>
        {subject}
        <span className='text-gray-700 text-5xl font-medium'>{level}</span>
        {examMode}
      </h1>

      {/* ホーム遷移部分 */}
      <div className='flex-1 text-right'>
        <ReturnHome />
      </div>
    </div>
  );
};
