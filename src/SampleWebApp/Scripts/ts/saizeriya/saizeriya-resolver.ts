// Software Design 2021.04 p.134～より
// 「サイゼリアで1,000円以内で最高何kcal摂れるか」
// サイゼリアのメニューの個数をNとし、1,000円で摂れる最高カロリーを求めるには、
// 最後のメニューを注文する場合、最後のメニューを注文しない場合、2つの部分問題に分解できる
// 最後のメニューを注文する場合：残りのN-1個のメニューから、1000-price[N-1]円で摂れる最高カロリーを求める
// 最後のメニューを注文しない場合：残りのN-1個のメニューから、1000円で摂れる最高カロリーを求める
// 2つの場合に得られるカロリーのうち、大きい方が最終的な最大カロリーになる


type SaizeriyaMenuCategory = "ライス&パン" | "ピザ" | "パスタ" | "ドリア" | "ドリア&グラタン";

export type SaizeriyaMenuItem = {
	name: string;
	code: string;
	category: SaizeriyaMenuCategory;
	price: number;
	calorie: number;
}

// 価格あたりのカロリーが高いメニュー
export const SaizeriyaMenuItems: Readonly<SaizeriyaMenuItem>[] = [
	{ name: "ライス", code: "RP01", category: "ライス&パン", price: 150, calorie: 303 },
	{ name: "ラージライス", code: "RP02", category: "ライス&パン", price: 200, calorie: 454 },
	{ name: "スモールライス", code: "RP03", category: "ライス&パン", price: 100, calorie: 151 },
	{ name: "パンチェッタのピザ", code: "PZ03", category: "ピザ", price: 400, calorie: 646 },
	{ name: "たっぷりコーンのピザ", code: "PZ06", category: "ピザ", price: 400, calorie: 669 },
	{ name: "ソーセージピザ", code: "PZ08", category: "ピザ", price: 400, calorie: 759 },
	{ name: "ペペロンチーノ", code: "PA03", category: "パスタ", price: 300, calorie: 497 },
	{ name: "パルマ風スパゲッティ", code: "PA04", category: "パスタ", price: 400, calorie: 716 },
	{ name: "アラビアータ", code: "PA09", category: "パスタ", price: 400, calorie: 601 },
	{ name: "キャベツのペペロンチーノ", code: "PA13", category: "パスタ", price: 400, calorie: 663 },
	{ name: "ミラノ風ドリア", code: "DG01", category: "ドリア", price: 300, calorie: 521 },
	{ name: "チーズたっぷりミラノ風ドリア", code: "DG02", category: "ドリア&グラタン", price: 400, calorie: 722 },
	{ name: "半熟卵のミラノ風ドリア", code: "DG03", category: "ドリア&グラタン", price: 350, calorie: 611 },
	{ name: "セットプチフォッカ付きミラノ風ドリア", code: "DG05", category: "ドリア&グラタン", price: 400, calorie: 628 },
];

export type SaizeriyaLogger = (message: string) => void;

// todo: 貪欲法による問題解決

/**
 * 予算で摂取できる最大カロリーを計算する（動的計画法による問題解決）
 */
export class SaizeriyaMaxCalorieResolver {
	// メニューの個数・予算をキーとした最大カロリーのキャッシュ（calcCoreの呼び出し結果のキャッシュ）
	private readonly _cache = new Map<string, number>();

	private readonly _menuItems: Readonly<SaizeriyaMenuItem>[];
	private readonly _logger: SaizeriyaLogger;

	constructor(menuItems: Readonly<SaizeriyaMenuItem>[], logger: SaizeriyaLogger = () => { }) {
		this._menuItems = menuItems;
		this._logger = logger;
	}

	/**
	 * 
	 * @param count 考慮するメニューの個数
	 * @param budget 予算（指定した予算以内であることを表す）
	 * @returns 最高カロリー
	 */
	private calcCore(count: number, budget: number): number {
		this._logger(`calcCore: ${count}, ${budget}`);

		// 終端条件
		if (count === 0) {
			return 0;
		}

		// まずキャッシュを確認
		const key = `${count}-${budget}`;
		if (this._cache.has(key)) {
			return this._cache.get(key) as number;
		}

		// count-1番目を選ばないとき
		let result = this.calcCore(count - 1, budget);

		// count-1番目を選ぶとき
		if (budget >= this._menuItems[count - 1].price) {
			result = Math.max(
				result,
				this.calcCore(count - 1, budget - this._menuItems[count - 1].price)
					+ this._menuItems[count - 1].calorie);
		}

		// キャッシュ
		this._cache.set(key, result);

		return result;
	}

	/**
	 * メニューを復元する
	 * @param budget
	 */
	private reconstruct(budget: number): Readonly<SaizeriyaMenuItem>[] {
		const selectedItems: Readonly<SaizeriyaMenuItem>[] = [];

		// N個のメニューで1,000円のカロリー == N-1個のメニューで1000-price[N-1]円のカロリー + calorie[N-1]
		// であれば最後の品物を選ぶものと判断できる
		// （らしいがよくわからず）
		for (let index = this._menuItems.length; index >= 1; index--) {
			const key1 = `${index}-${budget - this._menuItems[index - 1].price}`;
			const key2 = `${index}-${budget}`;
			if (budget >= this._menuItems[index - 1].price &&
				this._cache.get(key1)! + this._menuItems[index - 1].calorie === this._cache.get(key2)!) {

				budget -= this._menuItems[index - 1].price;

				selectedItems.push(this._menuItems[index - 1]);
			}
		}

		return selectedItems.reverse();
	}

	/**
	 * 予算で摂取できる最大カロリーを計算し、そのメニュー一覧を取得する
	 * @param budget 予算
	 * @returns 最大カロリーを摂取できるメニュー一覧
	 */
	public calc(budget: number): Readonly<SaizeriyaMenuItem>[] {
		// キャッシュをクリア
		this._cache.clear();

		const calorie = this.calcCore(this._menuItems.length, budget);
		this._logger(new Intl.NumberFormat().format(calorie));

		return this.reconstruct(budget)
	}
}
