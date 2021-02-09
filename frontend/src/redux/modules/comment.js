
// < Actions >
// --------------------------------------------------

const GET_COMMENT_LIST = "GET_COMMENT_LIST";

// < Actions Creators >
// --------------------------------------------------

function getCommentList(data) {
	return {
		type: GET_COMMENT_LIST,
		data
	}
}

// < API Actions >
// --------------------------------------------------


function createComment(comment) {

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/comment/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				content     : comment
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

function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_COMMENT_LIST:
			return applyGetCommentList(state, action);
		default:
			return state;
	}
}

// < Reducer FunctioPostAct.createPost(title, text, img));
            
function applyGetCommentList(state, action) {

	const { data } = action;

	return {
		...state,
		comment_list : data
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	createComment,
	getCommentList
};

export { actionCreators };

export default reducer;