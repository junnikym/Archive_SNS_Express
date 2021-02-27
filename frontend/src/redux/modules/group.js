const SAVE_NEW_GROUP 	= "SAVE_NEW_GROUP";
const INVITE_GROUP 		= "INVITE_GROUP";
const GET_GROUP_LIST 	= "GET_GROUP_LIST"

function GetGroupList(data) {
    return {
        type: GET_GROUP_LIST,
        data
    }
}

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

function groupList() {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup", {
			method: "POST",
			headers: {
			Authorization: `${AccessToken}`
			},
			body: JSON.stringify({
				
			})
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(GetGroupList(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

function groupCreate(data) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup", {
			method: "POST",
			headers: {
			Authorization: `${AccessToken}`
			},
			body: data
		})
		.then(res => res.json())
		.then(json => {
			if(json.data) {
				dispatch(SaveNewGroup(json.data));
			}
		})
		.catch(err => console.log(err));
    };  
};

function groupInvite() {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup/", {
			method: "GET",
			headers: {
			Authorization: `${AccessToken}`
			},
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

function groupDelete(group_pk) {
    return (dispatch, getState) => {
		const { account : { AccessToken }} = getState();
		
		fetch("/postgroup/" + group_pk, {
			method: "DELETE",
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
    group_list : undefined
}

function reducer (state = initialState, action) {
    switch(action.type) {
        case SAVE_NEW_GROUP:
            return applySaveNewGroup(state, action);

        case INVITE_GROUP:
            return applyInviteGroup(state, action);

        case GET_GROUP_LIST:
            return applyGetGroupList(state, action);

            default:
                return state;
    }
}

function applyGetGroupList(state, action) {
    const { data } = action;
    
    return {
        ...state,
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
    groupList,
    groupCreate,
    groupInvite,
    groupDelete
};

export { actionCreators }; 

export default reducer;