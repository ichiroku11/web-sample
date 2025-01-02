document.addEventListener("DOMContentLoaded", _ => {
	// https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events
	const eventSource = new EventSource("/api/sampleeventstream");

	eventSource.onmessage = (event: MessageEvent) => {
		console.log(event.data);
	};
});
