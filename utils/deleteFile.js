const path = require("path");
const fs = require("fs");

const deleteFile = async (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      console.error(`File ${filePath} does not exist`);
      return;
    }

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(`Failed to delete file ${filePath}`);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  });
};

module.exports = deleteFile;
