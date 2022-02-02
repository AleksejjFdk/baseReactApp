const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { InjectManifest } = require("workbox-webpack-plugin")

module.exports = (env) => {
    const plugins = [
        new webpack.DefinePlugin({
            "process.env.withPWA": !!env.withPWA,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"),
        }),
    ]

    if (env.withPWA) {
        plugins.push(
            new InjectManifest({
                swSrc: "./src/serviceWorker.ts",
                swDest: "../sw.js",
                modifyURLPrefix: { "": "/dist/" },
                exclude: [/\.(txt|map)$/i],
                maximumFileSizeToCacheInBytes: 15728640,
            })
        )
    }

    return {
        entry: {
            desktopApp: "./src/app/main.tsx",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".svg"],
            modules: [path.join(__dirname, "./src"), path.join(__dirname, "./node_modules")],
        },
        output: {
            path: path.join(__dirname, "../wwwroot/dist"),
            filename: "[name].js",
            clean: true,
        },
        module: {
            rules: [
                { test: /\.svg$/, use: "@svgr/webpack" },
                { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
                { test: /\.css$/i, use: ["style-loader", "css-loader"] },
                { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
                { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
                { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
            ],
        },
        stats: {
            hash: false,
            entrypoints: false,
            modules: false,
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        minChunks: 2,
                        priority: 1,
                    },
                    fonts: {
                        name: "fonts",
                        test: /[\\/]node_modules[\\/]@fontsource.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 2,
                    },
                    react: {
                        name: "react",
                        test: /[\\/]node_modules[\\/]react.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 3,
                    },
                },
            },
        },
        plugins: plugins,
    }
}
