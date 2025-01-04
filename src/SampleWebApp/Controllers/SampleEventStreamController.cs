using Microsoft.AspNetCore.Mvc;

namespace SampleWebApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SampleEventStreamController(ILogger<SampleEventStreamController> logger) : ControllerBase {
	private readonly ILogger _logger = logger;

	public async Task<IActionResult> GetAsync(CancellationToken requestAborted) {
		// https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events
		Response.ContentType = "text/event-stream";
		Response.Headers.CacheControl = "no-cache";
		Response.StatusCode = 200;

		try {
			var progress = 0;
			while (progress < 100 && !requestAborted.IsCancellationRequested) {
				progress += Random.Shared.Next(10, 30);
				if (progress > 100) {
					progress = 100;
				}

				var message = $"data: {progress}\n\n";

				await Response.WriteAsync(message, requestAborted);
				await Response.Body.FlushAsync(requestAborted);

				await Task.Delay(1000, requestAborted);
			}
		} catch (TaskCanceledException exception) {
			_logger.LogInformation(exception, "Request was canceled.");
		}

		return Empty;
	}
}
