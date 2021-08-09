import { Assert, Test } from "../unittestlib";

// デフォルト引数
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Default_parameters

export const functionDefaultParameterTest = new Test("FunctionDefaultParameterTest");

// デフォルト引数のシンプルなサンプル
function sample1(value = 0): number {
	return value;
}

functionDefaultParameterTest
	.fact("デフォルト引数を使ってみる", () => {
		// Arrange
		// Act
		const actual = sample1();

		// Assert
		Assert.equal(0, actual);
	});


// オブジェクト型のデフォルト引数
type Sample2ParamResult = {
	x: number,
	y?: number,
};

function sample2(param: Sample2ParamResult = { x: 1, y: 1 }): Sample2ParamResult {
	return param;
}

functionDefaultParameterTest
	.fact("オブジェクト型のデフォルト引数を省略する", () => {
		// Arrange
		// Act
		// 引数のオブジェクト自体を省略できる
		const actual = sample2();

		// Assert
		Assert.equal(1, actual.x);
		Assert.equal(1, actual.y);
	})
	.fact("オブジェクト型のデフォルト引数の一部のプロパティを省略する", () => {
		// Arrange
		// Act
		const actual = sample2({ x: 2 });

		// xは省略できないためコンパイルエラー
		//const actual = sample2({});

		// Assert
		Assert.equal(2, actual.x);
		Assert.equal(undefined, actual.y);
	});


// 分割代入を使った関数の引数
// https://ja.javascript.info/destructuring-assignment
type Sample3ParamResult = {
	x?: number,
	y?: number,
};

function sample3({ x = 1, y = 1 }: Sample3ParamResult): Sample3ParamResult {
	return { x, y };
}

type Sample4ParamResult = Sample3ParamResult;

function sample4({ x = 1, y = 1 }: Sample4ParamResult = { x: 2, y: 2 }): Sample4ParamResult {
	return { x, y };
}

functionDefaultParameterTest
	.fact("分割代入を使ってオブジェクト型の引数の一部のプロパティを省略する", () => {
		// Arrange
		// Act
		const actual = sample3({ y: 2 });

		// オブジェクト引数自体を省略できないのでコンパイルエラー
		//const actual = sample3();

		// Assert
		Assert.equal(1, actual.x);
		Assert.equal(2, actual.y);
	})
	.fact("オブジェクト型の引数の一部のプロパティと引数自体の省略に対応した関数を試す", () => {
		// Arrange
		// Act
		const actual = sample4();

		// Assert
		Assert.equal(2, actual.x);
		Assert.equal(2, actual.y);
	});
