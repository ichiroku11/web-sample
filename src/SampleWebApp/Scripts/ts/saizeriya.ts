import { SaizeriyaResolver } from "./saizeriya/saizeriya-resolver";

document.addEventListener("DOMContentLoaded", _ => {
	const resolver = new SaizeriyaResolver();

	resolver.resolve();
});

