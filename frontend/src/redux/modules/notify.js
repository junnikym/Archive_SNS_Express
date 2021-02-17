
// < Actions >
// --------------------------------------------------

const ADD_CHAT_NOTIFY = "ADD_CHAT_NOTIFY";

// < Actions Creators >
// --------------------------------------------------

function AddChatNotify(data) {

	return {
		type: ADD_CHAT_NOTIFY,
		data
	};

}

// < API Actions >
// --------------------------------------------------


// < Initial State >
// --------------------------------------------------

const initialState = {
	chat: [],
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		case ADD_CHAT_NOTIFY:
			return applyNewchatNotify(state, action);

		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

function applyNewchatNotify(state, action) {
	return {
		...state,
		chat: state.chat.concat([action.data])
	}
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	AddChatNotify
};

export { actionCreators };

// export reducer by default

export default reducer;