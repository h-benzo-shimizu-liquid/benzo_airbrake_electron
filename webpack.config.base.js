
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const main = {
	target: "electron-main",
	entry: path.resolve(__dirname, "./src/main/index.ts"),
	output: {
		path: path.resolve(__dirname, "./dist1"),
		filename: "main.js",
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	resolve: {
		extensions: [".js", ".ts",],
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: "ts-loader",
			options: {
				configFile: "tsconfig.main.json",
			},
		},],
	},
};

const renderer = {
	target: "electron-renderer",
	entry: path.resolve(__dirname, "./src/renderer/index.ts"),
	output: {
		path: path.resolve(__dirname, "./dist1"),
		filename: "renderer.js",
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx",],
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "ts-loader",
			options: {
				configFile: "tsconfig.renderer.json",
			},
		},],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src/renderer/index.html"),
		}),
	],
};

module.exports = [main, renderer,];

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
