if (document.getElementById('clickme')) {
  document.getElementById('clickme').addEventListener('click', () => {
    chrome.tabs.executeScript({ file: 'images.js' });
    chrome.tabs.executeScript({ file: 'text.js' });
    chrome.tabs.executeScript({ file: 'style.js' });
  });
}