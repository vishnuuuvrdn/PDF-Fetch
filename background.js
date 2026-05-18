chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    chrome.storage.local.remove("pdfUrl");
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  async (details) => {
    const isPdf = details.responseHeaders.some(
      (header) =>
        header.name.toLowerCase() === "content-type" &&
        header.value.includes("application/pdf"),
    );

    if (isPdf) {
      await chrome.storage.local.set({
        pdfUrl: details.url,
      });

      console.log("PDF detected:", details.url);
    }
  },
  {
    urls: ["https://*/*", "http://*/*"],
  },
  ["responseHeaders", "extraHeaders"],
);
