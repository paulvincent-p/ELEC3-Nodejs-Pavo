/*
Name: Paul Vincent M. Pavo
Section: IV-BSIT-B
Activity: N3 - File Manager
Date: November 25, 2026
*/

// imports
const fs = require("fs");
const path = require("path");

// files folder path
const filesDirectory = path.join(__dirname, "files");

// to make sure the files folder exists
if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory);
}

// arguments and commands
const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(" ");

// validate file name and create path
function getFilePath(name) {
    if (!name || path.basename(name) !== name) {
        console.log("Please provide a valid file name.");
        return null;
    }

    if (path.extname(name).toLowerCase() !== ".txt") {
        console.log("Only .txt files are allowed.");
        return null;
    }

    return path.join(filesDirectory, name);
}

// create new text file
function createFile() {
    const filePath = getFilePath(fileName);

    if (!filePath) return;

    if (!content) {
        console.log("Please provide content for the file.");
        return;
    }

    try {
        fs.writeFileSync(filePath, content, { flag: "wx" });
        console.log(`File "${fileName}" created successfully.`);
    } catch (error) {
        if (error.code === "EEXIST") {
            console.log("File already exists. Choose another name.");
        } else {
            console.log("Error creating file:", error.message);
        }
    }
}

// read existing text file
function readFile() {
    const filePath = getFilePath(fileName);

    if (!filePath) return;

    try {
        const data = fs.readFileSync(filePath, "utf8");

        console.log("\n=+=+=+= FILE CONTENT =+=+=+=");
        console.log(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File not found.");
        } else {
            console.log("Error reading file:", error.message);
        }
    }
}

// append 
function updateFile() {
    const filePath = getFilePath(fileName);

    if (!filePath) return;

    if (!content) {
        console.log("Please provide text to append.");
        return;
    }

    try {
        fs.appendFileSync(filePath, "\n" + content);
        console.log(`File "${fileName}" updated successfully.`);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File not found. Cannot update.");
        } else {
            console.log("Error updating file:", error.message);
        }
    }
}

// delete text file (kung nag eexist lang)
function deleteFile() {
    const filePath = getFilePath(fileName);

    if (!filePath) return;

    try {
        fs.unlinkSync(filePath);
        console.log(`File "${fileName}" deleted successfully.`);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File not found. Cannot delete.");
        } else {
            console.log("Error deleting file:", error.message);
        }
    }
}

// display all files and info
function listFiles() {
    try {
        const files = fs.readdirSync(filesDirectory);

        if (files.length === 0) {
            console.log("No files found in the files folder.");
            return;
        }

        console.log("\n=+=+=+= FILE LIST =+=+=+=");

        files.forEach((file) => {
            const filePath = path.join(filesDirectory, file);
            const baseName = path.basename(filePath);
            const extension = path.extname(filePath);
            const data = fs.readFileSync(filePath, "utf8");

            console.log("\nFull Path:", filePath);
            console.log("File Name:", baseName);
            console.log("Extension:", extension);
            console.log("Contents:", data);
            console.log("------------------------------");
        });
    } catch (error) {
        console.log("Error listing files:", error.message);
    }
}

// command
switch (command) {
    case "create":
        createFile();
        break;

    case "read":
        readFile();
        break;

    case "update":
        updateFile();
        break;

    case "delete":
        deleteFile();
        break;

    case "list":
        listFiles();
        break;

    default:
        console.log("=+=+=+= FILE MANAGER =+=+=+=");
        console.log("Available commands:");
        console.log('Create: node index.js create notes.txt "Hello"');
        console.log("Read:   node index.js read notes.txt");
        console.log('Update: node index.js update notes.txt "New content"');
        console.log("Delete: node index.js delete notes.txt");
        console.log("List:   node index.js list");
        break;
}
