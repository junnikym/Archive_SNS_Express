
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
        if(userInfo.userID == "" || userInfo.userPW == "" || userInfo.userPW2 == "" || userInfo.userName == "" || userInfo.userEmail == ""){
            if(userInfo.userPW.value != userInfo.userPW2.value)
            {
                return 1;
            }
            else return 1;
        }
        else
        {
            return 0;
        }
    }
}