function feed_Like() {
    console.log("run");

    return (dispatch, getState) => {
        const { account : { token }} = getState();

        fetch("feedlike/count/", {
            method: "get",
            headers: {
				Authorization: `JWT ${token}`
            },
        })
            
        .catch(err => console.log(err));
    };
}

function reducer(state = null, action) {
	switch(action.type) {
		
		default:
			return state;
	}
}

const actionCreators = {
	feed_Like,
};

export { actionCreators };

export default reducer;