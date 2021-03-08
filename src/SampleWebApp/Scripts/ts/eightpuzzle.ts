import { EightPuzzleBoard } from "./eightpuzzle/eightpuzzle-board";
import { EightPuzzleResolver } from "./eightpuzzle/eightpuzzle-resolver";
import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	const resolver = new EightPuzzleResolver();

	let question: EightPuzzleBoard;

	const random = () => {
		question = EightPuzzleBoard.random();
		new EightPuzzleTableView(question, "#ep-question");
	};

	const resolve = async () => {
		const container = document.querySelector("#ep-result");
		if (!container) {
			return;
		}
		container.innerHTML = "In progress...";

		const results = await resolver.resolve(question);
		if (results.length === 0) {
			container.textContent = "Not found";
			return;
		}

		container.innerHTML = "";
		results.forEach((result, index) => {
			const view = document.createElement("div");
			view.classList.add("ep-result-view");
			new EightPuzzleTableView(result, view);
			container.appendChild(view);

			if (index >= results.length - 1) {
				return;
			}

			const arrow = document.createElement("div");
			arrow.classList.add("ep-result-arrow");
			arrow.textContent = "→";
			container.appendChild(arrow);
		})
	};

	document.querySelector<HTMLButtonElement>("#ep-button-random")?.addEventListener("click", _ => {
		random();
		resolve();
	});

	random();
	resolve();
});
