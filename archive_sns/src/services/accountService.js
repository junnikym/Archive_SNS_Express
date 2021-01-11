module.exports = {
    feedAccount:(feedInfo) => {
        if(feedInfo.userID == "" || feedInfo.userName == "" || feedInfo.title == "" || feedInfo.content == "" || 
        feedInfo.time == "" || feedInfo.file_name == "" || feedInfo.file_type == "" || feedInfo.file_copied == "")
        {
            return 1;
        }
        return 0;
    },

    usersignUp:(userInfo) => {
        // Check paasword confirm
        if(userInfo.userPW.value != userInfo.userPW2.value) {
            return error("different passward and password confirm");
        }

        return true;
        // return CreateAccount(userInfo.userID, userInfo.userPW, userInfo.userName, userInfo.userEmail);
    }
}