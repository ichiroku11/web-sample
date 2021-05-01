/** 検証に失敗したときにスローされるエラー */
class AssertError extends Error {
}

/** 条件が満たされているかどうかを確認する静的メソッドを提供する */
export class Assert {
	private static arrayEqual<T>(expected: T[], actual: T[]): void {
		if (expected.length !== actual.length) {
			throw new AssertError();
		}

		const length = expected.length;
		for (let index = 0; index < length; index++) {
			Assert.equal(expected[index], actual[index]);
		}
	}

	/**
	 * 2つの値が等しいことを検証する
	 * @param expected
	 * @param actual
	 */
	public static equal<T>(expected: T, actual: T): void {
		if (Array.isArray(expected) && Array.isArray(actual)) {
			Assert.arrayEqual(expected as any[], actual as any[]);
			return;
		}

		if (expected !== actual) {
			throw new AssertError();
		}
	}

	/**
	 * 値がtureであることを検証する
	 * @param condition
	 */
	public static true(condition: boolean): void {
		if (!condition) {
			throw new AssertError();
		}
	}

	/**
	 * 値がfalseであることを検証する
	 * @param condition
	 */
	public static false(condition: boolean): void {
		if (condition) {
			throw new AssertError();
		}
	}

	/** 検証に失敗する */
	public static fail(): void {
		Assert.true(false);
	}

	/**
	 * 値がnullでないことを検証する
	 * @param value
	 */
	public static notNull<T>(value: T): void {
		if (value === null) {
			throw new AssertError();
		}
	}

	/**
	 * 値がnullであることを検証する
	 * @param value
	 */
	public static null<T>(value: T): void {
		if (value !== null) {
			throw new AssertError();
		}
	}
}
