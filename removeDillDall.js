const dillDallCheck = document.getElementById('dillDallCheck');


//on init update the UI checkbox based on storage
chrome.storage.sync.get('hideDillDall', (data) => {
    dillDallCheck.checked = data.hide;
});

dillDallCheck.onchange =  (event) => {
    
    
  const hideDillDall = event.target?.checked || false
  console.log(hideDillDall, "hideDillDall")
  //update the extension storage value
  chrome.storage.sync.set({ hideDillDall }, () => console.log('Hide dilldall: '+ hideDillDall));
  
console.log("here!")
  
  if (hideDillDall) {
      console.log("if is true")
    sendMessage("init", hideDillDall)
  } else {
    sendMessage("remove", hideDillDall)
  }
};

//Pass init or remove message to content script 
const sendMessage = (command, hideDillDall) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {command, hideDillDall}, (response) => {
            console.log('response: ',response);
        });
    });
}