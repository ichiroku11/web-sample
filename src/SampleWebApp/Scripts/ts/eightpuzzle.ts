import { EightPuzzleBoard } from "./eightpuzzle/eightpuzzle-board";
import { EightPuzzleResolver } from "./eightpuzzle/eightpuzzle-resolver";
import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	new EightPuzzleTableView(EightPuzzleBoard.goal, "#eight-puzzle-view");

	const resolver = new EightPuzzleResolver();

	document.querySelector<HTMLButtonElement>("#eight-puzzle-button-resolve")?.addEventListener("click", _ => {
		const start = new EightPuzzleBoard([1, 0, 3, 4, 2, 5, 7, 8, 6]);

		const results = resolver.resolve(start);
		for (const result of results) {
			console.dir(result.json);
		}
	});
});
