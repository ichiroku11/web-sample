/**
 * 指定したミリ秒後に完了する
 * @param delay
 */
async function delay(delay: number): Promise<void> {
	return new Promise<void>((resolve, _) => {
		window.setTimeout(() => resolve(), delay);
	});
}

// 参考
// https://fuyu.hatenablog.com/entry/2021/01/13/235035

/**
 * フェードイン（指定ミリ秒間で不透明にする）する
 * @param element 対象要素
 * @param duration アニメーション期間（ミリ秒）
 */
async function fadeIn(element: HTMLElement, duration: number): Promise<void> {
	const start = performance.now();

	let opacity = 0;
	while (opacity < 1) {
		element.style.opacity = opacity.toString();

		// requestAnimationFrameのコールバック引数は「コールバックの呼び出しを開始した現在時刻」
		// その時刻をresolveの引数に渡すので、Promiseをawaitすると取得できる
		// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
		const now = await new Promise<number>((resolve, _) => window.requestAnimationFrame(resolve));

		opacity = (now - start) / duration;
	}

	element.style.opacity = "1";
}

/**
 * フェードアウト（指定ミリ秒間で透明にする）する
 * @param element 対象要素
 * @param duration アニメーション期間（ミリ秒）
 */
async function fadeOut(element: HTMLElement, duration: number): Promise<void> {
	const start = performance.now();

	let opacity = 1;
	while (opacity > 0) {
		element.style.opacity = opacity.toString();

		const now = await new Promise<number>((resolve, _) => window.requestAnimationFrame(resolve));

		opacity = 1 - (now - start) / duration;
	}

	element.style.opacity = "0";
}

document.addEventListener("DOMContentLoaded", async _ => {
	const element = document.querySelector<HTMLDivElement>("#content");
	if (!element) {
		return;
	}

	// 最初は透明
	element.style.opacity = "0";
	element.innerText = "あいうえお";

	// 2sでフェードイン
	// 2s間そのまま
	// 2sでフェードアウト
	await fadeIn(element, 2000);
	await delay(2000);
	await fadeOut(element, 2000);
});
