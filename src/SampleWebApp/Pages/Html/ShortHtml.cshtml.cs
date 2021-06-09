using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SampleWebApp.Pages.Html {
	public enum ShortHtmlTip {
		ImageLoadingLazy,
		OlStart,
		Meter,
		DataList,
		InputRange,
		Mark,
		AnchorDownload,
		InputSearch,
	}

	public static class ShortHtmlTipExtensions {
		public static string GetDisplayName(this ShortHtmlTip tip) {
			return tip switch {
				ShortHtmlTip.ImageLoadingLazy => @"img loading=""lazy""",
				ShortHtmlTip.OlStart => "ol start",
				ShortHtmlTip.Meter => "meter",
				ShortHtmlTip.DataList => "datalist",
				ShortHtmlTip.InputRange => @"input type=""range""",
				ShortHtmlTip.Mark => "mark",
				ShortHtmlTip.AnchorDownload => "a download",
				ShortHtmlTip.InputSearch => @"input type=""search""",
				_ => throw new ArgumentOutOfRangeException(nameof(tip)),
			};
		}
	}

	public class ShortHtmlModel : PageModel {
		[BindProperty(SupportsGet = true)]
		public ShortHtmlTip Tip { get; set; }

		public void OnGet() {
		}
	}
}
