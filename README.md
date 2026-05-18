# PDF Fetch — Chrome Extension

A lightweight Chrome extension that automatically detects PDFs loaded in your browser and lets you download them instantly with a single click.

---

## Project Structure

```
PDF-Fetch/
├── background.js      # Service worker: detects PDF via response headers
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic: triggers download via chrome.downloads API
├── manifest.json      # Extension manifest (Manifest V3)
└── icon.png           # Extension icon
```

---

## Installation (Load Unpacked)


1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/vishnuuuvrdn/PDF-Fetch.git
   ```

2. Open **Google Chrome** and navigate to:
   ```
   chrome://extensions
   ```

3. Enable **Developer mode** (toggle in the top-right corner).

4. Click **"Load unpacked"** and select the project folder.

5. The 📄 PDF Downloader icon will appear in your Chrome toolbar.

---

## How It Works

1. **Background Service Worker (`background.js`)**
   - Listens to all HTTP/HTTPS responses via `chrome.webRequest.onHeadersReceived`
   - Checks if the `Content-Type` response header contains `application/pdf`
   - If a PDF is detected, its URL is saved to `chrome.storage.local`
   - On every new page load (`chrome.tabs.onUpdated`), the stored URL is cleared to prevent stale data

2. **Popup (`popup.js` + `popup.html`)**
   - When the user clicks the extension icon, the popup reads `pdfUrl` from `chrome.storage.local`
   - If a URL is found, `chrome.downloads.download()` is triggered immediately
   - Status messages inform the user whether the download started successfully or failed

---

## Permissions

| Permission | Reason |
|---|---|
| `webRequest` | Inspect HTTP response headers to detect PDF content |
| `downloads` | Trigger file downloads programmatically |
| `storage` | Temporarily store the detected PDF URL |
| `tabs` | Clear stored URL when a new page starts loading |
| `host_permissions` (`http://*/*`, `https://*/*`) | Monitor requests across all websites |

---

## Tech Stack

- **Manifest V3** — Latest Chrome extension platform
- **Chrome Extensions API** — `webRequest`, `downloads`, `storage`, `tabs`
- **Vanilla JavaScript** — No external dependencies
- **HTML / CSS** — Pure native popup UI

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- Icon sourced from [Flaticon](https://www.flaticon.com)
- Built using the [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/) platform
