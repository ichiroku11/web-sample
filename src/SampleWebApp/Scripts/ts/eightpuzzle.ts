import { EightPuzzleBoard } from "./eightpuzzle/eightpuzzle-board";
import { EightPuzzleResolver } from "./eightpuzzle/eightpuzzle-resolver";
import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	const resolver = new EightPuzzleResolver();

	let question: EightPuzzleBoard;
	const generate = () => {
		question = EightPuzzleBoard.random();
		new EightPuzzleTableView(question, "#ep-question");
	};
	generate();

	document.querySelector<HTMLButtonElement>("#ep-button-generate")?.addEventListener("click", _ => {
		generate();
	});

	document.querySelector<HTMLButtonElement>("#ep-button-resolve")?.addEventListener("click", _ => {
		const container = document.querySelector("#ep-result");
		if (!container) {
			return;
		}
		container.innerHTML = "";

		const results = resolver.resolve(question);
		if (results.length === 0) {
			container.textContent = "Not found";
			return;
		}

		results.forEach((result, index) => {
			const id = `ep-result${index}`;

			const div = document.createElement("div");
			div.setAttribute("id", id)
			container.appendChild(div);
			new EightPuzzleTableView(result, `#${id}`);

			console.dir(result.json);
		})
	});
});
