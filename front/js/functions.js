/**
 * @param {String} selector
 * @returns {Element}
 */
function selector(selector) {
  return document.querySelector(selector);
}

/**
 * @param {String} selector
 * @returns {NodeList}
 */
function selectorAll(selector) {
  return document.querySelectorAll(selector);
}

/**
 * @param {Element} elem input type checkbox
 * @param {Array} checkboxArray
 * @returns {void}
 */
function oneCheckboxOption(elem, cheboxArray) {
  for (let item of cheboxArray) {
    item.checked = false;
  }
  elem.checked = true;
}

/**
 * @param {Blob} file
 * @returns {ArrayBuffer}
 */
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

/**
 * @param {Blob} fileSrc
 * @returns {ArrayBuffer}
 */
async function fileBlob(fileSrc) {
  let data = await fetch(fileSrc);
  data = await readFileAsync(await data.blob());

  return data;
}

/**
 * @param {ArrayBuffer} background
 * @param {ArrayBuffer} logo
 * @param {String} text
 * @param {Object} config
 * @param {String} url
 */
async function api(background, logo, text = '', config, url) {
  if (!url) {
    url = 'http://localhost:3003/meme';
  }

  if (!(background && logo)) {
    return console.error('missing parameters');
  }

  const data = { background, logo, text, config };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
