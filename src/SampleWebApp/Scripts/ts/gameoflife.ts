import { CanvasView } from "./gameoflife/gameoflife-canvasview";
import { Model } from "./gameoflife/gameoflife-model";

document.addEventListener("DOMContentLoaded", _ => {
	const model = Model.random(40, 30);
	const view = new CanvasView(model);
	document.querySelector("#content")?.append(view.element);

	view.render();

	let intervalId: number | null = null;
	document.addEventListener("click", _ => {
		if (intervalId == null) {
			intervalId = window.setInterval(() => {
				model.next();
				view.render();
			}, 250);
		} else {
			window.clearInterval(intervalId);
			intervalId = null;
		}
	});

	// requestAnimationFrameよりアニメーションを遅くしたいので
	/*
	const update = () => {
		model.next();
		view.render();
		requestAnimationFrame(update);
	};

	requestAnimationFrame(update);
	*/
});
