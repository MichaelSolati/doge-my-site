import { GIPHY_KEY } from './keys';

document.getElementById('clickme').addEventListener('click', () => {
  chrome.tabs.executeScript({ code: `GIPHY_KEY = '${GIPHY_KEY}'` }, () => {
    chrome.tabs.executeScript({ file: 'images.js' });
  });
  chrome.tabs.executeScript({ file: 'text.js' });
  chrome.tabs.insertCSS({ file: 'style.css' });
});