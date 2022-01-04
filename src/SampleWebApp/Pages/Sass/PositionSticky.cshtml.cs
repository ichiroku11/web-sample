using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass;

public class PositionStickyModel : PageModel {
	[BindProperty(SupportsGet = true)]
	public int Pattern { get; set; } = 1;

	public IActionResult OnGet() {
		if (Pattern is not (1 or 2)) {
			return NotFound();
		}

		return Page();
	}
}
