// ==UserScript==
// @name         Yahoo!路線情報の検索結果をGoogleカレンダーに登録するユーザースクリプト
// @version      0.1
// @description  Yahoo!路線情報の検索結果を、Googleカレンダーに登録するリンクを作成するユーザースクリプトです。ルート全体を一つの予定として登録するのではなく、乗り換えごとに別々の予定として登録します。登録の際、列車名を予定のタイトル、列車の出発・到着時刻を予定の開始・終了時刻、出発駅を予定の場所、発着番線を予定の説明欄に記載します。徒歩は登録しません。深夜バスなど日を跨ぐルートにも対応しています。
// @author       fukuchan
// @include      https://transit.yahoo.co.jp/search/*
// ==/UserScript==

const subscribe = event => {
    // ルート情報の親要素を取得
    const detail = event.target.closest("div[id*=route]");

    // 時刻の各要素に年月日情報を追加する
    const searchTime = document.querySelector(".navSearchTime .time");
    const dateNumbers = searchTime.textContent.match(/(\d+)年(\d+)月(\d+)日/);
    const times = detail.querySelectorAll(".time li");
    let previousDate = new Date(dateNumbers[1], dateNumbers[2] - 1, dateNumbers[3]); // ひとつ前の時刻
    for (let time of times) {
        const timeNumbers = time.textContent.match(/(\d+):(\d+)/);
        const currentDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate(), timeNumbers[1], timeNumbers[2]);

        // ひとつ前の時刻より巻き戻っているように見えたら、日を跨いでるので1日加算
        while (currentDate < previousDate) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        previousDate = currentDate;

        time.dataset.date = currentDate.toISOString().replace(/(-|:|(\.\d+))/g, "");
    }

    // 各駅と、その駅間の要素を取得
    const stations = detail.querySelectorAll(".station");
    const accesses = detail.querySelectorAll(".access");
    for (let i = 0; i < accesses.length; i++) {
        const origin = stations[i]; // 出発駅の要素
        const destination = stations[i + 1]; // 到着駅の要素
        const access = accesses[i]; // 駅間の要素

        // 歩きの場合は飛ばす
        if (access.matches(".walk")) {
            continue;
        }

        // 出発駅
        const location = origin.querySelector("dl>dt>a").textContent;

        // 列車名
        const transport = access.querySelector(".transport div");
        const text = transport.textContent.replace(/(\n|\[.*\])/g, "");

        // 発着番線
        const platform = access.querySelector(".platform");
        const details = platform ? platform.textContent : "";

        // 出発・到着時刻
        const departureTime = origin.querySelector(".time li:last-child");
        const arrivalTime = destination.querySelector(".time li:first-child");
        const dates = departureTime.dataset.date + "/" + arrivalTime.dataset.date;

        // GoogleカレンダーのURL生成
        const url = new URL("http://www.google.com/calendar/event?action=TEMPLATE");
        url.searchParams.append("location", location);
        url.searchParams.append("text", text);
        url.searchParams.append("details", details);
        url.searchParams.append("dates", dates);

        // URLを開く
        window.open(url.href);
    }
}

// 「時刻なし」で検索している場合は何もしない
const type = new URLSearchParams(window.location.search).get("type");
if (type == 5) {
    return;
}

// 既存の「カレンダーに登録」ボタンを取得し、隣に新しいボタンを追加する
const shareCals = document.querySelectorAll(".shareCal");
for (let yahooShareCal of shareCals) {
    // 「Googleカレンダーに登録」ボタンを作成
    const li = document.createElement("li");
    const icon = yahooShareCal.closest("li").querySelector(".icnCal").cloneNode(true);
    const googleShareCal = document.createElement("a");

    // ボタンにイベントを設定
    googleShareCal.href = "javascript:void(0);";
    googleShareCal.addEventListener("click", subscribe);

    // ボタンの文言変更
    yahooShareCal.textContent = "Yahoo!カレンダーに登録";
    googleShareCal.textContent = "Googleカレンダーに登録";

    // ボタンをDOMに追加
    li.append(icon, googleShareCal);
    yahooShareCal.closest("ul").appendChild(li);
}
