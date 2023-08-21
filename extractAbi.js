const { writeFileSync, existsSync, rmSync } = require('fs');
const { abi } = require('./src/build/contracts/PostIt.json');
const path = './src/abi/PostIt.ts';
const tsFile = `const abi = ${JSON.stringify(abi, null, '\t').replaceAll('"', '\'')} as const;\nexport default abi;\n`;
if (existsSync(path)) {
  rmSync(path);
}
writeFileSync(path, tsFile);