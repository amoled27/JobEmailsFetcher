jobEmailsFilter = {
   init: function () {
      return this.execute();
   },
   execute: function () {
      this.runEmailsScript();
      // localStorage.setItem('executeFlag', 'pending');
      executionFlag = true;
      this.checkForEmailScriptCompletion();
   },

   //run script to get filtered mails from gmail
   runEmailsScript() {
      return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
         chrome.tabs.executeScript(tabs[0].id, { file: "getmails.js" });
      });
   },

   //get update button
   getUpdateBtn: function () {
      return document.getElementById('updateBtn');
   },

   //render the emails in chrome pop up
   displayEmailsInPopUp: function (filteredEmailData) {
      this.filteredEmailData.forEach(email => {
         let emailElement = `<div class="email">
                  <p id="sender">${email.name}</p>
                  <p id="subject">${email.subject}</p>
                  </div>`;
         this.getPopUpElmentForRendring().innerHTML += emailElement + `</br>`;

      });
   },

   //get element in HTML to render the list
   getPopUpElmentForRendring: function () {
      return document.getElementById('emailsList');
   },

   //get emails from storage
   getEmailsFromStorage: function() {
      let that = this;
      chrome.storage.sync.get(['filteredEmails'], function (res) {
         that.displayEmailsInPopUp(res.filteredEmails);
     });
   },

   //check for execution completion of email script
   checkForEmailScriptCompletion: function() {
      // while(1){
         if (this.checkExectionFlagInStorage()) {
            this.getEmailsFromStorage();
            break;
         }
      // }
   },
   checkExectionFlagInStorage: function() {
      return chrome.storage.sync.get(['executionFlag'], function (res) {
        return res.executionFlag;
     });
   }
}

//listent to onlick of Updatebtn
jobEmailsFilter.getUpdateBtn().onclick = function () {
   jobEmailsFilter.init();
}


