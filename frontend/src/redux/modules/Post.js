
// < Actions >
// --------------------------------------------------

const GET_POST_LIST = "GET_POST_LIST";
const SAVE_NEW_POST = "SAVE_NEW_POST";

// < Actions Creators >
// --------------------------------------------------

function getPostList(data) {
	return {
		type: GET_POST_LIST,
		data
	}
}

function saveNewPost(data) {
	return {
		type: SAVE_NEW_POST,
		data
	}
}

// < API Actions >
// --------------------------------------------------

<<<<<<< HEAD
function createPost(title, text_content, url) {
=======
function createPost(data) {
>>>>>>> origin/hj

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post/create", {
			method: "post",
			headers: {
				Authorization: `${AccessToken}`
			},
<<<<<<< HEAD
			body: JSON.stringify({
				title 			: title,
				text_content	: text_content,
				url				: url,
			})
=======
			body: data
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(saveNewPost(json.data));
			}
>>>>>>> origin/hj
		})
		.catch(err => console.log(err));
    };
    
};

function postList(offset, limit, order_by) {

	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/post/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
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
	new_post_count : 0,
	post_list : []
}

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_NEW_POST:
			return applySaveNewPost(state, action);

		case GET_POST_LIST:
			return applyGetPostList(state, action);
		
		default:
			return state;
	}
}

function applySaveNewPost(state, action) {
	
	const { data } = action;


	return  {
		...state,
		new_post_count : (state.new_post_count+1)
	}
}
            
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