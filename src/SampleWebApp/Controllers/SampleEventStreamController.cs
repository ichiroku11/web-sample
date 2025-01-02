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
			// 最大5回（5sほど）のループ
			var index = 0;
			while (index < 5 && !requestAborted.IsCancellationRequested) {
				index++;

				var message = $"data:{index} {DateTime.Now}\n\n";

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
