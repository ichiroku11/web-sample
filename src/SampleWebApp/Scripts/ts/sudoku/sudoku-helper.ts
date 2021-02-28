
/** 1行の（1列の）セル数 */
export const sudokuCellCount = 9;

/** 座標のx成分・y成分の値 */
export const sudokuComponents = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

/** 座標のx成分・y成分 */
export type SudokuComponent = typeof sudokuComponents[number];

/** 座標 */
export type SudokuCoord = {
	x: SudokuComponent,
	y: SudokuComponent,
};

/** 数独の数値の値 */
export const sudokuDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/** 数独の数値 */
export type SudokuDigit = typeof sudokuDigits[number];

/** undefinedか数独の数値 */
export type SudokuUndefinedOrDigit = undefined | SudokuDigit;

/** 数独の初期値 */
export type SudokuDefault = SudokuCoord & {
	value: SudokuDigit,
};
