
// 0は空きマスとする
const eightPuzzleTileEmpty = 0;

// タイル
// todo: TileNumbers?
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
	/**
	 * ゴール
	 */
	public static goal = new EightPuzzleBoard([1, 2, 3, 4, 5, 6, 7, 8, 0]);

	/**
	 * ランダムに生成
	 */
	public static random(): EightPuzzleBoard {
		// todo:
		return new EightPuzzleBoard([1, 0, 3, 4, 2, 5, 7, 8, 6]);
	}

	/**
	 * JSON文字列からボードを生成
	 * @param json
	 */
	public static fromJson(json: string): EightPuzzleBoard {
		const tiles = JSON.parse(json);

		if (!Array.isArray<EightPuzzleTile>(tiles)) {
			// todo:
			throw new Error();
		}

		return new EightPuzzleBoard(tiles);
	}

	/**
	 * タイル配列を検証
	 * @param tiles
	 */
	private static validate(tiles: EightPuzzleTile[]): void {
		// todo: 0～8までの数字が1つずつかどうか
		if (tiles.length !== 9) {
			// todo:
			throw new Error();
		}

		// todo: 他にもありそう
	}

	private readonly _tiles: EightPuzzleTile[];
	private readonly _json: string;

	/**
	 * 
	 * @param tiles
	 */
	public constructor(tiles: EightPuzzleTile[]) {
		EightPuzzleBoard.validate(tiles);
		this._tiles = tiles;
		this._json = JSON.stringify(this._tiles);
	}

	/** JSON文字列を取得 */
	public get json(): string {
		return this._json;
	}

	/**
	 * 座標からタイルの値を取得
	 * @param x
	 * @param y
	 */
	private tile(x: number, y: number): EightPuzzleTile { 
		// todo:
		if (x < 0 || x >= 3 || y < 0 || y >= 3) {
			throw new Error();
		}

		// todo; (x, y) => index
		const tileIndex = x + y * 3;

		return this._tiles[tileIndex];
	}

	/**
	 * 座標からタイル文字列を取得
	 * @param x
	 * @param y
	 */
	public tileAsString(x: number, y: number): string {
		const tile = this.tile(x, y);

		return tile === eightPuzzleTileEmpty
			? ""
			: tile.toString();
	}

	/**
	 * 指定した位置（上下左右）の座標を取得
	 * @param original
	 * @param position
	 */
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

	/**
	 * 空きマスの上下左右のタイルをスライドする
	 * @param dir
	 */
	public slide(dir: EightPuzzleSlideDir): EightPuzzleBoard | null {
		// 空きマスのインデックス
		const emptyIndex = this._tiles.indexOf(eightPuzzleTileEmpty);

		// 空きマスの(x, y)座標（x:右とy:下が正方向）
		// todo; index => (x, y)
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
		// todo; (x, y) => index
		const tileIndex = tilePos.x + tilePos.y * 3;

		// 空きマスと対象のタイルを入れ替える
		const tiles = [...this._tiles];
		[tiles[emptyIndex], tiles[tileIndex]] = [tiles[tileIndex], tiles[emptyIndex]];
		return new EightPuzzleBoard(tiles);
	}
}
