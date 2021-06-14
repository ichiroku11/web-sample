

type SaizeriyaMenuCategory = "ライス&パン" | "ピザ" | "パスタ" | "ドリア" | "ドリア&グラタン";

type SaizeriyaMenuItem = {
	name: string;
	code: string;
	category: SaizeriyaMenuCategory;
	price: number;
	calorie: number;
}

// 価格あたりのカロリーが高いメニュー
const menuItems: SaizeriyaMenuItem[] = [
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

export class SaizeriyaResolver {
	resolve(): void {
		// todo:
	}
}
