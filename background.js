chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({hideDillDall : true}, () => {
    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.dagbladet.no'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });