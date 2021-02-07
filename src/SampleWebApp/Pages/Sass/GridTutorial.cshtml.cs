using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass {
	/// <summary>
	/// 
	/// </summary>
	public class GridTutorialModel : PageModel {
		/// <summary>
		/// タスクの番号を取得
		/// </summary>
		/// <returns></returns>
		public static IEnumerable<int> GetTasks() => Enumerable.Range(1, 6);

		/// <summary>
		/// タスクの説明を取得
		/// </summary>
		/// <param name="task"></param>
		/// <returns></returns>
		public static string GetTaskDescription(int task) {
			var description = task switch {
				1 => "Pancake Stack",
				2 => "Simple 12 Columns Grid Layout",
				3 => "Responsive Layout without grid-template-areas",
				4 => "Responsive Layout with grid-template-areas",
				5 => "Responsive Layout Without Media Query",
				6 => "12 x 12 Chess Grid",
				_ => throw new InvalidOperationException(),
			};
			return $"{task}. {description}";
		}

		/// <summary>
		/// タスク
		/// </summary>
		[BindProperty(SupportsGet = true)]
		public int Task { get; set; } = 1;

		/// <summary>
		/// タスクの説明
		/// </summary>
		public string TaskDescription => GetTaskDescription(Task);

		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		public IActionResult OnGet() {
			if (!GetTasks().Contains(Task)) {
				return NotFound();
			}

			return Page();
		}
	}
}
