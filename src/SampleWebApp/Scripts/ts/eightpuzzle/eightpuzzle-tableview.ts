import { range } from "../../lib";
import { EightPuzzleBoard } from "./eightpuzzle-board";

const cellCount = 3;
const cellRange = range(0, cellCount);

/*
 * 8パズルtable要素ビュー
 */
export class EightPuzzleTableView {
	private readonly _board: EightPuzzleBoard;
	private readonly _table: HTMLTableElement;

	/**
	 * @param board ボード
	 * @param selector コンテナのセレクタ
	 */
	public constructor(board: EightPuzzleBoard, selector: string) {
		this._board = board;
		this._table = this.create();

		const element = document.querySelector(selector);
		if (element) {
			element.innerHTML = "";
			element.appendChild(this._table);
		}
	}

	/** table要素を生成する */
	private create(): HTMLTableElement {
		const table = document.createElement("table");
		const tbody = document.createElement("tbody");

		for (const y of cellRange) {
			const tr = document.createElement("tr");
			for (const x of cellRange) {
				const td = document.createElement("td");

				td.textContent = this._board.tileAsString(x, y);

				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);

		return table;
	}
}
