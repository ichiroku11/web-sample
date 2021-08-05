import { Assert, Test } from "../unittestlib";

// デフォルト引数
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Default_parameters

// シンプルなサンプル
function sample1(value = 0): number {
	return value;
}

export const functionDefaultParameterTest = new Test("FunctionDefaultParameterTest")
	.fact("関数のデフォルト引数を使ってみる", () => {
		// Arrange
		// Act
		const actual = sample1();

		// Assert
		Assert.equal(0, actual);
	});
