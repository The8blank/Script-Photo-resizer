const fs = require("fs");
const os = require("os");
const createWorker = require("./createWorker");

const systemCpuCores = os.cpus().length;

/**

Dispatches image processing tasks to multiple worker threads for better performance.
@async
@param {Object} config - Configuration object for image processing.
@param {string} config.inputFolder - The folder path containing input images.
@param {string} config.outputFolder - The folder path for the output images.
@param {Array.<string>} config.acceptedFormats - An array of image formats accepted by the Sharp library.
@param {Array.<string>} config.formats - An array of image formats needed in the output.
@param {Array.<number>} config.sizes - An array of image sizes needed in the output.
@returns {Promise<void>} - A Promise that resolves when all image processing tasks are complete.
*/
const dispatchWorker = async (config) => {
  // Set up configuration object
  const { inputFolder } = config;

  // Read files from input folder
  const files = fs.readdirSync(inputFolder);

  // Calculate chunk size for file distribution among workers
  const chunkSize = Math.ceil(files.length / systemCpuCores);

  // Split files into chunks for distribution among workers
  const fileChunks = [];
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    fileChunks.push(chunk);
  }

  // Start timer for conversion process
  const start = Date.now();

  // Create worker threads for each file chunk
  const workerPromises = [];
  for (let i = 0; i < systemCpuCores; i++) {
    workerPromises.push(
      createWorker("./utils/worker.js", fileChunks[i], i, config)
    );
  }

  // Wait for worker threads to complete
  await Promise.all(workerPromises);

  // End timer for conversion process and log elapsed time
  const end = Date.now();
  console.log(`Conversion effectuer en [${end - start} ms]`);
};

module.exports = dispatchWorker;
