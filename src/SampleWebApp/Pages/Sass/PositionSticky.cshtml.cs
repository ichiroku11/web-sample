using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass {
	public class PositionStickyModel : PageModel {
		[BindProperty(SupportsGet = true)]
		public int Pattern { get; set; } = 1;

		public void OnGet() {
		}
	}
}
