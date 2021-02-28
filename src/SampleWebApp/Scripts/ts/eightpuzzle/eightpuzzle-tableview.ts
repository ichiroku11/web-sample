import { range } from "../../lib";

const cellCount = 3;
const cellRange = range(0, cellCount);

/*
 * 8パズルtable要素ビュー
 */
export class EightPuzzleTableView {
	private readonly _table: HTMLTableElement;

	/**
	 * 
	 * @param selector コンテナのセレクタ
	 */
	public constructor(selector: string) {
		this._table = this.create();

		document.querySelector(selector)?.appendChild(this._table);
	}

	/** table要素を生成する */
	private create(): HTMLTableElement {
		const table = document.createElement("table");
		const tbody = document.createElement("tbody");

		for (const _ of cellRange) {
			const tr = document.createElement("tr");
			for (const _ of cellRange) {
				const td = document.createElement("td");

				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);

		return table;
	}

	private getCell(x: number, y: number): HTMLTableCellElement {
		const td = this._table.querySelector<HTMLTableCellElement>(`tr:nth-child(${y + 1}) > td:nth-child(${x + 1})`);
		if (!td) {
			// todo:
			throw new Error();
		}

		return td;
	}

	public init(): void {
		let value = 1;

		for (const y of cellRange) {
			for (const x of cellRange) {
				const td = this.getCell(x, y);
				td.textContent = value === 9
					? ""
					: value.toString();
				value++;
			}
		}
	}
}
