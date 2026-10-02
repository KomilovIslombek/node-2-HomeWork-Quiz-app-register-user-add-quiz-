import { access, constants } from 'node:fs/promises';

export async function checkFileExists(filePath) {
  try {
    // F_OK checks if the file is visible/exists
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    // If the error code is ENOENT, the file definitely doesn't exist
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error; // Re-throw other errors (e.g., permission issues)
  }
}

export async function checkPathExists(folderPath) {
  try {
    await access(folderPath, constants.F_OK);
    return true; // Folder exists
  } catch (error) {
    if (error.code === 'ENOENT') return false; // Folder does not exist
    throw error;
  }
}

// Usage:
// const exists = await checkFileExists('./myfile.txt');
// console.log(exists); // true or false


export function trimAndLowerCase(str) {
  return String(str).trim().toLowerCase().replaceAll(' ', '');
}