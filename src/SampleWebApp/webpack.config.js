/// <binding ProjectOpened='Watch - Development' />
"use strict";

const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

// Sass
const scssConfig = {
	entry: {
		index: path.resolve(__dirname, "styles/index.scss"),
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
	entry: {
		index: path.resolve(__dirname, "scripts/index.ts")
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

