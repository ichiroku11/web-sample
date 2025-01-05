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

				// "event:"を指定しない場合、"message"イベントが発生する
				// "event:"を指定すると指定したイベントが発生する
				// 例："event: prgress\n" => "progress"イベント
				//await Response.WriteAsync($"event: progress\n", requestAborted);
				await Response.WriteAsync($"data: {progress}\n\n", requestAborted);
				await Response.Body.FlushAsync(requestAborted);

				if(progress == 100) {
					break;
				}
				await Task.Delay(1000, requestAborted);
			}
		} catch (TaskCanceledException exception) {
			_logger.LogInformation(exception, "Request was canceled.");
			// todo:
		}

		return Empty;
	}
}
