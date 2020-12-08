getEmails = {
    config: {
        filterText: 'jobs'
    },
    emailIndex: 0,
    unreadEmailsArr: [],
    allUnreadEmailData: [],
    init: function () {
        this.execute();
    },
    execute: function () {
        this.getAllUnreadEmails();
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
    getAllUnreadEmails: function () {
        this.allUnreadEmailData = document.querySelectorAll('.zA.zE');
    },
    filterEmails: function () {
        let that = this;
        return this.unreadEmailsArr.filter(email => {
            if (email.subject.toLowerCase().indexOf(that.config.filterText) > -1) { return email };
        })
    },
    getEmailSubject: function () {
        return this.allUnreadEmailData[this.emailIndex].querySelector('.xY.a4W .xS .xT .y6 .bog .bqe').innerText;
    },
    getSenderName: function () {
        return this.allUnreadEmailData[this.emailIndex].querySelector('.yX.xY .yW .bA4 .zF').innerText;
    },
    emailIndexIncrement() {
        return this.emailIndex++;
    },
    emailIndexDecrement() {
        return this.emailIndex--;
    },
    addFilteredEmailsToStorage(filteredEmails) {
        chrome.storage.sync.set({ filteredEmails: filteredEmails }, function () {
            console.log('Added to storage');
        });
    }
}

getEmails.init();