var charmaker_userconfig = {
    /**
     * パーツグループの定義
     * グループ毎に、セレクタ、変更の反映先、選択ルール、初期選択を定義します。
     * グループ内の要素のclickイベントでその要素が選択されます。
     */
    targets: [
        {
            // 背景
            backgroundImages: [
                {
                    src: "images/background.png"
                }
            ]
        },
        {
            selector: "#hair1,#hair2,#hair3",
            dest: "#layer_hair",
            selectionRule: "zeroOrOne",
            initialSelected: "#hair1"
        },
        {
            selector: "#cloth1,#cloth2,#cloth3",
            dest: "#layer_cloth",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#cloth2"
        }
    ],

	scrollMenu: {},

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
        id: "targetCanvas",
        width: 240,
        height: 240
    },

    /**
     * 重ね合わせの背景画像の指定（省略可）
     */
    backgroundImage: [
    ],

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 変換元正規表現
     */
    regexpToConvertThambnailToFullsize: /images\/([\w-\.]+)\.png/,

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 置換文字列
     */
    replacementToConvertThambnailToFullsize: "images/fullsize/$1.png"

};
