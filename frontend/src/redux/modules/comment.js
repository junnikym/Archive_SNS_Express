// < Actions >
// --------------------------------------------------

const GET_COMMENT_LIST = "GET_COMMENT_LIST";
const SAVE_NEW_COMMENT = "SAVE_NEW_COMMENT";

// < Actions Creators >
// --------------------------------------------------

function getCommentList(data) {
	return {
		type: GET_COMMENT_LIST,
		data
	}
}

function saveNewComment(data) {
	return {
		type: SAVE_NEW_COMMENT,
		data
	}
}

// < API Actions >
// --------------------------------------------------


function createComment(post_pk, comment) {

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/comment/commentCreate", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				post_pk		: post_pk,
				content     : comment
			})
		})
		.then(res => res.json())
		.then(json => {
			if (json.data) {
				dispatch(saveNewComment([json.data]));
			}
		})
		.catch(err => console.log(err));
    };
    
};

function commentList(post_pk, offset, limit, order_by) {

	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/comment/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
                post_pk : post_pk,
				offset 	: offset,
				limit	: limit,
				order_by: order_by,
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.data) {
				dispatch(saveNewComment(json.data));
			}
		})
		.catch(err => console.log(err));
    };

}

// < Initial State >
// --------------------------------------------------

const initialState = {
	comment_list : [
		// {
		// 	post_pk	: "",
		// 	comments: []
		// },
		// {
		// 	post_pk	: "",
		// 	comments: []
		// },
		// {
		// 	post_pk	: "",
		// 	comments: []
		// }
	]
}

// const comments_in_post = {
// 	post_pk	: "",
// 	comments: []
// }

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case SAVE_NEW_COMMENT:
			return applySaveNewComment(state, action);

		case GET_COMMENT_LIST:
			return applyGetCommentList(state, action);
		default:
			return state;
	}
}

function applySaveNewComment(state, action) {

	console.log(action.data);
	
	const {data} = action;
	const post_pk = data[0]?.post_pk;
	const { comment_list } = state;

	let i = 0;
	for( i = 0; i < comment_list.length; i++ ) {

		if( comment_list[i].post_pk === post_pk ) {
			comment_list[i].comments.concat(data);
			break;
		}
		
	}
	if(i == comment_list.length) {
		comment_list.push({
			post_pk: post_pk,
			comments: data
		})
	}

	return {
		...state,
		comment_list
	}
}
            
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
	commentList
};

export { actionCreators };

export default reducer;