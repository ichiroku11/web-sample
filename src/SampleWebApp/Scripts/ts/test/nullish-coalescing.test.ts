import { Assert, Test } from "../unittestlib";

// Null合体演算子(??) 
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

export const nullishCoalescingTest = new Test("NullishCoalescingTest")
	.fact("nullishCoalescing_左辺がnullの場合は右辺の値が返る", () => {
		const value = null ?? 1;

		Assert.equal(1, value);
	})
	.fact("nullishCoalescing_左辺がundefinedの場合は右辺の値が返る", () => {
		const value = undefined ?? 1;

		Assert.equal(1, value);
	});
