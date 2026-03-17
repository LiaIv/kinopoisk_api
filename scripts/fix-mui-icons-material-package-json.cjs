const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@mui',
  'icons-material',
  'package.json',
);

try {
  if (!fs.existsSync(packageJsonPath)) {
    process.exit(0);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const exportsField = packageJson.exports || {};

  if (exportsField['./package.json'] === './package.json') {
    process.exit(0);
  }

  packageJson.exports = {
    ...exportsField,
    './package.json': './package.json',
  };

  fs.writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    'utf8',
  );
} catch (error) {
  console.warn(
    '[postinstall] Failed to patch @mui/icons-material package exports:',
    error.message,
  );
}
