/**
 *  キャラクターメーカー「ハイカラ倶楽部」
 */
var haikara_club = {

    categories: [
        {
            name: "髪型"
            , id: "xxxx"
            , children: [
                {
                    name: ""
                    , id: "xxxx"
                }
            ]
        }
        , {
            name: "服"
            , id: "xxxx"
            , children: [
                {
                    name: ""
                    , id: "xxxx"
                }
            ]
        }
        , {
            name: "靴と靴下"
            , id: "xxxx"
            , children: [
                {
                    name: ""
                    , id: "xxxx"
                }
            ]
        }
        , {
            name: "顔パーツ"
            , id: "xxxx"
            , children: [
                {
                    name: "目"
                    , children: [
                        {
                            name: ""
                            , id: "xxxx"
                        }
                    ]
                }
                , {
                    name: "口"
                    , children: [
                        {
                            name: ""
                            , id: "xxxx"
                        }
                    ]
                }
            ]
        }
        , {
            name: "アクセサリー"
            , id: "xxxx"
            , children: [
                {
                    name: "帽子"
                    , id: "xxxx"
                }
                , {
                    name: "ステッキ"
                    , id: "xxxx"
                }
            ]
        }
    ]
};

/**
 * カテゴリが選択された場合に呼び出されるハンドラ関数です。
 * @param {string} img 選択された時にクリックされたimg要素
 */
haikara_club.onSelectedCategory = function (img) {
};

/**
 * アイテムが選択された場合に呼び出されるハンドラ関数です。
 * @param {string} img 選択された時にクリックされたimg要素
 */
haikara_club.onSelectedItem = function (img) {
};

/**
 * イメージの重ねあわせを行います
 * @param {[string]} images イメージ（ファイルパス）の配列
 * @param {canvas} dest 作成先canvas要素
 */
haikara_club.overlay = function (images, dest) {
};

/**
 * イメージのダウンロードを行います
 * @param {canvas} src 作成元canvas要素
 */
haikara_club.download = function (src) {
};

haikara_club.init = function () {
    var process = function (cate) {
        $.each(cate.children, function (i, x) {
            if (x.children) {
                process(x);
            } else {
                // この要素がクリックされた時の処理を定義します
                $(x).on("click", function () {
                    // まず、この要素がすでに選択済か調べて記録しておきます。
                    var preSelected = ($(x).attr("selected"));
                    // そしていったん同じグループのすべての要素のselected属性を消し、
                    $.each(cate.children, function (j, y) {
                        $(y).removeAttr("selected");
                    });
                    // 最後に、最初にこの要素が選択されていなければselected属性を設定します。
                    if (!preSelected) $(x).attr("selected", true);
                });
            }
        });
    };

    $.each(haikara_club.categories, function () {
        process(this);
    });
}

/**
 * 初期設定
 */$(document).ready(function () {
    haikara_club.init();
});