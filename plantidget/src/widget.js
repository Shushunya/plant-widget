import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

document.addEventListener("DOMContentLoaded", () => {

  // close button event listener
  const closeBtn = document.getElementById("close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      appWindow.close();
    });
  }
});