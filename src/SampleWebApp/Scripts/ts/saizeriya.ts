import { SaizeriyaMenuItems, SaizeriyaMaxCalorieResolver } from "./saizeriya/saizeriya-resolver";

document.addEventListener("DOMContentLoaded", _ => {
	const resolver = new SaizeriyaMaxCalorieResolver(
		SaizeriyaMenuItems,
		message => console.log(message));

	const calorie = resolver.calc(1000);
	console.log(calorie);
});

