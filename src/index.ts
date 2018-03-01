document.getElementById('clickme').addEventListener('click', () => {
  chrome.tabs.executeScript({ file: 'images.js' });
  chrome.tabs.executeScript({ file: 'text.js' });
  chrome.tabs.insertCSS({ file: 'style.css' });
});