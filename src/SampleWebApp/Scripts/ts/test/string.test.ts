import { Assert, Test } from "../unittestlib";

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

export const stringTest = new Test("StringTest")
	.fact("padStart_空白で左埋め", () => {
		// Arrange
		// Act
		const actual = "1".padStart(5);

		// Assert
		Assert.equal("    1", actual);
	})
	.fact("padStart_指定した文字で左埋め", () => {
		// Arrange
		// Act
		const actual = "1".padStart(5, "0");

		// Assert
		Assert.equal("00001", actual);
	});
