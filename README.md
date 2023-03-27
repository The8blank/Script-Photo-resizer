<br/>

<h3 align="center">PHOTO RESIZER</h3>

  <p align="center">
    Photo Resizer is a Node.js command-line program that resizes images in bulk. It uses the Sharp library for image processing and can handle multiple image formats including JPEG, JPG, WEBP, PNG, and TIFF.
    <br />
   

<!-- GETTING STARTED -->
## Getting Started

To use Photo Resizer, you must have Node.js installed on your system. You can download and install Node.js from the official Node.js website.

This is an example of how you can convert your pics. 

### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/The8blank/Photo-Resizer-v.1.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

4. Complete the config file in `app.js` 
    ```
    const config = {

       inputFolder : "YOUR INPUT FOLDER", 
       outputFolder : "YOUR OUTPUT FOLDER",

       formats : ["jpeg", "jpg", "webp", "png", "tiff"],
       sizes : [320, 500, 1024, 1500, 1700]
   }
    ```
5. finally run 
    ```
    npm start
    ```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!
