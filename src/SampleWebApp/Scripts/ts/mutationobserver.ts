document.addEventListener("DOMContentLoaded", _ => {
	const target = document.querySelector("#mo-target");
	if (!target) {
		return;
	}

	const log = document.querySelector<HTMLTextAreaElement>("#mo-log");
	if (!log) {
		return;
	}

	const callback: MutationCallback = (mutations: MutationRecord[], _: MutationObserver) => {
		mutations.forEach(mutation => {
			console.log(mutation);

			if (log.textLength > 0) {
				log.textContent += "\n";
			}

			const added: string[] = [];
			const removed: string[] = [];
			mutation.addedNodes.forEach(node => {
				if (node.textContent && node.textContent?.length > 0) {
					added.push(node.textContent);
				}
			});
			mutation.removedNodes.forEach(node => {
				if (node.textContent && node.textContent?.length > 0) {
					removed.push(node.textContent);
				}
			});

			const json = JSON.stringify({ added, removed });
			log.textContent += json;
		});
	};
	const options: MutationObserverInit = {
		childList: true
	};
	new MutationObserver(callback).observe(target, options);

	const numbers = "0123456789";
	let index = 0;

	document.querySelector<HTMLButtonElement>("#mo-button-append")?.addEventListener("click", _ => {
		if (index >= numbers.length) {
			return;
		}

		const item = document.createElement("span");
		item.textContent = numbers[index];
		target.appendChild(item);
		index++;
	});

	document.querySelector<HTMLButtonElement>("#mo-button-remove")?.addEventListener("click", _ => {
		if (!target.lastChild) {
			return;
		}

		target.removeChild(target.lastChild);
		index--;
	});
});
