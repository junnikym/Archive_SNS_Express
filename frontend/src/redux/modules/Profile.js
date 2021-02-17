const PASS_DATA		   = "PASS_DATA";
const UNSUBSCRIBE_DATA = "UNSUBSCRIBE_DATA";

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

function Profile(pk){
	return (dispatch, getState) => {
		const { account : { token }} = getState();

		fetch("/profile/"+pk, {
			method: "GET",
			headers: {
                "Content-Type": "application/json",
				Authorization: `JWT ${token}`
			},
		})
		.then(res=>res.json())
		.then(json=>{
			if(json.data) {
				dispatch(passData(json.data));
			}
		})
	};
;}

const initialState = {
};

function reducer(state = initialState, action) {
	
	switch(action.type) {
		case PASS_DATA:
			return applyData(state, action);

		case UNSUBSCRIBE_DATA:
			return applyUnsubscribe(state, action);
			
		default:
			return state;
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
	Unsubscribe
};

export { actionCreators };

export default reducer;