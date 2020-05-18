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
