import { NavigationButton } from '@/types/type';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type NavigationButtonsProps = {
  handleClick: () => void;
  isTestingBefore: boolean;
  navigationButtons: NavigationButton[];
  highlightText: string;
  titleClassName?: string;
  buttonClassname: string;
};

export const NavigationButtons = ({
  handleClick,
  isTestingBefore,
  navigationButtons,
  highlightText,
  titleClassName,
  buttonClassname,
}: NavigationButtonsProps) => {
  return (
    <div className=' my-4 w-[600px]'>
      <div
        className={`flex justify-between items-center pb-8 ${
          isTestingBefore && 'border-b-4'
        } ${titleClassName}`}
        onClick={handleClick}
      >
        <button className='group text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-600 hover:text-orange-600'>
          CS検定
          <span className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 group-hover:text-orange-600'>
            {highlightText}
          </span>
          　時間計測
        </button>
        <button className='mr-2 rounded-full hover:bg-gray-300 p-4 cursor-pointer'>
          <ChevronDown
            size={24}
            className={`text-gray-700 ${isTestingBefore && 'rotate-180'}`}
          />
        </button>
      </div>

      {/* ` TestingBefore ` のボタン部分を展開 */}
      {/* grid-flow-col:列に縦並びで次の列に進む */}
      {isTestingBefore && (
        <nav
          className={`grid ${buttonClassname} grid-flow-col gap-y-4 gap-x-10 mt-4 text-gray-600`}
        >
          {navigationButtons.map((navi) => (
            <Link
              key={navi.path}
              href={navi.path}
              className='w-[245px] mx-auto px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
              aria-label={`${Object.values(navi.titleConfig).join('')}へ移動`} //titleConfigを連結してタイトル作成
            >
              {/* titleConfigを連結してタイトル作成 */}
              {Object.values(navi.titleConfig).join('')}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
