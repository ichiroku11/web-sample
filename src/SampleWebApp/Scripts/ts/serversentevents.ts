document.addEventListener("DOMContentLoaded", _ => {
	// https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events

	const buttons = {
		start: document.querySelector<HTMLButtonElement>("#sse-button-start"),
		cancel: document.querySelector<HTMLButtonElement>("#sse-button-cancel"),
	};
	if (buttons.start === null) {
		return;
	}
	if (buttons.cancel === null) {
		return;
	}

	// todo:
	/*
	const progress = document.querySelector<HTMLProgressElement>("#sse-progress");
	if (progress === null) {
		return;
	}
	*/

	var eventSource: EventSource | null = null;

	buttons.start.addEventListener("click", _ => {
		if (eventSource !== null) {
			return;
		}

		eventSource = new EventSource("/api/sampleeventstream");

		eventSource.onmessage = (event: MessageEvent<string>) => {
			console.dir({
				type: event.type,
				data: event.data,
			});
			//console.log(event.data);
		};
	});

	buttons.cancel.addEventListener("click", _ => {
		if (eventSource === null) {
			return;
		}

		eventSource.close();
		eventSource = null;
	});
});
