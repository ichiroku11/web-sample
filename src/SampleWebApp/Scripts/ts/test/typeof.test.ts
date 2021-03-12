import { Assert, Test } from "../unittestlib";

// typeof
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof

export const typeofTest = new Test("TypeOfTest")
	.fact("typeof_オペランドの型を表す文字列を取得できる", () => {
		// Arrange
		// Act
		// Assert

		// boolean
		Assert.equal("boolean", typeof false);
		Assert.equal("boolean", typeof true);

		// number
		Assert.equal("number", typeof 0);
		Assert.equal("number", typeof 1);
		Assert.equal("number", typeof 1.0);
		Assert.equal("number", typeof NaN);
		Assert.equal("number", typeof Infinity);

		// todo:
	});

