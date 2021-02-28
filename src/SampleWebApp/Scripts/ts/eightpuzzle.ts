import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	const view = new EightPuzzleTableView("#eight-puzzle-view");
	view.init();
});
