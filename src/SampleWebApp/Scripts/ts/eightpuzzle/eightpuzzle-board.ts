
type SlidePos = "top" | "bottom" | "left" | "right";

/**
 * 8パズルボード
 */
export class EightPuzzleBoard {
	public static fromJson(json: string): EightPuzzleBoard {
		const tiles = JSON.parse(json);

		if (!Array.isArray<number>(tiles)) {
			// todo:
			throw new Error();
		}

		return new EightPuzzleBoard(tiles);
	}

	private static validate(tiles: number[]): void {
		// todo: 0～9までの数字が1つずつかどうか
		if (tiles.length !== 9) {
			// todo:
			throw new Error();
		}

		// todo: 
	}

	private readonly _tiles: number[];

	public constructor(tiles: number[]) {
		EightPuzzleBoard.validate(tiles);
		this._tiles = tiles;
	}

	// 空きマスの上下左右のタイルをスライドする
	public slide(pos: SlidePos): EightPuzzleBoard {
		// todo:
		return this;
	}

	public toJson(): string {
		return JSON.stringify(this._tiles);
	}
}
