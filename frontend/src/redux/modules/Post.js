
import { actionCreators as accountAct } from "./account";

// < Actions >
// --------------------------------------------------

const GET_POST_LIST = "GET_POST_LIST";

// < Actions Creators >
// --------------------------------------------------

function getPostList(data) {
	return {
		type: GET_POST_LIST,
		data
	}
}

// < API Actions >
// --------------------------------------------------

function createPost(title, text, img) {

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post/create", {
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

function postList(offset, limit, order_by) {

	return (dispatch, getState) => {
		// const { account : { AccessToken }} = getState();
		
		fetch("/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
				// Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				offset 	: offset,
				limit	: limit,
				order_by: order_by,
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch(getPostList(json.data));
			}
		})
		.catch(err => console.log(err));
    };

}

// < Initial State >
// --------------------------------------------------

const initialState = {
}

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_POST_LIST:
			return applyGetPostList(state, action);
		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applyGetPostList(state, action) {

	const { data } = action;

	return {
		...state,
		post_list : data
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	createPost,
	postList
};

export { actionCreators };

export default reducer;