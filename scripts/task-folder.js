import fs from "fs";
import path from "path";

export function getFolderName(date) {
  if (!date) {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const folderName = `${year}-${month}-${day}`;

  return folderName;
}

export function createTaskFolder(date = new Date()) {
  const folderName = getFolderName(date);
  const folderPath = path.join("tasks", folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    const indexFilePath = path.join(folderPath, "index.ts");
    fs.writeFileSync(indexFilePath, "// Tutaj skopiuj kod zadania");

    const testFilePath = path.join(folderPath, "index.test.ts");
    fs.writeFileSync(
      testFilePath,
      "// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`"
    );

    console.log(
      `Przygotowano szablon na zadanie w folderze tasks/${folderName} 🎄`
    );
  } else {
    console.log(
      `Folder na dzisiejsze zadania już istnieje (tasks/${folderName}) 🤔`
    );
  }
}

export function createTaskFoldersFromRange(startDate, endDate) {
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    createTaskFolder(new Date(date));
  }
}
