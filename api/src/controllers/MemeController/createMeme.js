/* eslint-disable new-cap */
const Jimp = require('jimp');

class MemeImg {
  constructor(backgroundData, logoData, text, config) {
    this.background = new Buffer.from(backgroundData, 'base64');
    this.logo = new Buffer.from(logoData, 'base64');
    this.text = text;

    if (config) {
      this._bgConfig = config.background || {};
      this._logoConfig = config.logo || {};
      this._textConfig = config.text || {};
    }

    this.config = {
      background: {
        width: 500,
        height: 400,
        ...this._bgConfig,
      },
      logo: {
        width: 120,
        height: Jimp.AUTO,
        x: 20,
        y: 200,
        ...this._logoConfig,
      },
      text: {
        font: Jimp.FONT_SANS_32_WHITE,
        x: 0,
        y: 15,
        alignX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignY: Jimp.VERTICAL_ALIGN_TOP,
        ...this._textConfig,
      },
    };
  }

  async create() {
    const { font } = this.config.text;
    const { width: bgWidth, height: bgHeight } = this.config.background;
    const { width: logoWidth, height: logoHeight } = this.config.logo;

    this.backgroundJIMP = await (await Jimp.read(this.background)).resize(
      bgWidth,
      bgHeight
    );
    this.logoJIMP = await (await Jimp.read(this.logo)).resize(
      logoWidth,
      logoHeight
    );
    this.fontJIMP = await Jimp.loadFont(font);

    this.insertLogo();
    this.insertText();

    return this.backgroundJIMP.getBase64Async(Jimp.AUTO);
  }

  insertLogo() {
    const { logoWidth, x, y } = this.config.logo;

    this.backgroundJIMP.composite(
      this.logoJIMP,
      x,
      y,
      this.backgroundJIMP.bitmap.height - (logoWidth + y)
    );
  }

  insertText() {
    const { text } = this;
    const { x, y, alignX, alignY } = this.config.text;

    this.backgroundJIMP.print(
      this.fontJIMP,
      x,
      y,
      {
        text,
        alignmentX: alignX,
        alignmentY: alignY,
      },
      this.backgroundJIMP.bitmap.width,
      this.backgroundJIMP.bitmap.height
    );
  }
}

module.exports = MemeImg;
