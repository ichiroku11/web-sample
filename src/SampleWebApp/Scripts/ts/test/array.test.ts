import { Assert, Test } from "../unittestlib";

// Array
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array

// Array.fromを使ってEnumerable.Rangeのようなメソッドを作る
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const range = (start: number, count: number) => Array.from({ length: count }, (_, index) => start + index);

export const arrayTest = new Test("ArrayTest")
	.fact("concat_数値や数値の配列を結合できる", () => {
		// Arrange
		// Act
		const actual = [1].concat([2, 3], 4);

		// Assert
		Assert.equal([1, 2, 3, 4], actual);
	})
	.fact("filter_試す", () => {
		// Arrange
		// Act
		const actual = [1, 2, 3, 4].filter(item => item % 2 === 0);

		// Assert
		Assert.equal([2, 4], actual);
	})
	.fact("flat_試す", () => {
		// Arrange
		// Act
		const actual = [[1, 2], 3, [4]].flat();

		// Assert
		Assert.equal([1, 2, 3, 4], actual);
	})
	.fact("flatMap_2重ループを平坦化で表現する", () => {
		// Arrange
		const source1 = range(0, 3);
		const source2 = range(1, 2);

		// Act
		// 本当はこのテストをしたいけど、objectの比較をどうしてよいかわからず
		//const actual = source1.flatMap(x => source2.map(y => ({ x, y })));
		// 仮のテスト
		const actual = source1.flatMap(x => source2.map(y => x + y));

		// Assert
		const expected = [
			1, 2,
			2, 3,
			3, 4,
		];
		Assert.equal(expected, actual);
	})
	.fact("from_range関数を作る", () => {
		// Arrange
		// Act
		const actual = range(1, 3);

		// Assert
		Assert.equal([1, 2, 3], actual);
	})
	.fact("from_文字列から文字の配列を取得する", () => {
		// Arrange
		// Act
		const actual = Array.from("123");

		// Assert
		Assert.equal(["1", "2", "3"], actual);
	})
	.fact("from_文字列から文字の配列を取得して別の型に変換する", () => {
		// Arrange
		// Act
		const actual = Array.from("123", value => parseInt(value, 10));

		// Assert
		Assert.equal([1, 2, 3], actual);
	})
	.fact("from_Setから配列に変換する", () => {
		// Arrange
		const set = new Set([1, 2, 3]);

		// Act
		const actual = Array.from(set);

		// Assert
		Assert.equal([1, 2, 3], actual);
	})
	.fact("join_number型の配列からカンマ区切りで連結した文字列を取得する", () => {
		// Arrange
		const array = [1, 2, 3];

		// Act
		const actual = array.join();

		// Assert
		Assert.equal("1,2,3", actual);
	})
	.fact("join_number型の配列から空文字で連結した文字列を取得する", () => {
		// Arrange
		const array = [1, 2, 3];

		// Act
		const actual = array.join("");

		// Assert
		Assert.equal("123", actual);
	})
	.fact("map_試す", () => {
		// Arrange
		// Act
		const actual = [1, 2, 3].map(item => item + 1);

		// Assert
		Assert.equal([2, 3, 4], actual);
	})
	.fact("pop_配列の最後の要素を取り除く", () => {
		// Arrange
		const values = [1, 2, 3];

		// Act
		// 配列の最後の要素を取り除き、取得する
		const value = values.pop();

		// Assert
		Assert.equal(3, value);
		Assert.equal([1, 2], values);
	})
	.fact("push_配列の最後に要素を追加する", () => {
		// Arrange
		const values = [1, 2, 3];

		// Act
		// 配列の最後に要素を追加する
		// 戻り値は配列の長さ
		const length = values.push(4);

		// Assert
		Assert.equal(4, length);
		Assert.equal([1, 2, 3, 4], values);
	})
	.fact("push_配列の最後に要素を複数追加する", () => {
		// Arrange
		const values = [1, 2, 3];

		// Act
		// 要素を複数追加できる
		const length = values.push(4, 5);

		// Assert
		Assert.equal(5, length);
		Assert.equal([1, 2, 3, 4, 5], values);
	})
	.fact("reduce_試す", () => {
		// Arrange
		// Act
		const actual = [1, 2, 3].reduce((previousValue, currentValue) => previousValue + currentValue);

		// Assert
		Assert.equal(6, actual);
	})
	.fact("unshift_配列の先頭に要素を追加する", () => {
		// Arrange
		const values = [1, 2, 3];

		// Act
		// 配列の先頭に要素を追加する
		// 戻り値は配列の長さ
		const length = values.unshift(0);

		// Assert
		Assert.equal(4, length);
		Assert.equal([0, 1, 2, 3], values);
	})
	.fact("unshift_配列の先頭に要素を追加する", () => {
		// Arrange
		const values = [1, 2, 3];

		// Act
		// 要素を複数追加する
		// 配列の先頭に引数で渡された順の塊が挿入される
		const length = values.unshift(-1, 0);

		// Assert
		Assert.equal(5, length);
		Assert.equal([-1, 0, 1, 2, 3], values);
	});
