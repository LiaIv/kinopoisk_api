import { createElement } from 'react';
import { AppThemeProvider } from '../src/context/ThemeContext';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) =>
      createElement(
        AppThemeProvider,
        null,
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
