import { ReturnHome } from '@/components/ReturnHome';
import { TitleConfig } from '@/types/type';

type HeaderProps = {
  title: TitleConfig;
};

export const Header = ({ title }: HeaderProps) => {
  const { subject, level, examMode } = title;
  return (
    //タイトル部分
    <div className='flex flex-col sm:flex-row justify-between items-center container mx-auto'>
      <div className='flex-1'></div>
      <h1 className='text-gray-600 tracking-wide text-center text-4xl'>
        {subject}
        <span className='text-gray-700 text-6xl font-medium'>{level}</span>
        {examMode}
      </h1>

      {/* ホーム遷移部分 */}
      <div className='flex-1 text-center'>
        <ReturnHome />
      </div>
    </div>
  );
};
