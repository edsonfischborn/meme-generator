const createMeme = require('./createMeme');

class MemeController {
  async store(req, res) {
    const { text, config } = req.body;
    const { background, logo } = req.readyData;

    const img = await new createMeme(background, logo, text, config).create();

    return res.status(200).json(img);
  }
}

module.exports = new MemeController();
