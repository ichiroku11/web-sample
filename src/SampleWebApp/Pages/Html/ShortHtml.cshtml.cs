using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Html {
	public enum ShortHtmlTip {
		// todo: URLを文字列にしたいが・・・
		OlStart = 1,
	}

	public class ShortHtmlModel : PageModel {
		[BindProperty(SupportsGet = true)]
		public ShortHtmlTip Tip { get; set; }

		public void OnGet() {
		}
	}
}
