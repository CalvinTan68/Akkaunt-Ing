import react from "@vitejs/plugin-react-swc";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
    plugins: [
        laravel(["resources/js/app.jsx", "resources/css/app.css"]),
        react(),
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
});
