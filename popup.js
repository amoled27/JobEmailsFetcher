jobEmailsFilter = {
 init: function()  {
    console.log('1')
    return this.execute();
 },
 execute: function() {
   console.log('2')
    this.executeEmailGetterScript();
 },
 executeEmailGetterScript() {
  console.log('getmails1');
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

