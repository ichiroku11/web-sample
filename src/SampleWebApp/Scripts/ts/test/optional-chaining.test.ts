import { Assert, Test } from "../unittestlib";

// Optional chaining(?.)
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining

export const optionalChainingTest = new Test("OptionalChainingTest")
	.fact("optionalChaining_存在しないプロパティへのアクセスでundefinedが返される", () => {
		// Arrange
		const obj: any = {
		};

		// Act
		const actual = obj.property?.name;

		// Assert
		Assert.equal(undefined, actual);
	});
