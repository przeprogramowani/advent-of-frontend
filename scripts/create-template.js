import fs from "fs";
import { createTaskFolder, createTaskFoldersFromRange } from "./task-folder.js";

const arg = process.argv[2];

if (!fs.existsSync("tasks")) {
	fs.mkdirSync("tasks");
}

if (!arg) {
	createTaskFoldersFromRange(new Date(), new Date());
}

if (arg === "missing") {
	const startDate = new Date("2023-12-01");
	const endDate = new Date();

	createTaskFoldersFromRange(startDate, endDate);
}
