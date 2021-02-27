function isLike(post_pk) {
    console.log("isLike redux run");

    return (dispatch, getState) => {
        const { account : { token }} = getState();

        fetch("feedlike/islike/" + post_pk, {
            method: "get",
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
	isLike,
};

export { actionCreators };

export default reducer;