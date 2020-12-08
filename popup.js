jobEmailsFilter = {
 init: function()  {
    return this.execute();
 },
 execute: function() {
    this.runEmailsScript();
 },
 runEmailsScript() {
    return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "getmails.js" });
    });
 }
}

const getUpdateBtn = function () {
   return document.getElementById('updateBtn');
}

getUpdateBtn().onclick = function (){
    jobEmailsFilter.init();
}

