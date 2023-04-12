const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
module.exports = defineConfig({
	// outputDir: path.resolve(__dirname, "./testDist"),
	transpileDependencies: true,
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/scss/common.scss";`,
			},
		},
		sourceMap: true,
	},
	devServer: {
		client: {
			overlay: false,
		},
	},
	publicPath: process.env.NODE_ENV === "production" ? "/mattyWebPages" : "/",
});