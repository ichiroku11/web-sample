import {
	SaizeriyaMenuItem,
	SaizeriyaMenuItems,
	SaizeriyaMaxCalorieResolver
} from "./saizeriya/saizeriya-resolver";

// メニュー一覧の要素を生成する
function createMenu(menuItems: Readonly<SaizeriyaMenuItem>[]): HTMLElement {
	const template = document.querySelector(".sz-template-container table");
	if (!template) {
		throw "\".sz-template-container table\" not found";
	}

	const table = template.cloneNode(true) as HTMLElement;
	const tbody = table.querySelector("tbody");

	menuItems.forEach(menuItem => {
		const tr = document.createElement("tr");
		tr.insertCell().innerText = menuItem.name;
		tr.insertCell().innerText = menuItem.code;
		tr.insertCell().innerText = menuItem.category;
		tr.insertCell().innerText = new Intl.NumberFormat().format(menuItem.price);
		tr.insertCell().innerText = new Intl.NumberFormat().format(menuItem.calorie);
		tr.insertCell().innerText = (menuItem.calorie / menuItem.price).toFixed(2).toString();

		tbody?.appendChild(tr);
	});

	return table;
}

document.addEventListener("DOMContentLoaded", _ => {
	const menu = document.querySelector(".sz-menu");
	if (!menu) {
		throw "\".sz-menu\" not found";
	}
	menu.appendChild(createMenu(SaizeriyaMenuItems));

	const result = {
		calorie: document.querySelector(".sz-result-calorie") as HTMLElement,
		menu: document.querySelector(".sz-result-menu") as HTMLElement,
	};

	document.querySelector(".sz-button-calc")?.addEventListener("click", _ => {
		result.calorie.innerHTML = "";
		result.menu.innerHTML = "";

		const resolver = new SaizeriyaMaxCalorieResolver(
			SaizeriyaMenuItems,
			message => console.log(message));

		const start = performance.now();
		const calorie = resolver.calc(1000);
		const end = performance.now();
		console.log(end - start);

		result.calorie.innerText = new Intl.NumberFormat().format(calorie);
	});
});

