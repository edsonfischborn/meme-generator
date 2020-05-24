const validTypes = ['jpeg', 'png', 'gif'];

const validExtension = (image, imageType = validTypes) => {
  let extension = image.split(new RegExp('/(.*?);', 'g'));
  [, extension] = extension;
  return imageType.indexOf(extension) > -1;
};

const validImg = (req, res, next) => {
  const { background: bg, logo: lg } = req.body;

  if (!(bg && lg)) {
    return res.sendStatus(400);
  }

  try {
    const [bgType, bgData] = bg.split(',');
    const [logoType, logoData] = lg.split(',');
  } catch (err) {
    res.status(400).json({
      error:
        'Check if the image type is present, example: data:image/png;base64,...',
    });
  }
  
  if (!(validExtension(bgType) && validExtension(logoType))) {
    return res.status(400).json({
      error: 'invalid image extension',
    });
  }

  req.readyData = { background: bgData, logo: logoData };

  return next();
};

module.exports = validImg;
