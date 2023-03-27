const path = require("path");
const fs = require("fs");

/**

Creates the folder architecture to output the resized images.
@param {object} config - Configuration object.
@param {string} config.outputFolder - Path to the output folder.
@param {string[]} config.formats - Array of the desired image formats.
@param {number[]} config.sizes - Array of the desired image sizes.
@returns {boolean} - Returns true if the folders were successfully created.
@throws {Error} - Throws an error if the folders could not be created.
*/
const createFolder = (config) => {
  const { outputFolder, formats, sizes } = config;

  try {
    if (fs.existsSync(outputFolder)) {
      throw new Error(
        `Folder ${outputFolder} Already exists! You need to create a new folder or delete this one`
      );
    }

    for (const format of formats) {
      const formatFolder = path.join(outputFolder, format);

      for (const size of sizes) {
        const sizeFolder = path.join(formatFolder, size.toString());
        fs.mkdirSync(sizeFolder, { recursive: true });
      }
    }

    return true;
  } catch (err) {
    throw new Error(`Error creating folders: ${err.message}`);
  }
};

module.exports = createFolder;
