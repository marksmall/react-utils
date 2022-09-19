module.exports = {
  extends: [
    '@astrosat/eslint-config-astrosat',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['jest-dom', 'testing-library', 'tailwindcss'],
};
