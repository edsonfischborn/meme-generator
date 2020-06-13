// -- "Login" --
/* window.onload = alert("Mude para o modo tela cheia, F11"); */

/*
  Simulate a login action, login button onclick -> Hide "login" elements and show desktop itens
*/
selector('[btnLogin]').addEventListener('click', () => {
  document.documentElement.requestFullscreen();

  selectorAll('[loginHideOnClick]').forEach(
    (elem) => (elem.style.display = 'none')
  );
  selector('[spiner]').style.display = 'flex';

  setTimeout(() => {
    selectorAll('[loadDesktop]').forEach(
      (elem) => (elem.style.display = 'flex')
    );
    selector('[login]').style.display = 'none';
  }, 4000);
});

// -- Desktop icons actions --
/*
  Open desktop "programs"
*/

const memeEditor = selector('[memeEditorCt]');

selector('[githubIco]').addEventListener('dblclick', () => {
  window.open('https://github.com/edsonfischborn');
});

selector('[memeEditorIco]').addEventListener('dblclick', () => {
  memeEditor.style.display = 'flex';
});

selector('[memeEditorBtnClose]').addEventListener('click', () => {
  memeEditor.style.display = 'none';
});

// -- Desktop task bar --

// Refresh desktop Date
const [desktopHours, desktopDate] = selector('[date]').children;
function refreshDesktopDate() {
  let date = new Date();
  desktopHours.innerText = `${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  desktopDate.innerText = date.toLocaleDateString('PT-BR');
}

// -- "Meme-editor" --

let globalComplementText = "";
let globalBackgroundSrc = "";
let globalLogoSrc = "";
let globalUserText = "";
let globalFullText = "";

// -- Section complement  --

// Return all checkbox and label of section complement
function complementSectionOptions() {
  const complementSection = selector("[complement]");
  let complementOptions = [...complementSection.children];
  complementOptions = complementOptions.map((elem) => elem.children);

  return complementOptions;
}

// Inserting event on inputs
const complementOptions = complementSectionOptions();
for (let [input] of complementOptions) {
  input.addEventListener("click", () => {
    globalComplementText = "";
    for (let [input, label] of complementOptions) {
      if (input.checked) {
        globalComplementText += ` ${label.innerText.toUpperCase()}`;
      }
    }
  });
}

// -- Section background options --

// Return all background checkbox
function backgroundSectionOptions(globalBackgroundSrc) {
  const backgroundSection = selector("[background]");
  let [, bgAux] = [...backgroundSection.children];
  let backgroundOptions = []; // Background section inputs

  [...bgAux.children].forEach((elem) =>
    backgroundOptions.push(elem.children[0])
  );

  return backgroundOptions;
}

const backgroundOptions = backgroundSectionOptions();
// Inserting event on inputs
backgroundOptions.forEach((elem) => {
  if (elem.checked) {
    globalBackgroundSrc = elem.nextElementSibling.src; // Load default input checked
  }
  elem.addEventListener("click", () => {
    oneCheckboxOption(elem, backgroundOptions);
    globalBackgroundSrc = elem.nextElementSibling.src;
  });
});

// -- Section logo options --

// Return all logo section options
function logoSectionOptions() {
  const logoSection = selector("section[logo]");
  let logoOptions = [];
  [...logoSection.children].forEach((elem) =>
    logoOptions.push(elem.children[0])
  );

  return logoOptions;
}

const logoOptions = logoSectionOptions();
// Inserting event on inputs
logoOptions.forEach((elem) => {
  if (elem.checked) {
    globalLogoSrc = elem.nextElementSibling.src; // Load default input checked
  }
  elem.addEventListener("click", () => {
    oneCheckboxOption(elem, logoOptions);
    globalLogoSrc = elem.nextElementSibling.src;
  });
});

// -- Section user text --
const inputUserText = selector("[userText]");
inputUserText.addEventListener("input", () => {
  if (inputUserText.value.length > 15) {
    inputUserText.value = inputUserText.value.substring(15, 0);
  }
  globalUserText = inputUserText.value.toUpperCase();
});

// -- Section Generate --
const generateBtn = selector("[generate]");
const generateProgress = selector("footer[actions] > progress");
const downloadLink = selector("[download]");
generateBtn.addEventListener("click", async () => {
  generateBtn.style.display = "none";
  generateProgress.style.display = "flex";

  const dataBg = await fileBlob(globalBackgroundSrc);
  const dataLogo = await fileBlob(globalLogoSrc);
  const result = await api(dataBg, dataLogo, globalFullText);

  generateBtn.style.display = "block";
  generateProgress.style.display = "none";

  let { status } = result;

  if (status !== 200) {
    alert("Erro!");
    return console.error("Error", result);
  }

  downloadLink.href = await result.json();
  downloadLink.click();
});

// -- Section preview --
const previewBg = selector("[previewBg]");
const previewText = selector("[previewText]");
const previewLogo = selector("[previewLogo]");

// -- Refresh preview img --
function refreshPreview() {
  globalFullText = `${globalComplementText} ${globalUserText}`;

  previewText.innerText = globalFullText;
  previewLogo.src = globalLogoSrc;
  previewBg.src = globalBackgroundSrc;
}
