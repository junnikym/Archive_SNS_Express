function feed_Like(post_pk) {
    console.log("run");

    return (dispatch, getState) => {
        const { account : { token }} = getState();

        fetch("/feedlike/" + post_pk, {
            method: "post",
            headers: {
				Authorization: `JWT ${token}`
            },
        })
        .then(console.log(post_pk))
            
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