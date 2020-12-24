using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass {
	public class GridTutorialModel : PageModel {
		[BindProperty(SupportsGet = true)]
		public int Task { get; set; } = 1;

		public string TaskDescription
			=> Task switch {
				1 => "Pancake Stack",
				2 => "Simple 12 Columns Grid Layout",
				3 => "Responsive Layout without and with grid-template-areas",
				4 => "Responsive Layout Without Media Query",
				5 => "12 x 12 Chess Grid",
				_ => throw new InvalidOperationException(),
			};

		public void OnGet() {
		}
	}
}
