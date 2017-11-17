/**
 *  キャラクターメーカー
 */
var charmaker = {
    /**
     * 選択したイメージ要素に共通で付けられる属性名（重複がないような名前を付けました）
     */
    selectedAttributeName: "attrSelected3917201d6d9a31b1e70b79a71b243b27",

    /**
     * 内部的に使用するダウンロードリンクa要素のid（重複がないような名前を付けました）
     */
    downLoadLinkID: "idA3917201d6d9a31b1e70b79a71b243b27",

    /**
     * 内部的に使用するキャンバスcanvas要素のid（重複がないような名前を付けました）
     */
    canvasID: "idCanvas6697a609cd3a6093a1719a6368b813aa",

    /**
     * サムネイル画像名からフルサイズ画像名を取得します。
     * 画像名は正規表現置換で行います。
     * @param {string} thumbnailSrc サムネイル画像名
     */
    getFullsizeSrc: function (thumbnailSrc) {
        var matched = charmaker_userconfig.regexpToConvertThambnailToFullsize.exec(thumbnailSrc);
        if (!matched) return null;
        var result = matched[0].replace(charmaker_userconfig.regexpToConvertThambnailToFullsize,
            charmaker_userconfig.replacementToConvertThambnailToFullsize);
        return result
    }
};

/**
 * 表示イメージの重ねあわせを行います
 * 各グループ毎の出力先(targets[i].destでselectされるもの)に書き出します。
 * @param {integer} width
 * @param {integer} height 
 * @param {element} changed 変更された要素
 */
charmaker.makeImageForDisplay = function (width, height, changed) {
    console.log("charmaker.makeImageForDisplay");

	// 全部再描画しなくても、選択されたグループだけ書きなおせば...
    $.each(charmaker_userconfig.targets, function (i, t) {
		var found = false;
		$(t.selector).each(function () {
			if (this != changed) {
				return true;
			}
			// 変更のあったdivがみつかったら
			if ($(this).attr(charmaker.selectedAttributeName)) {
				// 新しいアイテムが選ばれたならばそれを描きます
				var srcFullSize = charmaker.getFullsizeSrc(
					decodeURI($(this).css("background-image")));
				console.log("charmaker.makeImageForDisplay", "going to draw", srcFullSize);
                if (!srcFullSize.startsWith("url")) {
                    srcFullSize = "url(" + srcFullSize + ")";
                }
                // 単純に切り替えると乱暴になるので、スーッと入れ替える
                var origin = $(t.dest).eq(0);
                var clone = origin.clone().hide();
                origin.after(clone);
                clone.fadeIn(800, function() {
					origin.css("background-image", srcFullSize);
					clone.fadeOut(800, function() { clone.remove(); });
					console.log("charmaker.makeImageForDisplay", "drew", srcFullSize);
				});
			} else {
				// アイテム選択が取り消されたなら消す描画
				$(t.dest).css("background-image", "none")
			}
			found = true;
			return false;
		});
		return !found;
	});
};

/**
 * ダウンロード画像用のcanvasを描きます
 */
charmaker.makeupCanvasForDownload = function (canvas, endProc) {
    console.log("charmaker.makeupCanvasForDownload", canvas);

    // 出力先canvasのコンテキストの初期化
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

	var images = [];
	var loaded = 0;

    // グループ毎に画像を重ねていきます
    $.each(charmaker_userconfig.targets, function (i, t) {
        if (t.backgroundImages) {
            // このグループは背景画像グループなので、選択とか関係なしに描画します
            $.each(t.backgroundImages, function (j, u) {
                // Imageオブジェクトを作成してsrcを設定、ロードできたらcontextに描画
                console.log("charmaker.makeupCanvasForDownload", "going to draw", u.src);
                var img = new Image(canvas.width, canvas.height);
                img.onload = function () {
					loaded++;
                };
				images.push(img);
                img.src = u.src;
            });
            return true; // means "continue;"
        }

        if (t.selector) {
            // 現在のグループのセレクタで選ばれる要素群のうち、「選択済」のものを選んで、それらについて処理します
            $(t.selector).filter("[" + charmaker.selectedAttributeName + "=true]").each(function (j, x) {
                // サムネイル画像のsrcからフルサイズ画像のsrcを取得
                var srcFullSize = charmaker.getFullsizeSrc(
                    decodeURI($(x).css("background-image")));
                console.log("charmaker.makeupCanvasForDownload", "going to draw", srcFullSize);
                // イメージを生成
                var img = new Image(canvas.width, canvas.height);
                img.crossOrigin = "anonymous";
                img.onload = function () {
					loaded++;
					if (images.length == loaded) {
						// images設定が走りきってから割り込みが入ると期待してます
						// 数が追いつくのはすべてがloadされたとき
						// targetsの並び順にcontextに書き込む
						$.each(images, function (k, y) {
							context.drawImage(y, 0, 0, y.width, y.height);
							console.log("charmaker.makeupCanvasForDownload", "drew", y.src);
						});
						endProc();
					}
                };
				images.push(img);
                img.src = srcFullSize;
            });
            return true; // means "continue;"
        }
    });
}

/**
 * イメージのダウンロードを行います
 * @param {canvas} canvas 作成元canvas要素
 */
charmaker.download = function (canvas) {
	console.log("charmaker.download", canvas);
	charmaker.makeupCanvasForDownload(canvas, function () {
		var a = $("#" + charmaker.downLoadLinkID);
		a.attr("href", canvas.toDataURL())
			.attr("download", "mypic.png");
		// clickはjQueryオブジェクトに送ってもなぜかだめで、DOMエレメントに直接送るとうまくいく
		a.get(0).click();
	});
};

/**
 * charmakerオブジェクトを初期化します。
 */
charmaker.init = function () {
    console.log("charmaker.init()");

    // charmaker_userconfigに定義されたサムネイル群に対する初期設定
    $.each(charmaker_userconfig.targets, function (i, x) {
        var targets = $(x.selector);

        // 初期選択の指定があれば選択状態にします
        $(x.initialSelected).attr(charmaker.selectedAttributeName, true);
        
        // グループ毎にclickハンドラを設定
        targets.on("click",
            /**
             * ターゲット要素（div)のonClickハンドラ
             */
            function (e) {
                console.log("targets.on(click)", e);
                // クリックされた要素がすでに選択済かどうかを覚えておきます
                var preSelected = $(e.target).attr(charmaker.selectedAttributeName);
                // グループ内のすべての要素の選択をいったんクリアし
                targets.removeAttr(charmaker.selectedAttributeName);
                if (x.selectionRule == "oneAndOnlyOne") {
                    // 必ずひとつ選ぶ設定なら
                    // クリックされた要素を選択済にします（最初に選択済なら結果的に変化なし）
                    $(e.target).attr(charmaker.selectedAttributeName, true);
                } else if (x.selectionRule == "zeroOrOne") {
                    // どれも選択しないかひとつ選択するかいずれかの設定なら
                    // クリックされた要素が最初未選択だった時に限り選択済にします
                    if (!preSelected) {
                        $(e.target).attr(charmaker.selectedAttributeName, true);
                    }
                }
                // 選択が変更されるたびに、重ね合わせ画像を再作成します。
                charmaker.makeImageForDisplay(
					charmaker_userconfig.targetCanvas.width, 
					charmaker_userconfig.targetCanvas.height,
					e.target);
                return true;
            });
    });

    $.each(charmaker_userconfig.scrollMenu.elements, function (i, x) {
        $(x.icon).on("click", function () {
            $("html,body").animate({
                scrollTop: $(x.target).offset().top
                + charmaker_userconfig.scrollMenu.commonOffset
            });
        });
    });

    // ダウンロード用に必要なa要素の作成
    $("<a id='" + charmaker.downLoadLinkID + "'>x</a>").
        appendTo("body", document).hide();
    // 画像生成に必要なcanvas要素の作成
    $("<canvas id='" + charmaker_userconfig.targetCanvas.id +
        "' width=" + charmaker_userconfig.targetCanvas.width +
        " height=" + charmaker_userconfig.targetCanvas.height +
        "></canvas>").appendTo("body", document).hide();

    // 画像ダウンロードイベントトリガー設定とイベント発生時処理
    $(charmaker_userconfig.downloadEventSource.selector).
        on(charmaker_userconfig.downloadEventSource.eventName,
        function () {
            charmaker.download(document.getElementById(charmaker_userconfig.targetCanvas.id));
        });
};

// 読み込み元のドキュメントready時にオブジェクトを初期化します。
$(document).ready(function () {
    charmaker.init();
});
