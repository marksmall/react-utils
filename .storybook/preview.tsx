import React from 'react';

// import i18n from '../src/i18n/i18n';
// import { BrowserRouter } from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import '~/index.css';

// export const decorators = [
//   (Story, context) => (
//     <BrowserRouter>
//       <Story {...context} />
//     </BrowserRouter>
//   ),
// ];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    list: [
      { name: 'Dark', class: 'dark', color: '#2d3748' },
      { name: 'Light', class: 'light', color: '#2b6cb0' },
    ],
  },
  // i18n,
  // locale: 'en',
  // locales: {
  //   en: { title: 'English', left: '🇬🇧' },
  //   fr: { title: 'French', left: '🇫🇷' },
  // },
};
