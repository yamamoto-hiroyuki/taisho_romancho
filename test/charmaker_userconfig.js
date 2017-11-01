var charmaker_userconfig = {
    /**
     * パーツグループの定義
     * グループ毎に、セレクタを記述します。
     * グループ内の要素のclickイベントでその要素が選択されます。
     * 選択はトグルで、かつグループ内の要素がひとつだけ選択可能です。
     */
    targets: [
        {
            selector: "#hair1, #hair2, #hair3, #hair4, #hair5"
        },
        {
            selector: "#cloth1, #cloth2, #cloth3, #cloth4, #cloth5"
        }
    ],
    /**
     * 重ねあわせ画像生成イベントの発生元オブジェクトの情報を記述します。
     */
    createEventSource: {
        /**
         * セレクタ
         */
        selector : "#create",
        /**
         * セレクタ
         */
        eventName: "click"
    },

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
    regexpToConvertThambnailToFullsize: "images/",

    /**
     * サムネイル画像のsrcから取得したパスをフルサイズ画像のパスに変換するための、
     * 置換文字列
     */
    replacementToConvertThambnailToFullsize: "images/fullsize/"


};
