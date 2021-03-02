
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
	public slide(position: EightPuzzleSlidePosition): EightPuzzleBoard | null {
		// 空きマスのインデックス
		const indexEmpty = this._tiles.indexOf(eightPuzzleTileEmpty);

		// 空きマスの(x, y)座標（x:右とy:下が正方向）
		const empty = {
			x: Math.floor(indexEmpty % 3),
			y: Math.floor(indexEmpty / 3),
		};

		// スライドするタイルの(x, y)座標
		let tile = {
			x: empty.x,
			y: empty.y
		};
		switch (position) {
			case "top":
				tile.y++;
				break;
			case "left":
				tile.x++;
				break;
			case "right":
				tile.x++;
				break;
			case "bottom":
				tile.y++;
				break;
		}

		if (tile.x < 0 || tile.x >= 3) {
			return null;
		}
		if (tile.y < 0 || tile.y >= 3) {
			return null;
		}

		// スライドするタイルのインデックス
		const indexTile = tile.x + tile.y;
		// todo:

		return this;
	}

	public toJson(): string {
		return JSON.stringify(this._tiles);
	}
}
