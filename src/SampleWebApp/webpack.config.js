/// <binding ProjectOpened='Watch - Development' />
"use strict";

const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

// Sass
const scssConfig = {
	entry: {
		icon: path.resolve(__dirname, "styles/icon.scss"),
		index: path.resolve(__dirname, "styles/index.scss"),
		lib: path.resolve(__dirname, "styles/lib.scss"),
		"html/detailssummary": path.resolve(__dirname, "styles/html/detailssummary.scss"),
		"html/shorthtml": path.resolve(__dirname, "styles/html/shorthtml.scss"),
		"sass/animation": path.resolve(__dirname, "styles/sass/animation.scss"),
		"sass/boxsizing": path.resolve(__dirname, "styles/sass/boxsizing.scss"),
		"sass/centering": path.resolve(__dirname, "styles/sass/centering.scss"),
		"sass/flexbox": path.resolve(__dirname, "styles/sass/flexbox.scss"),
		"sass/flexboxcomponent": path.resolve(__dirname, "styles/sass/flexboxcomponent.scss"),
		"sass/flexboxgridwrapper": path.resolve(__dirname, "styles/sass/flexboxgridwrapper.scss"),
		"sass/flexboxsample": path.resolve(__dirname, "styles/sass/flexboxsample.scss"),
		"sass/focuswithin": path.resolve(__dirname, "styles/sass/focuswithin.scss"),
		"sass/grid": path.resolve(__dirname, "styles/sass/grid.scss"),
		"sass/gridfullbleed": path.resolve(__dirname, "styles/sass/gridfullbleed.scss"),
		"sass/gridlayout": path.resolve(__dirname, "styles/sass/gridlayout.scss"),
		"sass/gridrepeat": path.resolve(__dirname, "styles/sass/gridrepeat.scss"),
		"sass/gridtutorial": path.resolve(__dirname, "styles/sass/gridtutorial.scss"),
		"sass/media": path.resolve(__dirname, "styles/sass/media.scss"),
		"sass/onelinelayout": path.resolve(__dirname, "styles/sass/onelinelayout.scss"),
		"sass/positionsticky": path.resolve(__dirname, "styles/sass/positionsticky.scss"),
		"sass/transform": path.resolve(__dirname, "styles/sass/transform.scss"),
		"sass/transition": path.resolve(__dirname, "styles/sass/transition.scss"),
		"ts/eightpuzzle": path.resolve(__dirname, "styles/ts/eightpuzzle.scss"),
		"ts/imagedataurl": path.resolve(__dirname, "styles/ts/imagedataurl.scss"),
		"ts/intersectionobserver": path.resolve(__dirname, "styles/ts/intersectionobserver.scss"),
		"ts/sudoku": path.resolve(__dirname, "styles/ts/sudoku.scss"),
		"ts/test": path.resolve(__dirname, "styles/ts/test.scss")
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "wwwroot/css")
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	]
};

// TypeScript
const tsConfig = {
	// https://webpack.js.org/guides/typescript/#source-maps
	devtool: "inline-source-map",
	entry: {
		lib: path.resolve(__dirname, "scripts/lib.ts"),
		index: {
			import: path.resolve(__dirname, "scripts/index.ts"),
			// https://webpack.js.org/guides/code-splitting/#prevent-duplication
			dependOn: "lib"
		},
		"ts/eightpuzzle": {
			import: path.resolve(__dirname, "scripts/ts/eightpuzzle.ts"),
			dependOn: "lib"
		},
		"ts/fadeinout": path.resolve(__dirname, "scripts/ts/fadeinout.ts"),
		"ts/gameoflife": path.resolve(__dirname, "scripts/ts/gameoflife.ts"),
		"ts/imagedataurl": path.resolve(__dirname, "scripts/ts/imagedataurl.ts"),
		"ts/history": path.resolve(__dirname, "scripts/ts/history.ts"),
		"ts/intersectionobserver": path.resolve(__dirname, "scripts/ts/intersectionobserver.ts"),
		"ts/saizeriya": path.resolve(__dirname, "scripts/ts/saizeriya.ts"),
		"ts/sudoku": {
			import: path.resolve(__dirname, "scripts/ts/sudoku.ts"),
			dependOn: "lib"
		},
		"ts/svgclock": path.resolve(__dirname, "scripts/ts/svgclock.ts"),
		"ts/test": path.resolve(__dirname, "scripts/ts/test.ts")
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: path.resolve(__dirname, "node_modules")
			}
		]
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "wwwroot/js")
	},
	resolve: {
		extensions: [".ts", ".js"]
	}
};

module.exports = [
	scssConfig,
	tsConfig
];
