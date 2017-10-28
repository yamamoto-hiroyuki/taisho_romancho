/**
 *  キャラクターメーカー「ハイカラ倶楽部」
 */
var hicara_club = {
    /**
     * パーツのトップカテゴリ。カテゴリ名と画像のkey:value
     */
    categories:  {
        hair: {
            img: "hair.png"
            , items: {
            }
        }
        , wear: {
            img: "wear.png"
            , items: {
            }
        }
        , shoe: {
            img: "show.png"
            , items: {
            }
        }
        , face: {
            img: "fase.png"
            , items: {
            }
        }
        , deco: {
            img: "deco.png"
            , items: {
            }
        }
    }
};

/**
 * カテゴリが選択された場合に呼び出されるハンドラ関数です。
 * @param {string} img 選択された時にクリックされたimg要素
 */
hicara_club.onSelectedCategory = (img) => {
};

/**
 * アイテムが選択された場合に呼び出されるハンドラ関数です。
 * @param {string} img 選択された時にクリックされたimg要素
 */
hicara_club.onSelectedItem = (img) => {
};

/**
 * イメージの重ねあわせを行います
 * @param {[string]} images イメージ（ファイルパス）の配列
 * @param {canvas} dest 作成先canvas要素
 */
hicara_club.overlay = (images, dest) => {
};

/**
 * イメージのダウンロードを行います
 * @param {canvas} src 作成元canvas要素
 */
hicara_club.download = (src) => {
};