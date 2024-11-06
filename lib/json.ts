import fs from "fs";

// Helper function to read data from JSON file
export const readJson = <T>(path: string): T => {
  const fileData = fs.readFileSync(path, "utf8");
  return JSON.parse(fileData);
};

// Helper function to write data to JSON file
export const writeJson = <T>(path: string, data: T) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
