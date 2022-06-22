const sharp = require("sharp");

async function getMetadata() {
  try {
    const metadata = await sharp("test.jpg").metadata();
    console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

async function resizeImage() {
  try {
    await sharp("test.jpg")
      .resize({
        width: 150,
        height: 97
      })
      .toFile("test-resized.jpg");
  } catch (error) {
    console.log(error);
  }
}

async function formatImage() {
  try {
    // this must be .png format
    await sharp("test.jpg")
      .toFormat("jpeg", { mozjpeg: true })
      .toFile("test-compressed.jpeg");
  } catch (error) {
    console.log(error);
  }
}

async function cropImage() {
  try {
    await sharp("test.jpg")
      .extract({ width: 500, height: 330, left: 120, top: 70  })
      .toFile("test-cropped.jpg");
  } catch (error) {
    console.log(error);
  }
}

async function grayscaleImage() {
  try {
    await sharp("test.jpg")
      .grayscale()
      .toFile("test-grayscale.jpg");
  } catch (error) {
    console.log(error);
  }
}

async function rotateImage() {
  try {
    await sharp("test.jpg")
      .rotate(33, { background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFile("test-rotated.jpg");
  } catch (error) {
    console.log(error);
  }
}

async function blurImage() {
  try {
    await sharp("test.jpg")
      .blur(40)
      .toFile("test-blurred.jpg");
  } catch (error) {
    console.log(error);
  }
}

async function textOnImage() {
  try {
    const width = 750;
    const height = 483;
    const text = "HELLO WORLD";

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .title {
          fill: yellow;
          font-size: 100px;
          font-weight: bold;
        }
      </style>
      <text x="50%" y="50%" font-family="Sans Serif" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp("test.jpg")
      .composite([
        {
          input: svgBuffer,
          top: 100,
          left: 100,
        }
      ])
      .toFile("test-text.jpg");
  } catch (error) {
    console.log(error);
  }
}


getMetadata();
// resizeImage();
// formatImage();
// cropImage();
// grayscaleImage();
// rotateImage();
// blurImage();
textOnImage();