const createFolder = require("./utils/createFolder");
const dispatchWorker = require("./utils/dispatchWorker");

/**
 * Configuration object for the programme photoResizer.
 * You need to configure it before running
 */
const config = {

  // WELCOME TO PHOTO RESIZER!
  // PLEASE INDICATE THE INPUT AND OUTPUT FILE PATHS.
  inputFolder : "YOUR INPUT FOLDER", 
  outputFolder : "YOUR OUTPUT FOLDER",

  // ACCEPTED FORMATS ARE JPEG, JPG, WEBP, TIFF.
  acceptedFormats : ["jpeg", "jpg", "webp", "png", "tiff"],

  // PLEASE INDICATE THE DESIRED FORMATS IN THE ARRAY.
  formats : ["jpeg", "jpg", "webp", "png", "tiff"],

  // PLEASE INDICATE THE DESIRED SIZES IN THE ARRAY.
  sizes : [320, 500, 1024, 1500, 1700]
}



// LUNCH CONVERSION
try {
  createFolder(config);
  dispatchWorker(config);
} catch (err) {
  throw err;
}