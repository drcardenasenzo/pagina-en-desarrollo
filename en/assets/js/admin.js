(function () {
  const access = document.getElementById("adminAccess");
  const panel = document.getElementById("adminPanel");
  const toast = document.getElementById("toast");
  if (!access || !panel) return;

  const ADMIN_PIN = "4405";
  const show = (message, error = false) => {
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = error ? "#fee2e2" : "#dcfce7";
    toast.style.color = error ? "#991b1b" : "#166534";
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 4500);
  };

  window.openEnglishAdmin = function (event) {
    event?.preventDefault();
    access.style.display = "flex";
    access.querySelectorAll("input").forEach((input) => { input.value = ""; });
    access.querySelector("input")?.focus();
  };

  const pins = [...access.querySelectorAll("input")];
  const validate = () => {
    if (pins.map((input) => input.value).join("") === ADMIN_PIN) {
      access.style.display = "none";
      panel.style.display = "flex";
      return;
    }
    access.style.display = "none";
    show("Incorrect PIN.", true);
  };

  pins.forEach((input, index) => input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && pins[index + 1]) pins[index + 1].focus();
    if (pins.every((pin) => pin.value)) validate();
  }));

  document.getElementById("adminEnter")?.addEventListener("click", validate);
  document.getElementById("adminCloseAccess")?.addEventListener("click", () => { access.style.display = "none"; });
  document.getElementById("adminClosePanel")?.addEventListener("click", () => { panel.style.display = "none"; });
  document.getElementById("adminSend")?.addEventListener("click", () => {
    show("English offline conversion sheet is not connected. No information was sent.");
  });
})();
