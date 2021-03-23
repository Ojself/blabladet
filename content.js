// last updated 23.03.21
const dillDallClassNames = ["breaking--pulsating-dots", "breaking--just-now", "breaking--pulse-kicker", "pulse", "breaking-dots"]
const bgColors = ["bg-red", "bg-yellow", "bg-black"]
const fontColors = ["text-red"]

const removeClassnames = (className) => {
    const domElements = document.querySelectorAll(`.${className}`)
    for (const dillDall of domElements){
        dillDall.classList.remove(className);
    }
}

const easterMode = () => {
    const articles = document.querySelectorAll("article")
    for (const article of articles){
        article.classList.add("bg-yellow");
    }
}

const removeDillDall = () => {
    dillDallClassNames.forEach(className=> {
        removeClassnames(className)
    })
}

const removeBgColors = () => {
    bgColors.forEach(className=> {
        removeClassnames(className)
    })
}

const removeFontColors = () => {
    fontColors.forEach(className=> {
        removeClassnames(className)
    })
}

//message listener for background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    /* Todo, fix here. Better messaging system */
    if(request.command === 'init'){
        removeDillDall( )
    }else{
        location.reload()
    }
    sendResponse({result: "success!"});
});

//on init perform based on chrome stroage value
window.onload = () => {  
    chrome.storage.sync.get('hideDillDall', (data) => {
        if(data.hideDillDall){
            removeDillDall();
        } 
    });
}