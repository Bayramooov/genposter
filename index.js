const Jimp = require('jimp') ;

async function textOverlay() {
   // Reading image
   const image = await Jimp.read('./test.jpg');
   // Defining the text font
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
   image.print(font, 10, 350, 'Hello World!');
   // Writing image after processing
   await image.writeAsync('./test2.jpg');
}

textOverlay();
console.log("Image is processed succesfully");
