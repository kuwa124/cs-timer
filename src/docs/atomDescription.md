# 役割の解説

## announcementsStateAtom

アナウンス情報のリストを管理します。
配列の中にアナウンスの内容が保存されるので、複数のアナウンスを行う際に使用します。

## isEndingStateAtom

タイマーが終了したかどうかを管理します。
この値が true になったときに、終了時の処理を行うための条件として使用します。

## lastAnnouncementTimeStateAtom

最後にアナウンスが行われた時間を保持します。
次のアナウンスまでの間隔を計算したり、時間を基にしたアナウンス表示に使用します。

## timerStateAtom

タイマーの状態を管理します。
timeRemaining で残り時間を、isRunning や isPaused で動作状態を保持します。
UI でタイマーを表示したり、タイマー操作のロジックに使用されます。
