using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApp {
	/// <summary>
	/// SVG
	/// </summary>
	public enum Svg {
		None = 0,

		Archive,

		AwardFill,

		Cart,

		ChatLeft,

		ChevronLeft,

		// </>
		CodeSlash,

		// 水滴、インク
		DropletFill,

		GearFill,

		HandThumbsUp,

		HouseDoorFill,

		PersonCircle,

		Star,

		// ★
		StarFill,

		Sliders,

		Tag,

		TagsFill,

		ThreeDots,

		Trash,

		TrophyFill,

		// トラック
		Truck,

		Upload,
	}

	/// <summary>
	/// 
	/// </summary>
	public static class IconHelper {
		/// <summary>
		/// 
		/// </summary>
		public static IEnumerable<Svg> All = Enum.GetValues<Svg>().Cast<Svg>().Where(svg => svg != Svg.None);
	}
}
