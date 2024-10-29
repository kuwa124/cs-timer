import Link from 'next/link';

export const ReturnHome = () => {
  return (
    <Link href='/' aria-label='ホームへ移動' className='text-blue-500'>
      ホームへ
    </Link>
  );
};
