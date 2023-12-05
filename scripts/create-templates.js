import fs from 'fs';
import path from 'path';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');

const daysToGenerate = today.getDate();
const days = Array.from({ length: daysToGenerate }, (_, i) =>
  String(i + 1).padStart(2, '0')
);

if (!fs.existsSync('tasks')) {
  fs.mkdirSync('tasks');
}

let isFolderCreated = false;
days.forEach((day) => {
  const folderName = `${year}-${month}-${day}`;
  const folderPath = path.join('tasks', folderName);

  if (!fs.existsSync(folderPath)) {
    isFolderCreated = true;
    fs.mkdirSync(folderPath);
    const indexFilePath = path.join(folderPath, 'index.ts');
    fs.writeFileSync(indexFilePath, '// Tutaj skopiuj kod zadania');

    const testFilePath = path.join(folderPath, 'index.test.ts');
    fs.writeFileSync(
      testFilePath,
      '// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`'
    );

    console.log(
      `Przygotowano szablon na zadanie w folderze tasks/${folderName} 🎄`
    );
  }
});

if (!isFolderCreated) {
  console.log(`Szablony do wszystkich opublikowanych zadań już istnieją 🤔`);
}
