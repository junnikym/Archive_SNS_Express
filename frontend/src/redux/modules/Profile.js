function viewOwn_Profile(Info, email){
	return (dispatch, getState) => {
		const { account : { token }} = getState();

		fetch("/profile/:user_pk", {
			method: "get",
			headers: {
                "Content-Type": "application/json",
				Authorization: `JWT ${token}`
            },
        })
	};
;}

function reducer(state = null, action) {
	switch(action.type) {
		
		default:
			return state;
	}
}

const actionCreators = {
	viewOwn_Profile,
};

export { actionCreators };

export default reducer;