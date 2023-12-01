import React from "react";
import "./bootstrap";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import "./style.css";

createInertiaApp({
    title: (title) => `AKKAUNT-ING - ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

InertiaProgress.init();
