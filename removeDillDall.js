const dillDallCheck = document.getElementById('dillDallCheck');
const bgColorCheck = document.getElementById('bgColorCheck');
const blackFontCheck = document.getElementById('blackFontCheck');
const easterModeCheck = document.getElementById('easterModeCheck');

const allCheckBoxes = []


//on init update the UI checkbox based on storage
chrome.storage.sync.get('hideDillDall', (data) => {
    dillDallCheck.checked = data.hideDillDall;
});

chrome.storage.sync.get('hideBgColor', (data) => {
  bgColorCheck.checked = data.hideBgColor;
});

chrome.storage.sync.get('hideFontColor', (data) => {
  blackFontCheck.checked = data.hideFontColor;
});

chrome.storage.sync.get('easterMode', (data) => {
  easterModeCheck.checked = data.easterMode;
});

bgColorCheck.onchange =  (event) => {
  const hideDillDall = event.target?.checked || false
  chrome.storage.sync.set({ hideDillDall }, () => console.log('Hide dilldall: '+ hideDillDall));
  
  
  if (hideDillDall) {
    sendMessage("init", hideDillDall)
  } else {
    sendMessage("reload", hideDillDall)
  }
};



bgColorCheck.onchange =  (event) => {
  const hideBgColor = event.target?.checked || false
  chrome.storage.sync.set({ hideBgColor }, () => console.log('Hide Background color: '+ hideBgColor));

  if (hideBgColor) {
    sendMessage("init", hideBgColor)
  } else {
    sendMessage("reload", hideBgColor)
  }
};

//Pass init or remove message to content script 
const sendMessage = (command, hideDillDall) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {command, hideDillDall}, (response) => console.log('response: ',response));
    });
}