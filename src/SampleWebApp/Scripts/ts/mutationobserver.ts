document.addEventListener("DOMContentLoaded", _ => {
	const target = document.querySelector("#mo-target");
	if (!target) {
		return;
	}

	const callback: MutationCallback = (mutations: MutationRecord[], _: MutationObserver) => {
		mutations.forEach(mutation => {
			// todo:
			console.log(mutation);
		});
	};
	const options: MutationObserverInit = {
		childList: true
	};
	new MutationObserver(callback).observe(target, options);

	document.querySelector<HTMLButtonElement>("#mo-button-append")?.addEventListener("click", _ => {
		// todo:
		alert("append");
	});
	document.querySelector<HTMLButtonElement>("#mo-button-remove")?.addEventListener("click", _ => {
		// todo:
		alert("remove");
	});
});
