import { Assert, Test } from "../unittestlib";

export const stringTest = new Test("StringTest")
	// padEnd
	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
	.fact("padEnd_指定した文字で右埋め", () => {
		// Arrange
		// Act
		const actual = "1".padEnd(5, "0");

		// Assert
		Assert.equal("10000", actual);
	})
	// padStart
	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
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
