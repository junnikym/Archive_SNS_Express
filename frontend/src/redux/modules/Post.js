const SAVE_TOKEN 	= "SAVE_TOKEN";

function createPost(title, text, img) {
    return (dispatch, getState) => {
        const { account : { token }} = getState();

	// return dispatch => {
		
		fetch("/feed", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"title" : title,
				"text"	: text,
				"img"	: img,
			})
		})
        .then(response => response.json())
        
		.catch(err => console.log(err));
    };
    
};

function reducer(state = null, action) {
	switch(action.type) {
		
		default:
			return state;
	}
}

function applySetToken(state, action) {
	const { token } = action;
	localStorage.setItem("jwt", token);

	console.log("set token called");

	return {
		...state,
		isLoggedIn	: true,
		token		: token
	};
}

const actionCreators = {
	createPost,
};

export { actionCreators };

export default reducer;