/**
 *  キャラクターメーカー
 */
var charmaker = {
    /**
     * 選択したイメージ要素に共通で付けられる属性名（重複がないような名前を付けました）
     */
    selectedAttributeName: "attrSelected3917201d6d9a31b1e70b79a71b243b27",

    /**
     * 内部的に使用するダウンロードリンクa要素のid（重複がないような名前を付けました）
     */
    downLoadLinkID: "idA3917201d6d9a31b1e70b79a71b243b27",

    /**
     * 内部的に使用するキャンバスcanvas要素のid（重複がないような名前を付けました）
     */
    canvasID: "idCanvas6697a609cd3a6093a1719a6368b813aa",

    /**
     * サムネイル画像名からフルサイズ画像名を取得します。
     * 画像名は正規表現置換で行います。
     * @param {string} thumbnailSrc サムネイル画像名
     */
    getFullsizeSrc: function (thumbnailSrc) {
        var result = thumbnailSrc.replace(charmaker_userconfig.regexpToConvertThambnailToFullsize,
            charmaker_userconfig.replacementToConvertThambnailToFullsize);
        console.log("getFullsizeSrc", thumbnailSrc, result);
        return result
    }
};

/**
 * イメージの重ねあわせを行います
 * 各グループ毎の暗黙の出力先と、引数で指定されたcanvasに出力します。
 * @param {canvas} dest 作成先canvas要素
 */
charmaker.makeImage = function (dest) {
    console.log("charmaker.makeImage", dest);

    // 出力先canvasのコンテキストの初期化
    var context = dest.getContext("2d");
    context.clearRect(0, 0, dest.width, dest.height);

    // グループ毎に画像を重ねていきます
    $.each(charmaker_userconfig.targets, function (i, t) {
        console.log("charmaker.makeImage", "1", i, t);

        if (t.backgroudImages) {
            // このグループは背景画像グループなので、選択とか関係なしに描画します
            $.each(t.backgroudImages, function (j, u) {

                // Imageオブジェクトを作成してsrcを設定、ロードできたらcontextに描画
                var img = new Image(dest.width, dest.height);
                img.onload = function () {
                    context.drawImage(img, 0, 0, img.width, img.height);
                };
                img.src = u.src;
            });
            return true; // means "continue;"
        }

        if (t.selector) {

            // 現在のグループのセレクタで選ばれる要素群のうち、「選択済」のものを選んで、それらについて処理する
            $(t.selector).filter("[" + charmaker.selectedAttributeName + "=true]").each(function (j, x) {

                console.log("charmaker.makeImage", "2", j, x);
                // サムネイル画像のsrcからフルサイズ画像のsrcを取得
                var srcFullSize = charmaker.getFullsizeSrc(
                    $(x).css("background-image"));
                // イメージを生成
                var img = new Image(dest.width, dest.height);
                console.log("charmaker.makeImage", "2.5", j);
                img.onload = function () {
                    // img.srcの設定は非同期処理になるため、続きの処理はloadedハンドラで処理
                    // canvasのcontextに描き込み
                    context.drawImage(img, 0, 0, img.width, img.height);
                    // ダウンロードリンクの更新。本当は全部の画面の書き込みが終わった時に1度行えば十分だけど、
                    // 非同期処理なので全部が終わったタイミングが分からない。なので冗長だけど毎回更新実施する。
                    $("#" + charmaker.downLoadLinkID)
                        .attr("href", dest.toDataURL())
                        .attr("download", "mypic.png");
                    // adobeが作った各部品用のdivの更新
                };
                console.log("charmaker.makeImage", "2.7", j);
                img.src = srcFullSize;
                console.log("charmaker.makeImage", "3", $(t.dest).css("background-image"), srcFullSize);
                $(t.dest).css("background-image", srcFullSize)
                console.log("charmaker.makeImage", "4", $(t.dest).css("background-image"));
            });
            return true;
        }
    });

};

/**
 * イメージのダウンロードを行います
 * @param {canvas} src 作成元canvas要素
 */
charmaker.download = function (src) {
    console.log("charmaker.download")
    var a = $("#" + charmaker.downLoadLinkID);
    a[0].click();
};

/**
 * charmakerオブジェクトを初期化します。
 */
charmaker.init = function () {
    console.log("charmaker.init()");

    // charmaker_userconfigに定義されたサムネイル群に対する初期設定
    $.each(charmaker_userconfig.targets, function (i, x) {
        // console.log("charmaker.init()", i, "1");
        var targets = $(x.selector);

        console.log("charmaker.init()", i, "2", targets.length, targets);
        // 必ずひとつ選ぶ設定なら、指定されているもの（なければ便宜的に先頭を)選択状態にします。
        if (x.selectionRule == "oneAndOnlyOne" && 0 < targets.length) {
            var n = 0;
            if (x.initialSelectedIndex < targets.length) {
                n = x.initialSelectedIndex;
            }
            targets.eq(n).attr(charmaker.selectedAttributeName, true);
        }

        // console.log("charmaker.init()", i, "3");
        // グループ毎にclickハンドラを設定
        targets.on("click",
            /**
             * ターゲット要素（div)のonClickハンドラ
             */
            function (e) {
                console.log("on(click)", e);
                // クリックされた要素がすでに選択済かどうかを覚えておきます
                var preSelected = $(e.target).attr(charmaker.selectedAttributeName);
                if (x.selectionRule == "oneAndOnlyOne") {
                    // グループ内のすべての要素の選択属性をクリアします。
                    targets.removeAttr(charmaker.selectedAttributeName);
                    // クリックされた要素を選択済にします（最初に選択済なら結果的に変化なし）
                    $(e.target).attr(charmaker.selectedAttributeName, true);
                } else if (x.selectionRule == "moreThanZero") {
                    // 最初の選択状態の逆の状態を設定します。
                    $(e.target).attr(charmaker.selectedAttributeName, !preSelected);
                }
                // 選択が変更されるたびに、重ね合わせ画像を再作成します。
                charmaker.makeImage(document.getElementById(charmaker_userconfig.targetCanvas.id));
                return true;
            });
        // console.log("charmaker.init()", i, "4");
    });

    // console.log("charmaker.init()", "10");
    // ダウンロード用に必要なa要素の設定
    $("<a id='" + charmaker.downLoadLinkID + "'>x</a>").appendTo("body", document).hide();
    $("<canvas id='" + charmaker_userconfig.targetCanvas.id + "' width=" + charmaker_userconfig.targetCanvas.width + "height=" + charmaker_userconfig.targetCanvas.height + "></canvas>").appendTo("body", document).hide();

    // console.log("charmaker.init()", "20");
    // 画像ダウンロードイベントトリガー設定とイベント発生時処理
    $(charmaker_userconfig.downloadEventSource.selector).
        on(charmaker_userconfig.downloadEventSource.eventName,
        function () {
            charmaker.download(document.getElementById(charmaker_userconfig.targetCanvas.id));
        });
    // console.log("charmaker.init()", "30");
};

// 読み込み元のドキュメントready時にオブジェクトを初期化します。
$(document).ready(function () {
    charmaker.init();
    // 初期選択されたパーツで初期画像をキャンバスに描画します
    charmaker.makeImage(document.getElementById(charmaker_userconfig.targetCanvas.id));
});
