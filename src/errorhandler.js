import * as loading from './loading.js';

window.onerror = function (msg, url, line, col, error) {
  const column = col || 'Unknown';
  const message = `
  ${msg}
  File: ${url}
  Where: Ln ${line}, Col ${column}
  ${error ? error : ''}`;
  errorPage(message);

  return true;
};

window.onunhandledrejection = function (error) {
  errorPage(error.reason.message);
  return true;
};

function errorPage(errorMessage) {
  let main = document.querySelector('.main-content');
  main.innerHTML = `
  <div style="display: flex; justify-content: center; align-items: center; text-align: center; min-height: 100vh;">
    Encountered an error:<br>
    ${errorMessage.replace(/\n/g, '<br>')}<br>
    please try reloading after a few minutes.<br>
    If the error persists please report it to one of the developers
  </div>
  `;
  main.classList.remove('hide');
  loading.stop();
}
