import { Assert, Test } from "../unittestlib";

// Object
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object

export const objectTest = new Test("ObjectTest")
	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
	.fact("entries_オブジェクトの列挙可能なプロパティの組の配列を返す", () => {
		// Arrange
		const obj = {
			a: 1,
			b: "2"
		};

		// Act
		const actual = Object.entries(obj);

		// Assert
		Assert.equal([["a", 1], ["b", "2"]], actual);
	})
	.fact("keys_", () => {
		// todo:
		Assert.fail();
	})
	.fact("values_", () => {
		// todo:
		Assert.fail();
	});
