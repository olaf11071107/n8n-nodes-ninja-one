module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'n8n-nodes-base'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'n8n-nodes-base/node-param-description-missing-for-return-all': 'off',
    'n8n-nodes-base/node-class-description-empty-base-description': 'off',
    'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'error',
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
