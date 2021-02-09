/**
 * 指定したミリ秒後に完了する
 * @param delayMs
 */
async function delay(delayMs: number): Promise<void> {
	return new Promise<void>((resolve, _) => {
		window.setTimeout(() => resolve(), delayMs);
	});
}

/**
 * フェードイン（指定ミリ秒間で不透明にする）する
 * @param element 対象要素
 * @param durationMs アニメーション期間（ミリ秒）
 */
async function fadeIn(element: HTMLElement, durationMs: number): Promise<void> {
	// todo: animation
	return new Promise<void>((resolve, _) => {
		window.setTimeout(() => {
			element.style.opacity = "1";
			resolve();
		}, durationMs);
	});
}

/**
 * フェードアウト（指定ミリ秒間で透明にする）する
 * @param element 対象要素
 * @param durationMs アニメーション期間（ミリ秒）
 */
async function fadeOut(element: HTMLElement, durationMs: number): Promise<void> {
	return new Promise<void>((resolve, _) => {
		// todo: animation
		window.setTimeout(() => {
			element.style.opacity = "0";
			resolve();
		}, durationMs);
	});
}

document.addEventListener("DOMContentLoaded", async _ => {
	const element = document.querySelector<HTMLDivElement>("#content");
	if (!element) {
		return;
	}

	element.innerText = "あいうえお";

	// 最初は透明
	element.style.opacity = "0";

	// 2sでフェードイン
	// 2s間そのまま
	// 2sでフェードアウト
	await fadeIn(element, 2000);
	await delay(2000);
	await fadeOut(element, 2000);
});
