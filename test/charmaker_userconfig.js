var charmaker_userconfig = {
    /**
     * パーツグループの定義
     * グループ毎に、セレクタまたは判定関数を記述します。
     * グループ内の要素のclickイベントでその要素が選択されます。
     */
    targets: [
        {
            selector: "#hair1,#hair2,#hair3",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {
            /**
             * 渡されたelmがグループのメンバーかどうか判断します
             * @param {jQuery-Object} elm 判定対象要素
             */
            isTarget: function (elm) {
                const MEMBERS = ["cloth1.png", "cloth2.png", "cloth3.png"];
                var bgImgPath = /url\("?([^"\)]+)"?\)/.exec(elm.css("background-image"));
                // cssのbackground-imageを持っていないなら対象外
                if (!bgImgPath) {
                    return false;
                }
                var result = false;
                $(MEMBERS).each(function (i, x) {
                    // MEMBERSはファイル名だからパスの後半に合致すればマッチとみなす
                    console.log("isTarget", i, bgImgPath[1], x);
                    if (bgImgPath[1].endsWith(x))  {
                        result = true;
                    }
                });
                return result;
            },
            selectionRule: "moreThanZero"
        }
    ],

    /**
     * 重ねあわせ画像ダウンロードイベントの発生元オブジェクトの情報。
     */
    downloadEventSource: {
        /**
         * セレクタ
         */
        selector : "#download",
        /**
         * トリガーイベント名
         */
        eventName: "click"
    },

    /**
     * 重ねあわせ先のcanvasの情報。
     */
    targetCanvas: {
        id: "targetCanvas"
    },

    /**
     * 重ね合わせの背景画像の指定（省略可）
     */
    backgroundImage: {
        src: "images/background.png"
    },

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 正規表現
     */
    regexpToConvertThambnailToFullsize: "/images/",

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 置換文字列
     */
    replacementToConvertThambnailToFullsize: "/images/fullsize/"


};
