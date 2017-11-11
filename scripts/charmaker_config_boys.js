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
            backgroudImages: [
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
            initialSelectedIndex: 0
        },
        {   // 目
            selector: "#u3993, #u3996, #u3999",
            dest: "#u4330",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {	// 口
            selector: "#u4032, #u4029, #u4026, u4068",
            dest: "#u4341",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {	// 髪
            selector: "#u4183, #u4180, #u4159, #u4252, #u4231",
            dest: "#u4352",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {	// 服
            selector: "#u4388, #u4373, #u4356, #u4538, #u4526, #u4505, #u4565, #u4553, #u4550, #u4601, #u4598, #u4586, #u4646, #u4625, #u4613",
            dest: "#u5437",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {	// 靴
            selector: "#u4832, #u4820, #u4799, #u4892, #u4880, #u4868, #u4920",
            dest: "#u4427",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
        {   // 装飾
            selector: "#u5111, #u5112, #u5106, #u5070, #u5073, #u5069, #u5035, #u5032, #u5036, #u4997, #u4994, #u4991",
            dest: "#u5448",
            selectionRule: "oneAndOnlyOne",
            initialSelectedIndex: 0
        },
    ],

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
    replacementToConvertThambnailToFullsize: "images/fullsize/$1.png"


};
