document.addEventListener("DOMContentLoaded", _ => {
	const viewport = document.querySelector("#io-viewport");
	if (!viewport) {
		return;
	}
	const target = document.querySelector("#io-target");
	if (!target) {
		return;
	}
	const status = document.querySelector("#io-status");
	if (!status) {
		return;
	}

	// entries: 監視対象の要素が接している（交わっている）場合複数になるらしい
	const callback = (entries: IntersectionObserverEntry[], _: IntersectionObserver) => {
		// 今回のサンプルでは常に1つのはず
		console.log(`entries.length: ${entries.length}`);
		const entry = entries.shift();
		if (!entry) {
			return;
		}
		console.log(`entry.isIntersecting: ${entry.isIntersecting}`);
		console.log(`entry.intersectionRatio: ${entry.intersectionRatio}`);

		status.innerHTML = `isIntersecting: ${entry.isIntersecting}<br />intersectionRatio: ${entry.intersectionRatio}`;
		status.classList.toggle("io-intersecting", entry.isIntersecting);
	};

	const options: IntersectionObserverInit = {
		// root: 観察するエリア
		root: viewport,
		// threshold: コールバックを呼び出す閾値（デフォルトは0）
		//threshold: [0, 0.25, 0.5, 0.75, 1]
	};

	const observer = new IntersectionObserver(callback, options);
	observer.observe(target);
});
