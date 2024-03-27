import { createInertiaApp } from "@inertiajs/react";
import "antd/dist/reset.css";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import "./bootstrap";

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
