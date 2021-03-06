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
	})
	.fact("optionalChaining_存在しないメソッド呼び出しでundefinedが返される", () => {
		// Arrange
		const obj: any = {
		};

		// Act
		// 存在しないメソッドを呼び出す
		const actual = obj.method?.();

		// Assert
		Assert.equal(undefined, actual);
	})
	.fact("optionalChaining_参照がnullの場合にundefinedが返される", () => {
		// Arrange
		const obj: any = null;

		// Act
		const actual = obj?.value;

		// Assert
		Assert.equal(undefined, actual);
	});
