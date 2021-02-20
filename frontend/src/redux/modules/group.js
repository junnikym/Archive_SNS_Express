const SAVE_NEW_GROUP = "SAVE_NEW_GROUP";
const INVITE_GROUP = "INVITE_GROUP";
const GROUP_FIND   = "GROUP_FIND";


function SaveNewGroup(data) {
    return {
        type: SAVE_NEW_GROUP,
        data
    }
}

function InviteGroup(data) {
    return {
        type: INVITE_GROUP,
        data
    }
}

function groupFind(data) {
    return {
        type: GROUP_FIND,
        data
    }
}

function groupCreate(title) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup/", {
			method: "post",
			headers: {
			Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				title   : title
			})
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(groupCreate(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

function groupInvite(group_pk) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup/invite/" + group_pk, {
			method: "post",
			headers: {
			Authorization: `${AccessToken}`
			},
			body: group_pk
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(groupInvite(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

const initialState = {

}

function reducer (state = initialState, action) {
    switch(action.type) {
        case SAVE_NEW_GROUP:
            return applySaveNewGroup(state, action);

        case INVITE_GROUP:
            return applyInviteGroup(state, action);

            default:
                return state;
    }
}

function applySaveNewGroup(state, action) {
    const { data } = action;

    return {
        ...state,

    }
}

function applyInviteGroup(state, action) {
    const { data } = action;

    return {
        ...state,
    }
}

const actionCreators = {
    groupCreate,
    groupInvite
};

export { actionCreators }; 

export default reducer;