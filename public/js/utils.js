// public/js/utils.js

export function showMessage(el, text, type = "error") {
  el.textContent = text;
  el.className = type;
}
