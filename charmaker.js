/**
 *  キャラクターメーカー「ハイカラ倶楽部」
 */
var haikara_club = {
    /**
     * パーツカテゴリの各要素に共通でつけられたクラス名
     */
    categoryClassName: ""

    /**
     * 選択したイメージ要素に共通で付けられる属性名（重複がないような名前を付けました）
     */
    , selectedAttributeName: "attr3917201d6d9a31b1e70b79a71b243b27"

    /**
     * 内部的に使用するダウンロードリンクa要素のid（重複がないような名前を付けました）
     */
    , downLoadLinkID: "id3917201d6d9a31b1e70b79a71b243b27"

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための正規表現と置換文字列
     */
    , regexpToConvertThambnailToFullsize: "_thumbnail"
    , replacementToConvertThambnailToFullsize: "_fullsize"
    
};

/**
 * イメージの重ねあわせを行います
 * @param {canvas} dest 作成先canvas要素
 */
haikara_club.makeImage = function (dest) {
    var context = dest.getContext("2d");
    context.clearRect(0, 0, dest.width, dest.height);
    $("[" + haikara_club.selectedAttributeName + "]").each(function (i, x) {
        var srcFullSize = x.src.replace(haikara_club.regexpToConvertThambnailToFullsize, haikara_club.replacementToConvertThambnailToFullsize);
        console.log("haikara_club.makeImage()#1", i, x, srcFullSize);
        var img = new Image(dest.width, dest.height);
        img.src = srcFullSize;
        context.drawImage(img, 0, 0, img.width, img.height);
    });
    $("#" + haikara_club.downLoadLinkID)
        .attr("href", dest.toDataURL())
        .attr("download", "mypic.png");
};

/**
 * イメージのダウンロードを行います
 * @param {canvas} src 作成元canvas要素
 */
haikara_club.download = function (src) {
    var a = $("#" + haikara_club.downLoadLinkID);
    a[0].click();
};

/**
 * haikara_clubオブジェクトを初期化します。
 */
haikara_club.init = function () {
    console.log("haikara_club.init()");

    // charmaker_userconfigに定義されたサムネイル群に対する初期設定
    $.each(charmaker_userconfig.targets, function (i, x) {
        console.log("haikara_club.init()", i, x);
        var targets = $(x.selector);
        targets.on("click", function(e) {
            console.log("on(click)", e);
            // クリックされた要素がすでに選択済かどうかを覚えておきます
            var preSelected = $(e.target).attr(haikara_club.selectedAttributeName);
            // グループ内のすべての要素の選択属性をクリアします。
            targets.removeAttr(haikara_club.selectedAttributeName);
            // 最初に未選択だったならクリックされた要素を選択済にします（最初に選択済なら選択解除になります）
            if (!preSelected) {
                $(e.target).attr(haikara_club.selectedAttributeName, true);
            }
            return true;
        });
    });

    // ダウンロード用に必要なa要素の設定
    $("<a id='" + haikara_club.downLoadLinkID + "'>x</a>").appendTo("body", document).hide();
};

$(document).ready(function () {
    haikara_club.init();
});