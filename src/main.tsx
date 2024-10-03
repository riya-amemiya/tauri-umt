import "the-new-css-reset/css/reset.css";
import "@/style/tailwind.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <div>
      <Toaster />
    </div>
  </React.StrictMode>,
);
