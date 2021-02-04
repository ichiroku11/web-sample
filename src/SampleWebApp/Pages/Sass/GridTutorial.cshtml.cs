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
		/// タスクの説明
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
			if (Task is < 1 or > 5) {
				return NotFound();
			}

			return Page();
		}
	}
}
