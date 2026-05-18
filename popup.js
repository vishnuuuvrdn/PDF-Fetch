document.getElementById("downloadBtn").addEventListener("click", async () => {
  const msg = document.getElementById("statusMsg");
  const data = await chrome.storage.local.get("pdfUrl");

  if (!data.pdfUrl) {
    msg.textContent = "No PDF detected yet";
    msg.className = "error";
    return;
  }

  chrome.downloads.download({ url: data.pdfUrl }, (downloadId) => {
    if (downloadId) {
      msg.textContent = "Download Started!";
      msg.className = "success";
    } else {
      msg.textContent = "Download Failed! Try Again.";
      msg.className = "error";
    }
  });
});
