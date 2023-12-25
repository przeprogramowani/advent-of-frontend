const { exec } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

const ADVENT_OF_FRONTEND_YEAR = '2023';
const ADVENT_OF_FRONTEND_MONTH = '12';

const VALID_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function buildPath(type, testDateArg) {
  const dateHandlers = {
    'date': (testDateArg) => {
      const date = new Date(testDateArg);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `./tasks/${year}-${month}-${day}/index.test.ts`;
    },
    'numeric': (testDateArg) => {
      const testDay = parseInt(testDateArg);
      if (testDay < 1 || testDay > 24) {
        console.error('Podaj dzień z zakresu od 1 do 24.');
        return;
      }
      const year = ADVENT_OF_FRONTEND_YEAR;
      const month = ADVENT_OF_FRONTEND_MONTH;
      const day = String(testDay).padStart(2, '0');
      return `./tasks/${year}-${month}-${day}/index.test.ts`;
    },
  };

  return dateHandlers[type](testDateArg);
}

function isValidDate(str) {
  const date = new Date(str);
  return !isNaN(date) &&
    VALID_DATE_PATTERN.test(str);
}

function isNumeric(str) {
  return typeof str === 'string' &&
    !isNaN(str) &&
    !isNaN(parseInt(str));
}

function runTests(testPath) {
  exec(`jest --colors ${testPath}`, (error, stdout, stderr) => {
    handleTestExecution(error, stdout, stderr);
  });
}

function runAllTests() {
  exec(`jest --colors`, (error, stdout, stderr) => {
    handleTestExecution(error, stdout, stderr);
  });
}

function handleTestExecution(error, stdout, stderr) {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}

function getValidDateHandler(testDateArg) {
  if (isValidDate(testDateArg)) {
    return 'date';
  } else if (isNumeric(testDateArg)) {
    return 'numeric';
  } else {
    return null;
  }
}

function getTestPath(testDateArg) {
  const handlerType = getValidDateHandler(testDateArg);

  if (handlerType) {
    return buildPath(handlerType, testDateArg);
  }

  console.error('Podany argument jest nieprawidłowy lub format daty jest nieobsługiwany.');
}

function runTestsForDay(testDateArg) {
  const testPath = getTestPath(testDateArg);
  if (!testPath) {
    return;
  }

  const fullTestPath = join(process.cwd(), testPath);

  if (existsSync(fullTestPath)) {
    runTests(testPath);
  } else {
    console.log(`Nie znaleziono folderu z datą: ${testPath}.`);
  }
}

const testDateArg = process.argv[2];

if (testDateArg) {
  runTestsForDay(testDateArg);
} else {
  runAllTests();
}