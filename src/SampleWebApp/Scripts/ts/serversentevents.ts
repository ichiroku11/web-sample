document.addEventListener("DOMContentLoaded", _ => {
	// https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events
	const startButton = document.querySelector<HTMLButtonElement>("#sse-button-start");
	const cancelButton = document.querySelector<HTMLButtonElement>("#sse-button-cancel");
	const progress = document.querySelector<HTMLProgressElement>("#sse-progress");
	if (startButton === null || cancelButton === null || progress === null) {
		return;
	}

	var eventSource: EventSource | null = null;

	startButton.addEventListener("click", _ => {
		console.log("started");

		if (eventSource !== null) {
			return;
		}

		startButton.disabled = true;
		cancelButton.disabled = false;
		progress.value = 0;

		eventSource = new EventSource("/api/sampleeventstream");

		eventSource.onmessage = (event: MessageEvent<string>) => {
			console.dir({
				type: event.type,
				data: event.data,
			});

			if (event.type === "message") {
				console.log(`progress ${event.data}`);
				var value = parseInt(event.data, 10);
				progress.value = value;
			}
		};
	});

	cancelButton.addEventListener("click", _ => {
		console.log("canceled");

		if (eventSource === null) {
			return;
		}

		startButton.disabled = false;
		cancelButton.disabled = true;

		eventSource.close();
		eventSource = null;
	});
});
