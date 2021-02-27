document.addEventListener("DOMContentLoaded", _ => {
	let page = 1;
	const input = document.querySelector<HTMLInputElement>(".input-page")!;
	const textarea = document.querySelector<HTMLTextAreaElement>(".textarea-state")!;

	const updatePageValue = () => {
		input.setAttribute("value", page.toString());
	};

	updatePageValue();

	window.addEventListener("popstate", event => {
		const state = (event as PopStateEvent).state;
		const json = JSON.stringify(state);

		textarea.append(json);
		textarea.append("\n");
	});

	document.querySelector<HTMLButtonElement>(".button-push-state")?.addEventListener("click", _ => {
		history.pushState({ page }, `page ${page}`, `?page=${page}`);

		page++;
		updatePageValue();
	});

	document.querySelector<HTMLButtonElement>(".button-replace-state")?.addEventListener("click", _ => {
		history.replaceState({ page }, `page ${page}`, `?page=${page}`);

		page++;
		updatePageValue();
	});

	document.querySelector<HTMLButtonElement>(".button-back")?.addEventListener("click", _ => history.back());
});
