
// const SAVE_TOKEN 	= "SAVE_TOKEN";

// function saveToken(token) {
// 	return {
// 		type: SAVE_TOKEN,
// 		token
// 	};
// }

// function createFeed(text, file) {
// 	return dispatch => {
		
// 		fetch("/rest-auth/registration/", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify({
// 				"text"		: text,
// 				"file"	: file,
// 			})
// 		})
// 		.then(response => response.json())
// 		.then(json => {
// 			if (json.token) {
// 				dispatch(saveToken(json.token));
// 			}
// 		})
// 		.catch(err => console.log(err));
// 	};

// const initState = {
// 		isLoggedIn: localStorage.getItem("jwt") ? true : false,
// 		token: localStorage.getItem("jwt")
// };

// function reducer(state = initState, action) {
// 	switch(action.type) {
// 		case SAVE_TOKEN:
// 			return applySetToken(state, action);
// 		default:
// 			return state;
// 	}
// }

// function applySetToken(state, action) {
// 	const { token } = action;
// 	localStorage.setItem("jwt", token);

// 	console.log("set token called");

// 	return {
// 		...state,
// 		isLoggedIn	: true,
// 		token		: token
// 	};
// }

// const actionCreators = {
// 	createFeed,
// };

// export { actionCreators };

// export default reducer;