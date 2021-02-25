import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as ProfileAct } from "../../redux/modules/Profile";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapStateToProps = (state, ownPorps) => {
    const { profile: { profile_data } }= state;

	return { profile_data };
};

const mapDispatchToProps = (dispatch, props) => {
    return {

        getProfile: (PK) => {
            dispatch(ProfileAct.getProfile(PK));
            console.log("profile index :",PK);
        },

        Unsubscribe : (pk) => {
            dispatch(ProfileAct.Unsubscribe(pk));
        },

        editProfile: (email, password, name, image, status_msg) => {
            dispatch(ProfileAct.editProfile(email, password, name, image, status_msg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
