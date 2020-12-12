import { SudokuBoard } from "./sudoku/sudoku-board";
import { SudokuQuestions } from "./sudoku/sudoku-questions";
import { SimpleSudokuResolver } from "./sudoku/sudoku-resolver";
import { SudokuTableView } from "./sudoku/sudoku-tableview";

document.addEventListener("DOMContentLoaded", _ => {
	const defaults = SudokuQuestions.hard1;

	const resolver = new SimpleSudokuResolver(new SudokuBoard(defaults));
	resolver
		.subscribe(
			(x, y, value) => {
				view.update(x, y, value);
			},
			() => {
				alert("Resolved!");
			}
		);

	const view = new SudokuTableView("#sudoku-view");
	view.init(defaults);

	const button = document.querySelector("#sudoku-button-resolve");
	button?.addEventListener("click", async () => {
		await resolver.resolve();
	});
});
