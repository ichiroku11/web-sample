import { EightPuzzleBoard, eightPuzzleSlideDirs } from "./eightpuzzle-board";

/**
 * 8パズルリゾルバ
 */
export class EightPuzzleResolver {
	// 前のボードから次のボードへのマップ
	private readonly _prevs = new Map<string, string | null>();

	/**
	 * ゴールの状態からスタートの状態への幅優先探索
	 */
	private search(): void {
		const goal = EightPuzzleBoard.goal;
		this._prevs.set(goal.json, null);

		// 未探索ボードのキュー
		const unsearched: EightPuzzleBoard[] = [goal];

		while (unsearched.length > 0) {
			const current = unsearched.shift();
			if (!current) {
				break;
			}

			// 4方にスライドさせる
			for (var dir of eightPuzzleSlideDirs) {
				const next = current.slide(dir);

				// スライドできない
				if (!next) {
					continue;
				}

				// すでに探索済み
				if (this._prevs.has(next.json)) {
					continue;
				}

				// スライド後のボードを未探索キューに登録
				unsearched.push(next);

				// スライド前後のボードをマップに登録
				this._prevs.set(next.json, current.json);
			}
		}
	}

	/**
	 * 8パズルを解く
	 * @param start
	 */
	public resolve(start: EightPuzzleBoard): EightPuzzleBoard[] {
		if (this._prevs.size === 0) {
			this.search();
		}

		const result: EightPuzzleBoard[] = [];

		let temp = start;
		while (this._prevs.has(temp.json)) {
			const next = this._prevs.get(temp.json);
			if (!next) {
				break;
			}

			temp = EightPuzzleBoard.fromJson(next);
			result.push(temp);
		}

		return result;
	}
}
