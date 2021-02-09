import { Assert, Test } from "../unittestlib";

// async function
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function

// 非同期関数式
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/async_function

// AsyncFunction
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction

// await
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await


async function test1Async() {
	return 1;
}

export const asyncAwaitTest = new Test("AsyncAwaitTest")
	.fact("asyncawait_試す", async () => {
		// Arrange
		// Act
		const value = await new Promise<number>((resolve, _) => {
			setTimeout(() => resolve(1));
		});

		// Assert
		Assert.equal(1, value);
	})
	.fact("asyncawait_asyncな関数はPromiseをかえす", async () => {
		// Arrange
		// Act
		const promise = test1Async();
		const value = await promise;

		// Assert
		Assert.true(promise.then != undefined);
		Assert.equal(1, value);
	});

