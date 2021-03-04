import { EightPuzzleBoard, eightPuzzleSlideDirs } from "./eightpuzzle-board";

/**
 * 8パズルリゾルバ
 */
export class EightPuzzleResolver {

	private readonly _prevs = new Map<string, string>();

	// 構築する
	public build(): void {
		this._prevs.clear();

		// ゴールからスタートへの幅優先探索
		const goal = EightPuzzleBoard.createGaol();
		const todos: EightPuzzleBoard[] = [goal];
		const dists = new Map<string, number>([[goal.toJson(), 0]]);

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
				if (dists.has(next.toJson())) {
					continue;
				}

				todos.push(next);
				dists.set(next.toJson(), dists.get(current.toJson())! + 1);
				this._prevs.set(next.toJson(), current.toJson());
			}
		}
	}

	// 解決する
	public resolve(start: EightPuzzleBoard): EightPuzzleBoard[] {
		const result: EightPuzzleBoard[] = [];

		let current = start;
		while (this._prevs.has(current.toJson())) {
			current = EightPuzzleBoard.fromJson(this._prevs.get(current.toJson())!);
			result.push(current);
		}

		return result;
	}
}
