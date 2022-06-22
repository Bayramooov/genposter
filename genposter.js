const sharp = require("sharp");

const imagePath = './media/arab-tili.jpg';
const newImagePath = './media/temp/arab-tili.jpg';

module.exports = async function textOnImage(text_r1, text_r2) {
  try {
    const svgImage = `
      <svg width="1080" height="130">
        <g>
        <style>
          .rect {
            fill: #d9cf34;
          }
          .text {
            fill: #2a776c;
            font-size: 38px;
            font-weight: bold;
          }
        </style>
          <rect class="rect" rx="15" ry="15" x="340" y="0" width="400" height="130" fill="#d9cf34"></rect>
          <text class="text" x="50%" y="55" text-anchor="middle">${ text_r1.toUpperCase() }</text>
          <text class="text" x="50%" y="105" text-anchor="middle">${ text_r2.toUpperCase() }</text>
        </g>
      </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    await sharp(imagePath)
      .composite([
        {
          input: svgBuffer,
          top: 730,
          left: 0,
        }
      ])
      .toFile(newImagePath);
  } catch (error) {
    console.log(error);
  }
}
