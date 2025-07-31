async function fetchAndStoreNounList() {
  try {
    const response = await fetch(
      'https://www.desiquintans.com/downloads/nounlist/nounlist.txt',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch noun list.');
    }
    const nounList = await response.text();
    await chrome.storage.local.set({nounList});
  } catch (error) {
    console.error('Error fetching or storing noun list:', error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  void fetchAndStoreNounList();
});

chrome.action.onClicked.addListener(tab => {
  if (tab.id) {
    void chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['images.js'],
    });
    void chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['text.js'],
    });
    void chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['style.js'],
    });
  }
});
