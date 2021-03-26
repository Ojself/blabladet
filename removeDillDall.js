const dillDallCheck = document.getElementById('dillDallCheck');
const bgColorCheck = document.getElementById('bgColorCheck');
const easterModeCheck = document.getElementById('easterModeCheck');

const chromeStorageNames = {
  "hideDillDall": dillDallCheck,
  "hideBgColor": bgColorCheck,
  "easterMode":easterModeCheck
}

//on init update the UI checkbox based on storage
Object.keys(chromeStorageNames).forEach(name=> {
  chrome.storage.sync.get(name, (data) => {
   if (data[name]){
    chromeStorageNames[name].checked = true
   }
  });
})


Object.entries(chromeStorageNames).forEach(([name, popDomElement])=> {
  popDomElement.onchange =  (event) => {
    const checked = event.target?.checked || false
     chrome.storage.sync.set({ [name]: checked }, () => console.log(`${name} ${checked}`));
     sendMessage({[name]: checked})
   };

  })

// Broadcast message
const sendMessage = (target) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, target, (response) => console.log('response: ',response));
    });
}