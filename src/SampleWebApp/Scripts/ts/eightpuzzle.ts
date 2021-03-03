import { EightPuzzleBoard } from "./eightpuzzle/eightpuzzle-board";
import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	const board = EightPuzzleBoard.createGaol();

	const view = new EightPuzzleTableView("#eight-puzzle-view");
	view.init();
});
