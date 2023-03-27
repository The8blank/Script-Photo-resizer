const { parentPort, workerData } = require("worker_threads");
const path = require("path");
const sharp = require("sharp");

const { files, config, id } = workerData;

/**

This function is executed in a worker thread to process image files using the Sharp library.
@async
@param {Array.<string>} files - An array of image files to process.
@param {object} config - An object containing configuration options for the image processing task.
@param {string} config.inputFolder - The folder path where the input images are located.
@param {string} config.outputFolder - The folder path where the output images will be saved.
@param {Array.<string>} config.acceptedFormats - An array of image formats accepted by the Sharp library.
@param {Array.<string>} config.formats - An array of image formats to convert the input images to.
@param {Array.<number>} config.sizes - An array of image sizes to resize the input images to.
@returns {Promise} - A Promise that resolves when the image processing task is complete.
*/
const convert = async (files, config) => {
  const { inputFolder, outputFolder, acceptedFormats, formats, sizes } = config;

  for (const file of files) {
    const filePath = path.join(inputFolder, file);
    const fileName = path.basename(filePath.split(".")[0]);
    const fileExtension = path.extname(filePath).slice(1);
    const image = await sharp(filePath);

    if (acceptedFormats.includes(fileExtension)) {
      const time = new Date(Date.now());
      for (const format of formats) {
        for (const size of sizes) {
          await image
            .resize({ width: size, height: null, fit: "inside" })
            .toFormat(format, {
              quality: 100,
              progressive: true,
              chromaSubsampling: "4:4:4",
            })
            .toFile(`${outputFolder}/${format}/${size}/${fileName}.${format}`);
        }

        console.log(
          `[FROM THREAD ${
            id + 1
          }]: \nFile: ${fileName}.${format} in : ${sizes} x AUTO succefully converted \n`
        );
      }
    }
  }
};

(async () => {
  if (files) {
    await convert(files, config);
  }

  parentPort.postMessage("done");
})();
