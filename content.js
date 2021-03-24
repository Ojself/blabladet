// last updated 23.03.21
const dillDallClassNames = ["breaking--pulsating-dots", "breaking--just-now", "breaking--pulse-kicker", "pulse", "breaking-dots"]
const bgColors = ["bg-red", "bg-yellow", "bg-black"]
const fontColors = ["text-red"]

const chromeStorageNames = ["hideDillDall", "hideBgColor", "hideFontColor", "easterMode"]

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

const hideFontColors = () => {
    fontColors.forEach(className=> {
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
    if (!value)return location.reload()
    findCommand(cmd)
    sendResponse({result: "success!"});
});

//on init perform based on chrome stroage value
window.onload = () => {  
    chromeStorageNames.forEach(name=> {
        chrome.storage.sync.get(name, (data) => {
            const [cmd,value] = Object.entries(data)[0]
            if (!value)return 
            findCommand(cmd)
        });
    })  
}

const findCommand = (cmd) => {
    switch (cmd) {
        case "hideDillDall":
            hideDillDall()    
            break;
        case "hideBgColor":
            hideBgColors()
            break;
        case "hideFontColor":
            hideFontColors()    
            break;
        case "easterMode":
            activateEasterMode()    
            break;
        default:
            console.error("oops")
        break;
    }
}