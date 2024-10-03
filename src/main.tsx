import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { Home } from "@/page/home";

import "the-new-css-reset/css/reset.css";
import "@/style/tailwind.css";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Home />
    <div>
      <Toaster />
    </div>
  </React.StrictMode>,
);
