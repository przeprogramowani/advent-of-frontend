const { exec } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const testPath = `./tasks/${year}-${month}-${day}/index.test.ts`;

const fullTestPath = join(process.cwd(), testPath);

if (existsSync(fullTestPath)) {
  exec(`jest --colors ${testPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else {
  console.log(`Nie znaleziono folderu z dzisiejszą datą: ${testPath}. Uruchamiam wszystkie testy.`);
  exec('jest --colors', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}