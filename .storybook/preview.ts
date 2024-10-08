import type { Preview } from "@storybook/react";
import "../src/style/tailwind.css";
import "the-new-css-reset/css/reset.css";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
