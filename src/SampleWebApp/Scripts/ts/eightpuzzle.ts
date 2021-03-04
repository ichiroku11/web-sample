import { EightPuzzleBoard } from "./eightpuzzle/eightpuzzle-board";
import { EightPuzzleTableView } from "./eightpuzzle/eightpuzzle-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	new EightPuzzleTableView(EightPuzzleBoard.createGaol(), "#eight-puzzle-view");
});
