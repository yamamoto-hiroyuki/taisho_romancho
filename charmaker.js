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
};

/**
 * イメージの重ねあわせを行います
 * @param {canvas} dest 作成先canvas要素
 */
haikara_club.makeImage = function (dest) {
    var context = dest.getContext("2d");
    context.clearRect(0, 0, dest.width, dest.height);
    $("[" + haikara_club.selectedAttributeName + "]").each(function (i, element) {
        console.log("haikara_club.makeImage", i, element);
        context.drawImage(element, 0, 0, element.width, element.height);
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
 * 指定されたグループを初期化します。
 * 具体的には、clickイベントハンドラを設定し、そのうちの１要素のみを選択できるようにします。
 * @param {collection<jQueryObject>} target 対象要素のjQueryオブジェクトのコレクション
 */
haikara_club.initGroup = function (targets) {
    console.log("haikara_club.initGroup", targets);
    targets.on("click", function (e) {
        // 後で利用するために、クリックされた要素がすでに選択済かどうかを覚えておきます
        var preSelected = $(e.target).attr(haikara_club.selectedAttributeName);
        // グループ内のすべての要素の選択属性をクリアします。
        targets.removeAttr(haikara_club.selectedAttributeName);
        // 最初に未選択だったならクリックされた要素を選択済にします（最初に選択済なら選択解除になります）
        if (!preSelected) {
            $(e.target).attr(haikara_club.selectedAttributeName, true);
        }
        return true;
    });
};

/**
 * haikara_clubオブジェクトを初期化します。
 * @param {Document} document 
 * @param {string} categoryClassName  パーツカテゴリの各要素に共通でつけられたクラス名
 */
haikara_club.init = function (doc, categoryClassName) {
    console.log("haikara_club.init", categoryClassName);
    haikara_club.categoryClassName = categoryClassName;

    $("<a id='" + haikara_club.downLoadLinkID + "'>x</a>").appendTo("body", doc).hide();
    
    var targets = $("." + haikara_club.categoryClassName)
    haikara_club.initGroup(targets);
    targets.each(function (i, elm) {
        haikara_club.initGroup($("." + $(elm).attr("id")));
    });
};
