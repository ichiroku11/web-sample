using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass;

public class GridLayoutModel : PageModel {
	[BindProperty(SupportsGet = true)]
	public int Pattern { get; set; } = 1;

	public void OnGet() {
	}
}
