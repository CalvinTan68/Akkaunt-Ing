import React from "react";
import "./bootstrap";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import "./style.css";
import { createRoot } from "react-dom/client";

createInertiaApp({
    title: (title) => `AKKAUNT-ING - ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

InertiaProgress.init();
