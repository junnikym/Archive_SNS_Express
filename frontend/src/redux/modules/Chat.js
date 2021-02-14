
// < Actions >
// --------------------------------------------------

const ADD_CHAT_CONTENTS = "ADD_CHAT_CONTENTS";

// < Actions Creators >
// --------------------------------------------------

function AddMessage(data) {
	
	return {
		type: ADD_CHAT_CONTENTS,
		data
	};
}

// < API Actions >
// --------------------------------------------------

function sandChatMessage(group_pk, content) {
	return (dispatch, getState) => {

		const { account : { AccessToken }} = getState();

		fetch("/chat/sendmsg", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				group_pk: group_pk,
				content: content,
			})
		})
		.then(res => {
			if(res.status == 200)
				return res.json()

			// @TODO : false -> work what
		})
		.then(json => dispatch(AddMessage(json.data)) )
		.catch(err => console.log(err));
	};
}

function getChatContents(group_pk) {
	return (dispatch, getState) => {
		
		const { account : { AccessToken }} = getState();

		fetch("/chat/"+group_pk, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			}
		})
		.then(res => {
			if(res.status == 200)
				return res.json()

			// @TODO : false -> work what
		})
		.then(json => dispatch(AddMessage(json.data)) )
		.catch(err => console.log(err));
	};
}

// < Initial State >
// --------------------------------------------------

const initialState = {
	current_chat_contents: []
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case ADD_CHAT_CONTENTS:
			return applyNewChatContents(state, action);
		
		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applyNewChatContents(state, action) {
	return {
		...state,
		current_chat_contents : state.current_chat_contents.concat(action.data)
	};
}

// function getChatContents(state, action) {

// 	return {
// 		isLoggedIn: false,
// 		AccessToken: undefined,
// 		RefreshToken: undefined,
// 		PK: undefined
// 	};
// }

// < Exports >
// --------------------------------------------------

const actionCreators = {
	sandChatMessage,
	getChatContents
};

export { actionCreators };

// export reducer by default

export default reducer;