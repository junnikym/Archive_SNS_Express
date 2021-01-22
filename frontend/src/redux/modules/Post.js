const SAVE_TOKEN 	= "SAVE_TOKEN";

function createPost(title, text, img) {
    return (dispatch, getState) => {
        const { account : { token }} = getState();

	// return dispatch => {
		
		fetch("/feed", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${token}`
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

const actionCreators = {
	createPost,
};

export { actionCreators };

export default reducer;