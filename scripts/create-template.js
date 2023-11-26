import fs from 'fs';
import path from 'path';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const folderName = `${year}-${month}-${day}`;

const folderPath = path.join('tasks', folderName);

if (!fs.existsSync('tasks')) {
    fs.mkdirSync('tasks');
}

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    const indexFilePath = path.join(folderPath, 'index.ts');
    fs.writeFileSync(indexFilePath, '// Tutaj skopiuj kod zadania');

    const testFilePath = path.join(folderPath, 'index.test.ts');
    fs.writeFileSync(testFilePath, '// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`');

    console.log(`Przygotowano szablon na zadanie w folderze tasks/${folderName} 🎄`)
} else {
    console.log(`Folder na dzisiejsze zadania już istnieje (tasks/${folderName}) 🤔`);
}
