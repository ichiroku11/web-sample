
class AssertError extends Error {
}

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

	public static equal<T>(expected: T, actual: T): void {
		if (Array.isArray(expected) && Array.isArray(actual)) {
			Assert.arrayEqual(expected as any[], actual as any[]);
			return;
		}

		if (expected !== actual) {
			throw new AssertError();
		}
	}

	public static true(condition: boolean): void {
		if (!condition) {
			throw new AssertError();
		}
	}

	public static false(condition: boolean): void {
		if (condition) {
			throw new AssertError();
		}
	}

	public static fail(): void {
		Assert.true(false);
	}

	public static notNull<T>(value: T): void {
		if (value === null) {
			throw new AssertError();
		}
	}

	public static null<T>(value: T): void {
		if (value !== null) {
			throw new AssertError();
		}
	}
}
