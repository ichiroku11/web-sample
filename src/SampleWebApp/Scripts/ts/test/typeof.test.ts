import { Assert, Test } from "../unittestlib";

// typeof
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/typeof

export const typeofTest = new Test("TypeOfTest")
	// typeof演算子でオペランドの型を表す文字列を取得できる
	.fact("typeof_boolean", () => {
		Assert.equal("boolean", typeof false);
		Assert.equal("boolean", typeof true);
	})
	.fact("typeof_function", () => {
		Assert.equal("function", typeof function () { });

		// アロー関数も"function"
		Assert.equal("function", typeof (() => { }));

		// クラスの定義も"function"
		Assert.equal("function", typeof (class Test { }));
	})
	.fact("typeof_number", () => {
		Assert.equal("number", typeof 0);
		Assert.equal("number", typeof 1);
		Assert.equal("number", typeof 1.0);
		Assert.equal("number", typeof NaN);
		Assert.equal("number", typeof Infinity);
	})
	.fact("typeof_object", () => {
		Assert.equal("object", typeof {});
		Assert.equal("object", typeof new Date());

		// 配列も"object"
		Assert.equal("object", typeof []);

		// nullもなぜか"object"
		// undefinedは"undefined"なのに
		Assert.equal("object", typeof null);
	})
	.fact("typeof_undefined", () => {
		Assert.equal("undefined", typeof undefined);
	});

	// todo:
	// "bigint"
	// "symbol"
