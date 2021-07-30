document.addEventListener("DOMContentLoaded", _ => {
	const viewport = document.querySelector("#io-viewport");
	if (!viewport) {
		return;
	}
	const target = document.querySelector("#io-target");
	if (!target) {
		return;
	}

	const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		// todo:
	};

	const options: IntersectionObserverInit = {
		root: viewport,
	};

	const observer = new IntersectionObserver(callback, options);
	observer.observe(target);
});
