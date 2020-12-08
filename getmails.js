
getEmails = {
    config: {
        filterText: 'jobs'
    },
    executionFlag: true,
    emailIndex: 0,
    unreadEmailsArr: [],
    allUnreadEmailData: [],
    init: function () {
        this.execute();
    },
    execute: function () {
        this.getAllUnreadEmails();
        //iterating through raw email data
        while (this.emailIndex < this.allUnreadEmailData.length) {
            let emailData = {
                subject: this.getEmailSubject(),
                name: this.getSenderName()
            }
            this.unreadEmailsArr.push(emailData);
            this.emailIndex++;
        }
        this.addFilteredEmailsToStorage(this.filterEmails());
    },
    //get unreademails raw data
    getAllUnreadEmails: function () {
        this.allUnreadEmailData = document.querySelectorAll('.zA.zE');
    },
    //filter the emails from the emails array as per string
    filterEmails: function () {
        let that = this;
        return this.unreadEmailsArr.filter(email => {
            if (email.subject.toLowerCase().indexOf(that.config.filterText) > -1) { return email };
        })
    },
    //get email subject using query selector
    getEmailSubject: function () {
        return this.allUnreadEmailData[this.emailIndex].querySelector('.xY.a4W .xS .xT .y6 .bog .bqe').innerText;
    },
    //get email sendername using query selector
    getSenderName: function () {
        return this.allUnreadEmailData[this.emailIndex].querySelector('.yX.xY .yW .bA4 .zF').innerText;
    },
    //increment emails index to loop through the mails
    emailIndexIncrement() {
        return this.emailIndex++;
    },
    //decrement emails index 
    emailIndexDecrement() {
        return this.emailIndex--;
    },
    //add final filtered data to the chrome storage
    addFilteredEmailsToStorage(filteredEmails) {
        let that = this;
        chrome.storage.sync.set({ filteredEmails: filteredEmails }, function () {
            console.log('Added to storage');
            that.onExecutionEnd();
        });
    },
    //on execution end to set the execution flag to false
    onExecutionEnd() {
        chrome.storage.sync.set({ executionFlag: true }, function () {
            console.log('flag set');
        });
    }
}

getEmails.init();