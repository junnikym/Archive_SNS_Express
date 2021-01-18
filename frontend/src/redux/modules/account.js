
// < Actions >
// --------------------------------------------------

const SAVE_TOKEN 	= "SAVE_TOKEN";
const LOGOUT 		= "LOGOUT";

// < Actions Creators >
// --------------------------------------------------

function saveToken(token) {
	return {
		type: SAVE_TOKEN,
		token
	};
}

function logout() {
	return {
		type: LOGOUT
	};
}

// < API Actions >
// --------------------------------------------------

function defaultLogin(email, password) {
	return dispatch => {
		fetch("/rest-auth/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.token) {
				dispatch(saveToken(json.token));
			}
		})
		.catch(err => console.log(err));
	};
}

function createAccount(email, pw, confirm_pw, img, alias) {
	return dispatch => {
		
		fetch("/rest-auth/registration/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email"		: email,
				"password1"	: pw,
				"password2"	: confirm_pw,
				// profile_img	: img,
				// "alias"		: alias
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.token) {
				dispatch(saveToken(json.token));
			}
		})
		.catch(err => console.log(err));
	};
}

// < Initial State >
// --------------------------------------------------

const initState = {
	isLoggedIn: localStorage.getItem("jwt") ? true : false,
	token: localStorage.getItem("jwt")
};

// < Reducer >
// --------------------------------------------------

function reducer(state = initState, action) {
	switch(action.type) {
		case SAVE_TOKEN:
			return applySetToken(state, action);
		case LOGOUT:
			return applyLogout(state, action);
		default:
			return state;
	}
}

// < Reducer Functions >
// --------------------------------------------------

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

function applyLogout(state, action) {
	localStorage.removeItem("jwt");

	return {
		isLoggedIn: false
	};
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	defaultLogin,
	createAccount,
	logout,
};

export { actionCreators };

// export reducer by default

export default reducer;
