export default function Loading() {
  return (
    // fixed: 固定位置配置
    // inset-0: 上下左右の位置を0に設定
    // backdrop-blur-sm: 背景をぼかす効果
    <div className='fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'>
      {/* パルスアニメーションを含むローディング表示 */}
      <div className='relative'>
        {/* 外側の円：拡大・縮小するアニメーション効果  */}
        {/* animate-ping: 点滅するアニメーション */}
        <div className='absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-75 h-16 w-16'></div>

        {/* 内側の円：パルスアニメーション効果  */}
        {/* animate-pulse: 明暗が変化するアニメーション */}
        <div className='relative rounded-full bg-blue-500 h-16 w-16 animate-pulse'></div>
      </div>

      {/* プログレスバー */}
      <div className='w-48 h-1.5 mt-8 bg-gray-200 rounded-full overflow-hidden'>
        {/* 
        animate-[loading_1.5s_ease-in-out_infinite：
        - loading: ブラウザ標準のアニメーション（width: 0%から100%への変化）
        - 1.5s: アニメーションが1回完了するまでの時間（1.5秒）
        - ease-in-out: アニメーションの加速度曲線
            - 始まりはゆっくり
            - 中間は速く
            - 終わりはゆっくり
        - infinite: アニメーションを無限に繰り返す

        実際の動き：
        - プログレスバーが左から右へ1.5秒かけて滑らかに移動
        - 100%まで到達したら、また0%から開始
        - この動きを無限に繰り返す
        */}
        <div className='h-full bg-blue-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]'></div>
      </div>

      {/* テキスト情報を表示するセクション */}
      <div className='mt-4 text-center'>
        {/* メインのローディングメッセージ */}
        <p
          className='text-lg font-medium text-gray-700 dark:text-gray-200'
          role='status' // role='status': スクリーンリーダー対応
        >
          コンテンツを読み込んでいます
        </p>

        {/* 補足説明テキスト */}
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
          ご利用のデバイスや通信環境により、読み込み時間が異なる場合があります
        </p>
      </div>
    </div>
  );
}
