/** 結果UIのヘルパー */
class ResultHelper {
	// モジュールをdetails、summaryを使って表す
	private readonly _details: HTMLDetailsElement;
	// テストケースを格納するul
	private readonly _ul: HTMLElement;

	constructor(moduleName: string, selector = ".test-container") {
		const container = document.querySelector(selector);
		if (!container) {
			throw new Error("container is null");
		}

		const details = document.createElement("details");

		const summary = document.createElement("summary");
		summary.innerText = moduleName;
		details.appendChild(summary);

		const ul = document.createElement("ul");
		details.appendChild(ul);

		container.appendChild(details);

		this._details = details;
		this._ul = ul;
	}

	public add(description: string, failed: boolean) {
		const result = document.createElement("li");
		result.classList.add(failed ? "test-failed" : "test-done");
		result.innerHTML = description;
		this._ul.appendChild(result);

		if (failed) {
			this._details.setAttribute("open", "");
			this._details.classList.remove("test-done");
			this._details.classList.add("test-failed");
		} else {
			if (!this._details.classList.contains("test-failed")) {
				this._details.classList.add("test-done");
			}
		}
	}
}

/** テスト関数 */
type TestFunc = () => void | Promise<void>;

/** テストケース（テスト名とテスト関数のペア） */
type TestCase = {
	testName: string;
	testFunc: TestFunc;
};

/** テストランナー */
export class Test {
	private readonly _moduleName: string;
	private readonly _testCases: TestCase[] = [];

	/**
	 * 
	 * @param moduleName テストモジュール名
	 */
	constructor(moduleName: string) {
		this._moduleName = moduleName;
	}

	/**
	 * テストを登録する
	 * @param testName テスト名
	 * @param testFunc テスト関数
	 */
	public fact(testName: string, testFunc: TestFunc): this {
		this._testCases.push({ testName, testFunc });
		return this;
	}

	/**
	 * 引数があるテストを登録する
	 * @param testName
	 * @param testArgs
	 * @param testFunc
	 */
	public theory<TValue extends readonly any[]>(
		testName: string,
		testArgs: () => [...TValue][],
		testFunc: (...arg: readonly [...TValue]) => void): this {

		const args = testArgs();

		for (const arg of args) {
			this._testCases.push({
				testName: `${testName}(${JSON.stringify(arg)})`,
				testFunc: () => testFunc(...arg)
			});
		}

		return this;
	}

	/** すべてのテストを実行する */
	public async run(): Promise<void> {
		const resultHelper = new ResultHelper(this._moduleName);

		for (const { testName, testFunc } of this._testCases) {
			let failed = false;
			try {
				const result = testFunc();
				if (result instanceof Promise) {
					await result;
				}
			} catch (ex) {
				failed = true;
			} finally {
				resultHelper.add(`${testName}`, failed);
			}
		}
	}
}
