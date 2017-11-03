/**
 *  キャラクターメーカー
 */
var charmaker = {
    /**
     * 選択したイメージ要素に共通で付けられる属性名（重複がないような名前を付けました）
     */
    selectedAttributeName: "attr3917201d6d9a31b1e70b79a71b243b27",

    /**
     * 内部的に使用するダウンロードリンクa要素のid（重複がないような名前を付けました）
     */
    downLoadLinkID: "id3917201d6d9a31b1e70b79a71b243b27",


    fullsizeSrc: function (thumbnailSrc) {
        return thumbnailSrc.replace(charmaker_userconfig.regexpToConvertThambnailToFullsize, 
            charmaker_userconfig.replacementToConvertThambnailToFullsize);
    }
};

/**
 * イメージの重ねあわせを行います
 * @param {canvas} dest 作成先canvas要素
 */
charmaker.makeImage = function (dest) {
    // 出力先canvasのコンテキストの初期化
    var context = dest.getContext("2d");
    context.clearRect(0, 0, dest.width, dest.height);

    // バックグラウンド画像の指定があれば読み込む
    if (charmaker_userconfig.backgroundImage && charmaker_userconfig.backgroundImage.src) {
        var img = new Image(dest.width, dest.height);
        img.onload = function() {
            context.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = charmaker_userconfig.backgroundImage.src;
    }

    // 対象画像をグループ宣言順に処理する
    $.each(charmaker_userconfig.targets, function (i, t) {
        $(t.selector).filter("[" + charmaker.selectedAttributeName + "=true]").each(function (j, x) {
            // サムネイル画像のsrcからフルサイズ画像のsrcを取得
            var srcFullSize = charmaker.fullsizeSrc(x.src);
            var img = new Image(dest.width, dest.height);
            img.onload = function() {
                context.drawImage(img, 0, 0, img.width, img.height);
            };
            img.src = srcFullSize;
        });
    });

    $("#" + charmaker.downLoadLinkID)
            .attr("href", dest.toDataURL())
            .attr("download", "mypic.png");
};

/**
 * イメージのダウンロードを行います
 * @param {canvas} src 作成元canvas要素
 */
charmaker.download = function (src) {
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
        console.log("charmaker.init()", i, x);
        var targets = $(x.selector);
        // 必ずひとつ選ぶ設定なら、指定されているもの（なければ適当に先頭を)選択状態にします。
        if (x.selectionRule == "oneAndOnlyOne") {
            targets.eq(x.initialSelectedIndex).attr(charmaker.selectedAttributeName, true);
        }
        // グループ毎にclickハンドラを設定
        targets.on("click", function (e) {
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
    });

    // ダウンロード用に必要なa要素の設定
    $("<a id='" + charmaker.downLoadLinkID + "'>x</a>").appendTo("body", document).hide();

    // 画像ダウンロードイベントトリガー設定とイベント発生時処理
    $(charmaker_userconfig.downloadEventSource.selector).
        on(charmaker_userconfig.downloadEventSource.eventName,
        function () {
            charmaker.download(document.getElementById(charmaker_userconfig.targetCanvas.id));
        });

};

// 読み込み元のドキュメントready時にオブジェクトを初期化します。
$(document).ready(function () {
    charmaker.init();
    // 初期選択されたパーツで初期画像をキャンバスに描画します
    charmaker.makeImage(document.getElementById(charmaker_userconfig.targetCanvas.id));
});