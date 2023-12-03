import React from "react";
import "./bootstrap";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "./style.css";

const resolveComponent = (name) =>
    resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob("./Pages/**/*.jsx")
    );

const setupApp = ({ el, App, props }) => {
    createRoot(el).render(<App {...props} />);
};

const inertiaAppConfig = {
    title: (title) => `AKKAUNT-ING - ${title}`,
    resolve: resolveComponent,
    setup: setupApp,
    progress: {
        color: "#29d",
    },
};

createInertiaApp(inertiaAppConfig);
