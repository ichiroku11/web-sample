
// 空きマスの値
const emptyTile = 0;

// タイルの値
const tiles = [emptyTile, 1, 2, 3, 4, 5, 6, 7, 8] as const;

// タイル
type Tile = typeof tiles[number];

// ボード上の座標
type BoardPos = {
	x: number,
	y: number,
};

/**
 * スライドするタイルの位置の値
 */
export const eightPuzzleSlideDirs = ["top", "bottom", "left", "right"] as const;

/**
 * スライドするタイルの位置（空のマスが基準）
 */
export type EightPuzzleSlideDir = typeof eightPuzzleSlideDirs[number];

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
		const tiles: Tile[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];

		// シャッフル
		for (let index = tiles.length - 1; index > 0; index--) {
			const target = Math.floor(Math.random() * (index + 1));
			[tiles[index], tiles[target]] = [tiles[target], tiles[index]];
		}

		return new EightPuzzleBoard(tiles);
	}

	/**
	 * JSON文字列からボードを生成
	 * @param json
	 */
	public static fromJson(json: string): EightPuzzleBoard {
		const tiles = JSON.parse(json);

		if (!Array.isArray<Tile>(tiles)) {
			// todo:
			throw new Error();
		}

		return new EightPuzzleBoard(tiles);
	}

	/**
	 * タイル配列を検証
	 * @param tiles
	 */
	private static validate(tiles: Tile[]): void {
		if (tiles.length !== 9) {
			// todo:
			throw new Error();
		}

		// todo: 0～8までの数字が1つずつかどうか？
		// todo: 他にもありそう
	}

	private readonly _tiles: Tile[];
	private readonly _json: string;

	/**
	 * 
	 * @param tiles
	 */
	public constructor(tiles: Tile[]) {
		EightPuzzleBoard.validate(tiles);

		this._tiles = tiles;
		this._json = JSON.stringify(this._tiles);
	}

	/** JSON文字列を取得 */
	public get json(): string {
		return this._json;
	}

	/**
	 * 座標から配列のインデックスを取得
	 * @param x
	 * @param y
	 */
	private index(x: number, y: number): number {
		return x + y * 3;
	}

	/**
	 * ボード上の座標が有効かどうか
	 * @param x
	 * @param y
	 */
	private isValidPos(x: number, y: number): boolean {
		return x >= 0 && x < 3 && y >= 0 && y < 3;
	}

	/**
	 * 座標からタイルの値を取得
	 * @param x
	 * @param y
	 */
	private tile(x: number, y: number): Tile {
		if (!this.isValidPos(x, y)) {
			// todo:
			throw new Error();
		}

		const tileIndex = this.index(x, y);

		return this._tiles[tileIndex];
	}

	/**
	 * 座標からタイル文字列を取得
	 * @param x
	 * @param y
	 */
	public tileAsString(x: number, y: number): string {
		const tile = this.tile(x, y);

		return tile === emptyTile
			? ""
			: tile.toString();
	}

	/**
	 * 指定した位置（上下左右）の座標を取得
	 * @param original
	 * @param position
	 */
	private slidePos(original: BoardPos, position: EightPuzzleSlideDir): BoardPos | null {
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
		if (!this.isValidPos(result.x, result.y)) {
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
		const emptyIndex = this._tiles.indexOf(emptyTile);

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
		const tileIndex = this.index(tilePos.x, tilePos.y);

		// 空きマスと対象のタイルを入れ替える
		const tiles = [...this._tiles];
		[tiles[emptyIndex], tiles[tileIndex]] = [tiles[tileIndex], tiles[emptyIndex]];
		return new EightPuzzleBoard(tiles);
	}
}
