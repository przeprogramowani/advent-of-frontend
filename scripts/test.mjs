import { exec } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { getFolderName } from "./task-folder.js";
import { isNumeric, isValidDate } from "./utils.js";

export function getTestFilePath(date) {
  return join("tasks", getFolderName(date), "index.test.ts");
}

function getTestPath(argHandlerType, testDateArg) {
  const argHandlers = {
    "date": (testDateArg) => getTestFilePath(new Date(testDateArg)),
    "day": (testDateArg) => {
      const testDay = parseInt(testDateArg);
      if (testDay < 1 || testDay > 24) {
        console.error("Podaj dzień z zakresu od 1 do 24.");
        return;
      }

      const day = String(testDay).padStart(2, "0");

      const directories = readdirSync("./tasks");
      
      let selectedDirectory;
      directories
        .sort()
        .forEach(dir => {
          const dirAsDate = new Date(dir);

          if (isValidDate(dir)
              && dirAsDate <= new Date()
              && dirAsDate.getDate() === testDay) {
                selectedDirectory = dir;
          }
        });
      const now = new Date();  
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth() + 1;

      if (!selectedDirectory) {
        console.error(`Nie znaleziono folderu z datą: ${nowYear}-${nowMonth}-${day}.`);
        return;
      }

      const selectedDate = new Date(selectedDirectory);
      return getTestFilePath(selectedDate);
    },
  };

  return argHandlers[argHandlerType](testDateArg);
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
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}

function getArgHandler(testDateArg) {
  if (isValidDate(testDateArg)) {
    return "date";
  } else if (isNumeric(testDateArg)) {
    return "day";
  } else {
    return null;
  }
}

function getTest(testDateArg) {
  const argHandlerType = getArgHandler(testDateArg);

  if (argHandlerType) {
    return getTestPath(argHandlerType, testDateArg);
  }

  console.error("Podany argument jest nieprawidłowy lub format daty jest nieobsługiwany.");
}

function runTestsForDay(testDateArg) {
  const testPath = getTest(testDateArg);
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