const { Worker } = require("worker_threads");

/**

This function creates a new worker thread to process image files.
@param {string} path - The path of the worker file to execute.
@param {Array.<string>} fileChunk - An array of image files to process in this worker thread.
@param {number} id - The unique ID of this worker thread.
@param {object} config - An object containing configuration options for the image processing task.
@returns {Promise} - A Promise that resolves when the image processing task is complete.
*/
const createWorker = (path, fileChunk, id, config) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, {
      workerData: { files: fileChunk, id, config },
    });

    worker.on("message", (data) => resolve(data));
    worker.on("error", (err) => reject(err));
  });
};

module.exports = createWorker;