export function showSnackbar(message, type = "info", duration = 3000) {
  const existing = document.querySelector(".snackbar");
  if (existing) existing.remove();

  const snackbar = document.createElement("div");
  snackbar.className = `snackbar ${type}`;
  snackbar.textContent = message;
  document.body.appendChild(snackbar);

  void snackbar.offsetWidth;
  snackbar.classList.add("show");

  setTimeout(() => {
    snackbar.classList.remove("show");
    setTimeout(() => snackbar.remove(), 400);
  }, duration);
}