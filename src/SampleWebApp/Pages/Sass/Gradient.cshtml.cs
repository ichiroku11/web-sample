using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Sass;

public enum GradientType {
	// 不明
	Unknown = 0,
	// linear-gradient
	Linear = 1,
}

public class GradientModel : PageModel {
	// 文字列をenumにバインドできる様子
	[FromRoute(Name = "type")]
	public GradientType GradientType { get; set; }

	public void OnGet() {
	}
}
