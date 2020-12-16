using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleWebApp {
	/// <summary>
	/// アイコン
	/// </summary>
	public enum Icon {
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
		public static IEnumerable<Icon> All = Enum.GetValues<Icon>().Cast<Icon>().Where(icon => icon != Icon.None);
	}
}
