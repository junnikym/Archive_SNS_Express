const GET_PROFILE_DATA		= "GET_PROFILE_DATA";
const UNSUBSCRIBE_DATA  	= "UNSUBSCRIBE_DATA";
const EDIT_PROFILE_DATA	    = "EDIT_PROFILE_DATA";

function getProfileData(data) {
	return {
		type: GET_PROFILE_DATA,
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

function getProfile() {
	return (dispatch, getState) => {
		const { account : { PK }} = getState();

		fetch("/profile/%22" + PK +"%22" , {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => response.json())
		.then(json => dispatch(getProfileData(json.data)))
		.catch(err => console.log(err));
	};
};

function editProfile (email, password, name, status_msg) {
	return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();

		fetch("/profile", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				"email" : email,
				"password" : password,
				"name" : name,
				"status_msg" : status_msg
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
		
		fetch("/Auth" , {
			method: "delete",
			headers: {
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
	profile_data : undefined
};

function reducer(state = initialState, action) {
	
	switch(action.type) {
		case GET_PROFILE_DATA:
			return applyGetProfileData(state, action);

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
		profile_data: data
	};
};

function applyGetProfileData(state, action) {
	const {data} = action;

	return {
		...state,
		profile_data: data
	};
}

function applyUnsubscribe(state, action) {
	const { user_pk } = action;
	const { account } = state;
}

const actionCreators = {
	getProfile,
	Unsubscribe,
	editProfile
};

export { actionCreators };

export default reducer;