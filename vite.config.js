import react from "@vitejs/plugin-react-swc";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [laravel(["resources/js/app.jsx"]), react()],
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
