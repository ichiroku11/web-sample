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
	.fact("entries_分割代入と一緒に使ってみる", () => {
		// Arrange
		const obj = {
			a: 1,
			b: "2"
		};

		// Act
		const actual: string[] = [];
		for (const [key, value] of Object.entries(obj)) {
			actual.push(`${key}:${value}`);
		}

		// Assert
		Assert.equal(["a:1", "b:2"], actual);
	})
	.fact("fromEntries_key/valueのコレクションからオブジェクトを生成する", () => {
		// Arrange
		// Act
		const obj = Object.fromEntries<string | number>([["a", 1], ["b", "2"]]);

		// Assert
		Assert.equal(1, obj["a"]);
		Assert.equal("2", obj["b"]);
	})
	.fact("fromEntries_Mapからオブジェクトを生成する", () => {
		// Arrange
		const map = new Map<string, string | number>([["a", 1], ["b", "2"]]);

		// Act
		const obj = Object.fromEntries<string | number>(map);

		// Assert
		Assert.equal(1, obj["a"]);
		Assert.equal("2", obj["b"]);
	})
	.fact("keys_", () => {
		// todo:
		Assert.fail();
	})
	.fact("values_", () => {
		// todo:
		Assert.fail();
	});
