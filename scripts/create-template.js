import fs from "fs";
import { createTaskFolder, createTaskFoldersFromRange } from "./task-folder.js";

const arg = process.argv[2];

if (!fs.existsSync("tasks")) {
  fs.mkdirSync("tasks");
}

if (!arg) {
  createTaskFolder(new Date());
}

if (arg === "all") {
  const startDate = new Date("2023-12-01");
  const endDate = new Date("2023-12-24");

  createTaskFoldersFromRange(startDate, endDate);
}

if (arg === "with-previous") {
  const startDate = new Date("2023-12-01");
  const endDate = new Date();

  createTaskFoldersFromRange(startDate, endDate);
}
