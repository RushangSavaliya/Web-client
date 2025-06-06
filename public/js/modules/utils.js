// js/modules/utils.js

export function showMessage(el, text, type = "error") {
  if (!el) {
    alert(text); // fallback
    return;
  }
  el.textContent = text;
  el.className = type;
}
