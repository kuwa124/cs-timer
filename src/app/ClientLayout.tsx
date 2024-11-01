// このファイルをクライアントコンポーネントとして指定
'use client';

import { RecoilRoot } from 'recoil';
// クライアントで実行されるが、childrenとして渡されるコンポーネントは影響を受けず、それぞれ個別にサーバー/クライアントが判定される
export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
