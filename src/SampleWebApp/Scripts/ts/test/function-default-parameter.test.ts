import { Assert, Test } from "../unittestlib";

// デフォルト引数
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Default_parameters

// シンプルなサンプル
function sample1(value = 0): number {
	return value;
}

// オブジェクト型のデフォルト引数
type Sample2ParamResult = {
	x: number,
	y?: number,
};

function sample2(param: Sample2ParamResult = { x: 1, y: 1 }): Sample2ParamResult {
	return param;
}

export const functionDefaultParameterTest = new Test("FunctionDefaultParameterTest")
	.fact("関数のデフォルト引数を使ってみる", () => {
		// Arrange
		// Act
		const actual = sample1();

		// Assert
		Assert.equal(0, actual);
	})
	.fact("関数のオブジェクト型デフォルト引数を省略する", () => {
		// Arrange
		// Act
		// 引数のオブジェクト自体を省略できる
		const actual = sample2();

		// Assert
		Assert.equal(1, actual.x);
		Assert.equal(1, actual.y);
	})
	.fact("関数のオブジェクト型デフォルト引数の一部のプロパティを省略することはできない", () => {
		// Arrange
		// Act
		const actual = sample2({ x: 2 });

		// xは省略できないためコンパイルエラー
		//const actual = sample2({});

		// Assert
		Assert.equal(2, actual.x);
		Assert.equal(undefined, actual.y);
	})
	.fact("関数のオブジェクト型デフォルト引数を省略する", () => {
		// Arrange
		// Act
		// 引数のオブジェクト自体を省略できる
		const actual = sample2();

		// Assert
		Assert.equal(1, actual.x);
		Assert.equal(1, actual.y);
	})
	.fact("関数のオブジェクト型デフォルト引数の一部のプロパティを省略することはできない", () => {
		// Arrange
		// Act
		const actual = sample2({ x: 2 });

		// xは省略できないためコンパイルエラー
		//const actual = sample2({});

		// Assert
		Assert.equal(2, actual.x);
		Assert.equal(undefined, actual.y);
	});
