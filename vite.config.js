import react from "@vitejs/plugin-react-swc";
import laravel from "laravel-vite-plugin";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
    plugins: [
        laravel(["resources/js/app.jsx", "resources/css/app.css"]),
        react(),
        splitVendorChunkPlugin(),
        Sitemap({
            hostname: "https://akkaunt-ing.rf.gd",
            outDir: "public",
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("@ant-design/icons")) {
                        return "@icons";
                    } else if (id.includes("axios")) {
                        return "@axios";
                    } else if (id.includes("chart.js")) {
                        return "@chart-js";
                    } else if (id.includes("dayjs")) {
                        return "@dayjs";
                    } else if (id.includes("react-chartjs-2")) {
                        return "@chart-js-react";
                    }
                },
            },
        },
    },
});
