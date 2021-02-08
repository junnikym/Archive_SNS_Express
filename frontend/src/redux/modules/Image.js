// < Actions >
// --------------------------------------------------

// const UPLOAD_POST_IMG = "UPLOAD_POST_IMG";

// < Actions Creators >
// --------------------------------------------------

// function uploadPostImg(data) {
// 	return {
// 		type: UPLOAD_POST_IMG,
// 		data
// 	}
// }

// < API Actions >
// --------------------------------------------------


function uploadPostImg(image) {

    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/upload/post_img", {
			method: "post",
			headers: {
				Authorization: `${AccessToken}`
			},
			body: image
		})
		
		.catch(err => console.log(err));
    };
    
};

// < Initial State >
// --------------------------------------------------

const initialState = {
}

// < Reducer >
// --------------------------------------------------

function reducer(state = initialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}

// < Exports >
// --------------------------------------------------

const actionCreators = {
	uploadPostImg,
};

export { actionCreators };

export default reducer;