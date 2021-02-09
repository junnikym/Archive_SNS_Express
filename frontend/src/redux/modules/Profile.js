const PASS_DATA = "PASS_DATA";

function passData(data) {
	return {
		type: PASS_DATA,
		data
	};
}

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

const actionCreators = {
	Profile,
};

export { actionCreators };

export default reducer;