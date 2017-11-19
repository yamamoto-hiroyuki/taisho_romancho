var charmaker_userconfig = {
    /**
     * パーツグループの定義
     * グループ毎に、セレクタを記述します。
     * グループ内の要素のclickイベントでその要素が選択されます。
     * 選択はトグルで、かつグループ内の要素がひとつだけ選択可能です。
     */
    targets: [
        {
            // 背景
            backgroundImages: [
                {
                    src: "images/人物背景男_poster_.png"
                },
                {
                    src: "images/01body-m.png"
                },
                {
                    src: "images/fullsize/copyright.png"
                }
            ]
        },
        {   // 眉
            selector: "#u3954, #u3965, #u3968",
            dest: "#u4319",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u3968"
        },
        {   // 目
            selector: "#u3993, #u3996, #u3999",
            dest: "#u4330",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u3993"
        },
        {	// 口
            selector: "#u4032, #u4029, #u4026, u4068",
            dest: "#u4341",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u4029"
        },
        {	// 髪
            selector: "#u4183, #u4180, #u4159, #u4252, #u4231",
            dest: "#u4352",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u4183"
        },
        {	// 服
            selector: "#u4388, #u4373, #u4356, #u4538, #u4526, #u4505, #u4565, #u4553, #u4550, #u4601, #u4598, #u4586, #u4646, #u4625, #u4613",
            dest: "#u5437",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u4388"
        },
        {	// 靴
            selector: "#u4832, #u4820, #u4799, #u4892, #u4880, #u4868, #u4920",
            dest: "#u4427",
            selectionRule: "oneAndOnlyOne",
            initialSelected: "#u4832"
        },
        {   // 装飾スカーフ
            selector: "#u4994",
            dest: "#u5448",
            selectionRule: "zeroOrOne"
        },
        {   // 装飾メガネ
            selector: "#u4991",
            dest: "#u15208",
            selectionRule: "zeroOrOne"
        },
        {   // 装飾
            selector: "#u5111, #u5112, #u5106, #u5070, #u5073, #u5069, #u5035, #u5032, #u5036, #u4997",
            dest: "#u15211",
            selectionRule: "zeroOrOne"
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
                icon: "#u3787",
                target: "#u3954"
            },
            {
                icon: "#u3798",
                target: "#u4183"
            },
            {
                icon: "#u3809",
                target: "#u4388"
            },
            {
                icon: "#u3820",
                target: "#u4832"
            },
            {
                icon: "#u3831",
                target: "#u5111"
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
        selector: "#u15121",
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
    replacementToConvertThambnailToFullsize: "images/fullsize/$1.png",

    /**
     * 画像をダウンロードするときのconfirmメッセージ
     */
    downloadConfirmMessage: "着せ替え画像をダウンロードしますか？"
};
