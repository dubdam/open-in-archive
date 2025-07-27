const isHttpUrl = url => /^(https?:\/\/)/i.test(url);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-in-archive",
    title: "Abrir en archive.ph",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "open-in-archive") return;
  const { linkUrl } = info;
  if (!linkUrl || !isHttpUrl(linkUrl)) return;            // ignore mailto:, javascript:, etc.

  const archiveUrl =
    "https://archive.ph/submit/?url=" + encodeURIComponent(linkUrl);

  chrome.tabs.create({ url: archiveUrl, index: tab.index + 1 });
});
