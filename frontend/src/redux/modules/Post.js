function createPost(title, text, img) {
	console.log("run");

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		console.log("it runing : ", text);
		
		fetch("/feed", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				title 	: title,
				content	: text,
				img		: img,
			})
		})
		.catch(err => console.log(err));
    };
    
};

// < Initial State >
// --------------------------------------------------

const initialState = {
}

// < Reducer >
// --------------------------------------------------

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