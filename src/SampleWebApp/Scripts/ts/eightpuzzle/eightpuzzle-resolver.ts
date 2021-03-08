import { EightPuzzleBoard, eightPuzzleSlideDirs } from "./eightpuzzle-board";

/**
 * 8パズルリゾルバ
 */
export class EightPuzzleResolver {
	// 連続で実行する処理時間
	private readonly _period = 200;

	// 前のボードから次のボードへのマップ
	private readonly _prevs = new Map<string, string | null>();

	/**
	 * 幅優先探索
	 * @param unsearched 未探索ボードのキュー
	 */
	private search(unsearched: EightPuzzleBoard[]): Promise<void> {
		const start = window.performance.now();

		while (unsearched.length > 0) {
			const now = window.performance.now();

			// UIスレッドをブロックしないように一定間隔ごとに処理を実行する
			if (now - start >= this._period) {
				return new Promise((resolve) => {
					window.setTimeout(async () => {
						await this.search(unsearched);
						resolve();
					}, 0);
				});
			}

			const current = unsearched.shift();
			if (!current) {
				break;
			}

			// 4方にスライドさせる
			for (let dir of eightPuzzleSlideDirs) {
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

		return Promise.resolve();
	}

	/**
	 * 8パズルを解く
	 * @param start
	 */
	public async resolve(start: EightPuzzleBoard): Promise<EightPuzzleBoard[]> {
		if (this._prevs.size === 0) {
			// ゴールの状態からスタートの状態への幅優先探索
			const goal = EightPuzzleBoard.goal;
			this._prevs.set(goal.json, null);

			await this.search([goal]);
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
