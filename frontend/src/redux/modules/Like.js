const SAVE_TOKEN 	= "SAVE_TOKEN";

function Like_onClick() {
    console.log("run");

    return (dispatch, getState) => {
        const { account : { token }} = getState();

        fetch("/Like", {
            method: "",
            headers: {
                // "Content-Type": "application/json",
				Authorization: `JWT ${token}`
            },
        })
    };
}

function reducer(state = null, action) {
	switch(action.type) {
		
		default:
			return state;
	}
}

const actionCreators = {
	Like_onClick,
};

export { actionCreators };

export default reducer;