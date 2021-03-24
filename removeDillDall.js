const dillDallCheck = document.getElementById('dillDallCheck');
const bgColorCheck = document.getElementById('bgColorCheck');
const blackFontCheck = document.getElementById('blackFontCheck');
const easterModeCheck = document.getElementById('easterModeCheck');

const chromeStorageNames = ["hideDillDall", "hideBgColor", "hideFontColor", "easterMode"]

//on init update the UI checkbox based on storage
chromeStorageNames.forEach(name=> {
  chrome.storage.sync.get(name, (data) => {
    [name].checked = data[name];
  });
})

// not very DRY .. 
dillDallCheck.onchange =  (event) => {
 const hideDillDall = event.target?.checked || false
  chrome.storage.sync.set({ hideDillDall }, () => console.log('Hide dilldall: '+ hideDillDall));
  sendMessage({hideDillDall})
};

bgColorCheck.onchange =  (event) => {
 const hideBgColor = event.target?.checked || false
  chrome.storage.sync.set({ hideBgColor }, () => console.log('Hide Background color: '+ hideBgColor));
  sendMessage({hideBgColor})
  
};

blackFontCheck.onchange =  (event) => {
 const hideFontColor = event.target?.checked || false
  chrome.storage.sync.set({ hideFontColor }, () => console.log('Hide Background color: '+ hideFontColor));
  sendMessage({hideFontColor})
};

easterModeCheck.onchange =  (event) => {
 const easterMode = event.target?.checked || false
  chrome.storage.sync.set({ easterMode }, () => console.log('Hide Background color: '+ easterMode));
  sendMessage({easterMode})
};

//Pass init or remove message to content script 
const sendMessage = (target) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, target, (response) => console.log('response: ',response));
    });
}