import { EightPuzzleBoard, eightPuzzleSlideDirs } from "./eightpuzzle-board";

/**
 * 8パズルリゾルバ
 */
export class EightPuzzleResolver {
	private readonly _prevs = new Map<string, string | null>();

	// 構築する
	public build(): void {
		// ゴールからスタートへの幅優先探索
		const goal = EightPuzzleBoard.createGaol();

		this._prevs.clear();
		this._prevs.set(goal.toJson(), null);

		// 未探索
		const todos: EightPuzzleBoard[] = [goal];

		while (todos.length > 0) {
			const current = todos.shift();
			if (!current) {
				break;
			}

			for (var dir of eightPuzzleSlideDirs) {
				const next = current.slide(dir);

				// スライドできない
				if (!next) {
					continue;
				}

				// すでに探索済み
				if (this._prevs.has(next.toJson())) {
					continue;
				}

				todos.push(next);
				this._prevs.set(next.toJson(), current.toJson());
			}
		}
	}

	// 解決する
	public resolve(start: EightPuzzleBoard): EightPuzzleBoard[] {
		const result: EightPuzzleBoard[] = [];

		let temp = start;
		while (this._prevs.has(temp.toJson())) {
			const next = this._prevs.get(temp.toJson());
			if (!next) {
				break;
			}

			temp = EightPuzzleBoard.fromJson(next);
			result.push(temp);
		}

		return result;
	}
}
