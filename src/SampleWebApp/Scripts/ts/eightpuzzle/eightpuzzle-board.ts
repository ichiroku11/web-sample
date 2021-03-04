
// 0は空きマスとする
const eightPuzzleTileEmpty = 0;

// スライドするタイル
const eightPuzzleTiles = [eightPuzzleTileEmpty, 1, 2, 3, 4, 5, 6, 7, 8] as const;

type EightPuzzleTile = typeof eightPuzzleTiles[number];

// スライドするタイルの位置（空のマスが基準）
export const eightPuzzleSlideDirs = ["top", "bottom", "left", "right"] as const;

export type EightPuzzleSlideDir = typeof eightPuzzleSlideDirs[number];


type EightPuzzleBoardPos = {
	x: number,
	y: number,
};


/**
 * 8パズルボード
 */
export class EightPuzzleBoard {
	public static createGaol(): EightPuzzleBoard {
		return new EightPuzzleBoard([1, 2, 3, 4, 5, 6, 7, 8, 0]);
	}

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

	private tile(x: number, y: number): EightPuzzleTile { 
		// todo:
		if (x < 0 || x >= 3 || y < 0 || y >= 3) {
			throw new Error();
		}

		const tileIndex = x + y * 3;

		return this._tiles[tileIndex];
	}

	public tileAsString(x: number, y: number): string {
		const tile = this.tile(x, y);

		return tile === eightPuzzleTileEmpty
			? ""
			: tile.toString();
	}

	// 指定した位置（上下左右）の座標を取得
	private slidePos(original: EightPuzzleBoardPos, position: EightPuzzleSlideDir): EightPuzzleBoardPos | null {
		let result = {
			x: original.x,
			y: original.y
		};

		switch (position) {
			case "top":
				result.y--;
				break;
			case "left":
				result.x--;
				break;
			case "right":
				result.x++;
				break;
			case "bottom":
				result.y++;
				break;
		}

		// 範囲外
		// todo:
		if (result.x < 0 || result.x >= 3 || result.y < 0 || result.y >= 3) {
			return null;
		}

		return result;
	}

	// 空きマスの上下左右のタイルをスライドする
	public slide(dir: EightPuzzleSlideDir): EightPuzzleBoard | null {
		// 空きマスのインデックス
		const emptyIndex = this._tiles.indexOf(eightPuzzleTileEmpty);

		// 空きマスの(x, y)座標（x:右とy:下が正方向）
		const emptyPos = {
			x: Math.floor(emptyIndex % 3),
			y: Math.floor(emptyIndex / 3),
		};

		// スライドするタイルの(x, y)座標
		const tilePos = this.slidePos(emptyPos, dir);
		if (!tilePos) {
			return null;
		}

		// スライドするタイルのインデックス
		// todo:
		const tileIndex = tilePos.x + tilePos.y * 3;

		// 空きマスと対象のタイルを入れ替える
		const tiles = [...this._tiles];
		[tiles[emptyIndex], tiles[tileIndex]] = [tiles[tileIndex], tiles[emptyIndex]];
		return new EightPuzzleBoard(tiles);
	}

	public toJson(): string {
		return JSON.stringify(this._tiles);
	}
}
