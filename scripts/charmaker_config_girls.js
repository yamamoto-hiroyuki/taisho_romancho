var charmaker_userconfig = {
    /**
     * パーツグループの定義
     * グループ毎に、セレクタ、変更の反映先、選択ルール、初期選択を定義します。
     * グループ内の要素のclickイベントでその要素が選択されます。
     */
    targets: [
        {   // 髪飾り
            selector: "#u7477, #u7460",
            dest: "#u14340",
            selectionRule: "zeroOrOne",
            initialSelected: "#u7477"
        },
        {
            // 背景
            backgroudImages: [
                {
                    src: "images/人物背景女_poster_.png"
                },
                {
                    src: "images/01body-w.png"
                },
                {
                    src: "images/fullsize/copyright.png"
                }
            ]
        },
        {   // 眉
            selector: "#u8176, #u8179, #u8182",
            dest: "#u5483",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u8179"
        },
        {   // 目
            selector: "#u8173, #u8170, #u8167",
            dest: "#u5491",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u8173"
        },
        {	// 口
            selector: "#u8158, #u8161, #u8164, #u8155",
            dest: "#u5495",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u8161"
        },
        {	// 髪
            selector: "#u8002, #u7999, #u7996, #u7987, #u7990, #u7993, #u7984, #u7981, #u7978, #u7969, #u7972, #u7975, #u7966, #u7963, #u7960",
            dest: "#u5479",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u8002"
        },
        {	// 靴
            selector: "#u7572, #u7569, #u7566, #u7539, #u7542, #u7545, #u7548, #u7551, #u7554, #u7557, #u7560, #u7563",
            dest: "#u5482",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u7572"
        },
        {	// 服
            selector: "#u7821, #u7818, #u7815, #u7806, #u7809, #u7812, #u7803, #u7800, #u7797, #u7788, #u7791, #u7794, #u7785, #u7782, #u7779",
            dest: "#u5481",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u7818"
        },
        {   // 装飾
            selector: "#u7427, #u7449, #u7474, #u7471, #u7512, #u7515, #u7518",
            dest: "#u15051",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u7518"
        },
    ],

    /**
     * パーツグループへのスクロールを行うアイコンの定義
     */
    scrollMenu: {
        // 共通のオフセット
        commonOffset: -1048,
        // スクロールアイコン要素
        elements: [
            {
                // アイコンのセレクタ
                icon: "#u5487",
                // スクロール位置のターゲット
                target: "#u8176"
            },
            {
                icon: "#u5497",
                target: "#u8002"
            },
            {
                icon: "#u5485",
                target: "#u7821"
            },
            {
                icon: "#u5489",
                target: "#u7572"
            },
            {
                icon: "#u5494",
                target: "#u7427"
            }
        ]
    },

    /**
     * 重ねあわせ画像ダウンロードイベントの発生元オブジェクトの情報。
     */
    downloadEventSource: {
        /**
         * セレクタ
         */
        selector : "#u15094",
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
        width: 439,
        height: 709
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
    regexpToConvertThambnailToFullsize: /images\/([\w-\.]+)t\.png/,

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 置換文字列
     */
    replacementToConvertThambnailToFullsize: "images/fullsize/$1.png"


};
