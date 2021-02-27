import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as ProfileAct } from "../../redux/modules/Profile";

const mapStateToProps = (state, ownPorps) => {
    const { profile: { profile_data } }= state;

	return { profile_data };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getProfile: (pk) => {
            dispatch(ProfileAct.getProfile(pk));
            console.log("profile index :",pk);
        },

        Unsubscribe : (pk) => {
            dispatch(ProfileAct.Unsubscribe(pk));
        },

        editProfile: (email, password, name, status_msg) => {
            dispatch(ProfileAct.editProfile(email, password, name, status_msg));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
