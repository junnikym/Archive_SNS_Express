const PASS_DATA		   = "PASS_DATA";
const UNSUBSCRIBE_DATA = "UNSUBSCRIBE_DATA";
const EDIT_PROFILE_DATA	   = "EDIT_PROFILE_DATA";

function passData(data) {
	return {
		type: PASS_DATA,
		data
	};
}

function unsubscribeData(data) {
	return {
		type : UNSUBSCRIBE_DATA,
		data
	}
}

function editProfileData(data) {
	return {
		type : EDIT_PROFILE_DATA,
		data
	}
}

function Profile(pk) {
	return dispatch => {
		fetch("/auth/short_info", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"pk": pk
			})
		})
		.then(response => response.json())
		.then(json => {


			if (json.data) {
				dispatch(passData(json.data));
			}
		})
		.catch(err => console.log(err));
	};
};

function editProfile (email, password, name, image, msg) {
	return (dispatch, getState) => {
		const { account : { token }} = getState();

		fetch("/profile/" + email, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${token}`
			},
			body: JSON.stringify({
				"email" : email,
				"password" : password,
				"name" : name,
				"image" : image,
				"msg" : msg
			})
		})
		.then(response =>  response.json())
		.then(json => {
			if (json.data) {
				dispatch(editProfileData(json.data));
			}
		})
		.catch(err => console.log(err));
	};
}

function Unsubscribe(user_pk, password) {

	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/Auth/" + user_pk, {
			method: "delete",
			headers: {
			"Content-Type": "application/json",
			Authorization: `${AccessToken}`
			}
		})
		.then(res => {
			if(res.status == 200) {
				dispatch(unsubscribeData(user_pk));
			}
		})
		.catch(err => console.log(err));
    };
    
};

const initialState = {
};

function reducer(state = initialState, action) {
	
	switch(action.type) {
		case PASS_DATA:
			return applyData(state, action);

		case UNSUBSCRIBE_DATA:
			return applyUnsubscribe(state, action);

		case EDIT_PROFILE_DATA:
			return applyeditProfileData(state, action);
			
		default:
			return state;
	}
}

function applyeditProfileData (state, action) {
	const {data} = action;

	return {
		...state,
		profile_info: data
		
	}
}

function applyData(state, action) {
	const {data} = action;

	return {
		...state,
		profile_info: data
	};
}

function applyUnsubscribe(state, action) {
	const { user_pk } = action;
	const { account } = state;
}

const actionCreators = {
	Profile,
	Unsubscribe,
	editProfile
};

export { actionCreators };

export default reducer;