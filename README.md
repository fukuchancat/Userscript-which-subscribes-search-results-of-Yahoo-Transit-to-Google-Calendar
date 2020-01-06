# Yahoo!路線情報の検索結果をGoogleカレンダーに登録するユーザースクリプト

## 概要

- **[Greasy Forkで公開中](https://greasyfork.org/ja/scripts/394712-yahoo-%E8%B7%AF%E7%B7%9A%E6%83%85%E5%A0%B1%E3%81%AE%E6%A4%9C%E7%B4%A2%E7%B5%90%E6%9E%9C%E3%82%92google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AB%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88)**
- [解説記事(Qiita)](https://qiita.com/m_fukuchan/items/f481f899ecd9968efcfb)

[Yahoo!路線情報](https://transit.yahoo.co.jp/)の検索結果を、[Googleカレンダー](https://calendar.google.com/)に登録するリンクを作成するユーザースクリプトです。

![スクリーンショット](https://user-images.githubusercontent.com/19220989/71801544-94f0da80-309e-11ea-85f5-f14ff16ad2ce.png)

ルート全体を一つの予定として登録するのではなく、乗り換えごとに別々の予定として登録します。

登録の際、列車名を予定のタイトル、列車の出発・到着時刻を予定の開始・終了時刻、出発駅を予定の場所、発着番線を予定の説明欄に記載します。

徒歩は登録しません。

![スクリーンショット](https://user-images.githubusercontent.com/19220989/71802041-00877780-30a0-11ea-92e5-b19db7e4c163.png)

深夜バスなど日を跨ぐルートにも対応しています。

## ライセンス

Copyright © 2019 fukuchan

This software is licensed under the MIT License.
