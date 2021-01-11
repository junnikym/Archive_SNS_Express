/**
 * 유효성 검사
 */

module.exports = {
    /**
     * 피드 작성 유효성 검사
     */
    feedAccount:(feedInfo) => {     
        if(feedInfo.pageNum > 0)
        {
            return false;
        }
        return true;
    },

    /**
     * 회원가입 유효성 검사
     */
    usersignUp:(userInfo) => {
        // Check password confirm
        if(userInfo.userPW.value != userInfo.userPW2.value) {
            return error("different passward and password confirm");
        }

        return true;
        // return CreateAccount(userInfo.userID, userInfo.userPW, userInfo.userName, userInfo.userEmail);
    }
}