using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass;

/// <summary>
/// 
/// </summary>
public class GridTutorialModel : PageModel {

	private static readonly Dictionary<string, string> _tasks = new(StringComparer.OrdinalIgnoreCase) {
		["1"] = "Pancake Stack",
		["2"] = "Simple 12 Columns Grid Layout",
		["3a"] = "Responsive Layout without grid-template-areas",
		["3b"] = "Responsive Layout with grid-template-areas",
		["4"] = "Responsive Layout Without Media Query",
		["5"] = "12 x 12 Chess Grid",
	};

	/// <summary>
	/// タスクの番号を取得
	/// </summary>
	/// <returns></returns>
	public static IEnumerable<string> GetTasks() => _tasks.Keys.OrderBy(key => key);

	/// <summary>
	/// タスクの説明を取得
	/// </summary>
	/// <param name="task"></param>
	/// <returns></returns>
	public static string GetTaskDescription(string task) => $"{task}. {_tasks[task]}";

	/// <summary>
	/// タスク
	/// </summary>
	[BindProperty(SupportsGet = true)]
	public string Task { get; set; } = GetTasks().First();

	/// <summary>
	/// タスクの説明
	/// </summary>
	public string TaskDescription => GetTaskDescription(Task);

	/// <summary>
	/// 
	/// </summary>
	/// <returns></returns>
	public IActionResult OnGet() {
		if (!_tasks.ContainsKey(Task)) {
			return NotFound();
		}

		return Page();
	}
}
