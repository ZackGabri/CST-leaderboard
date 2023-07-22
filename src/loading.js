const loadingContainer = document.querySelector('.loading-container');

export function start() {
  loadingContainer.classList.remove('hide');
}

export function stop() {
  loadingContainer.classList.add('hide');
}
