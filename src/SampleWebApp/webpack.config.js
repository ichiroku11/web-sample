/// <binding ProjectOpened='Watch - Development' />
"use strict";

const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

// Sass
const scssConfig = {
	entry: {
		lib: path.resolve(__dirname, "styles/lib.scss"),
		index: path.resolve(__dirname, "styles/index.scss"),
		"ts/imagedataurl": path.resolve(__dirname, "styles/ts/imagedataurl.scss"),
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
		"ts/gameoflife": path.resolve(__dirname, "scripts/ts/gameoflife.ts"),
		"ts/imagedataurl": path.resolve(__dirname, "scripts/ts/imagedataurl.ts"),
		"ts/sudoku": path.resolve(__dirname, "scripts/ts/sudoku.ts"),
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

