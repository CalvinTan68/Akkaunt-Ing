require("./bootstrap");

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import "./Pages/style.css";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText ||
    "AKKAUNT-ING";

createInertiaApp({
    title: (title) => `AKKAUNT-ING - ${title}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(<App {...props} />, el);
    },
});

InertiaProgress.init({ color: "#4F46E5" });
