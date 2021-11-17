// last updated 24.03.21
const dillDallClassNames = ["breaking--pulsating-dots", "breaking--just-now","breaking--just-now-wave", "breaking--pulse-kicker", "pulse", "breaking-dots", "text-red", "breaking--dbavslorer"]
const bgColors = ["bg-red", "bg-yellow", "bg-black"]

const chromeStorageNames = ["hideDillDall", "hideBgColor", "easterMode"]

const removeClassnames = (className) => {
    const domElements = document.querySelectorAll(`.${className}`)
    for (const dillDall of domElements){
        dillDall.classList.remove(className);
    }
}

const hideDillDall = () => {
    dillDallClassNames.forEach(className=> {
        removeClassnames(className)
    })
}

const hideBgColors = () => {
    bgColors.forEach(className=> {
        removeClassnames(className)
    })
}

const activateEasterMode = () => {
    const articles = document.querySelectorAll("article")
    for (const article of articles){
        article.classList.add("bg-yellow");
    }
}

//message listener for background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const [cmd,value] = Object.entries(request)[0]
    // User has deactivated a feature and page will reload
    if (!value)return location.reload()
    executeCommand(cmd)
    sendResponse({result: "success!"});
});

//on init perform based on chrome stroage value
window.onload = () => {  
    chromeStorageNames.forEach(name=> {
        chrome.storage.sync.get(name, (data) => {
            const [cmd,value] = Object.entries(data)[0]
            if (!value)return 
            executeCommand(cmd)
        });
    })  
}

const executeCommand = (cmd) => {
    switch (cmd) {
        case "hideDillDall":
            hideDillDall()    
            break;
        case "hideBgColor":
            hideBgColors()
            break;
        case "easterMode":
            activateEasterMode()    
            break;
        default:
            console.error("oops")
        break;
    }
}