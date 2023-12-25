import fs from 'fs';
import path from 'path';

const today = new Date();
const year = today.getFullYear();
const month = 12;
const daysInCalendar = 24;
const daysToGenerate = Array.from({ length: daysInCalendar }, (_, i) =>
  String(i + 1).padStart(2, '0')
);

if (!fs.existsSync('tasks')) {
  fs.mkdirSync('tasks');
}

let atLeastOneFolderCreated = false;

daysToGenerate.forEach((day) => {
  const folderName = `${year}-${month}-${day}`;
  const folderPath = path.join('tasks', folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    const indexFilePath = path.join(folderPath, 'index.ts');
    fs.writeFileSync(indexFilePath, '// Tutaj skopiuj kod zadania');

    const testFilePath = path.join(folderPath, 'index.test.ts');
    fs.writeFileSync(
      testFilePath,
      '// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`'
    );
    atLeastOneFolderCreated = true;

    console.log(
      `Przygotowano szablon na zadanie w folderze tasks/${folderName} 🎄`
    );
  }
});

if (!atLeastOneFolderCreated) {
  console.log('Foldery na tegoroczne zadania już istnieją 🤔');
}
