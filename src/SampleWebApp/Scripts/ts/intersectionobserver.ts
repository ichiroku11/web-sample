document.addEventListener("DOMContentLoaded", _ => {
	const viewport = document.querySelector("#io-viewport");
	if (!viewport) {
		return;
	}
	const target = document.querySelector("#io-target");
	if (!target) {
		return;
	}

	// entries: 監視対象の要素が接している（交わっている）場合複数になるらしい
	const callback = (entries: IntersectionObserverEntry[], _: IntersectionObserver) => {
		// 今回のサンプルでは常に1つのはず
		console.log(`entries.length: ${entries.length}`);
		for (const entry of entries) {
			console.log(`entry.isIntersecting: ${entry.isIntersecting}`);
			console.log(`entry.intersectionRatio: ${entry.intersectionRatio}`);
		}
	};

	const options: IntersectionObserverInit = {
		root: viewport,
	};

	const observer = new IntersectionObserver(callback, options);
	observer.observe(target);
});
