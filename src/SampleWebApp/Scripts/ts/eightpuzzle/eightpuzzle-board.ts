
// 空のマス
const eightPuzzleTileEmpty = 0;

// スライドするタイル
const eightPuzzleTiles = [eightPuzzleTileEmpty, 1, 2, 3, 4, 5, 6, 7, 8] as const;

type EightPuzzleTile = typeof eightPuzzleTiles[number];


// スライドするタイルの位置（空のマスが基準）
const eightPuzzleSlidePositions = ["top", "bottom", "left", "right"] as const;

type EightPuzzleSlidePosition = typeof eightPuzzleSlidePositions[number];



/**
 * 8パズルボード
 */
export class EightPuzzleBoard {
	// 0は空きマスとする
	public static readonly Goal = new EightPuzzleBoard([1, 2, 3, 4, 5, 6, 7, 8, 0]);


	public static fromJson(json: string): EightPuzzleBoard {
		const tiles = JSON.parse(json);

		if (!Array.isArray<EightPuzzleTile>(tiles)) {
			// todo:
			throw new Error();
		}

		return new EightPuzzleBoard(tiles);
	}

	private static validate(tiles: EightPuzzleTile[]): void {
		// todo: 0～8までの数字が1つずつかどうか
		if (tiles.length !== 9) {
			// todo:
			throw new Error();
		}

		// todo: 
	}

	private readonly _tiles: EightPuzzleTile[];

	public constructor(tiles: EightPuzzleTile[]) {
		EightPuzzleBoard.validate(tiles);
		this._tiles = tiles;
	}

	// 空きマスの上下左右のタイルをスライドする
	public slide(position: EightPuzzleSlidePosition): EightPuzzleBoard {
		// 空きマスの位置を探す
		const index = this._tiles.indexOf(eightPuzzleTileEmpty);

		// todo:
		return this;
	}

	public toJson(): string {
		return JSON.stringify(this._tiles);
	}
}
