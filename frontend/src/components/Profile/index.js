import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as ProfileAct } from "../../redux/modules/Profile";
import { actionCreators as accountAct } from "../../redux/modules/account";


const mapStateToProps = (state, ownPorps) => {
    const { profile: { profile_info } }= state;

	return { profile_info };
};

const mapDispatchToProps = (dispatch, props) => {
    return {

        Profile: (pk) => {
            dispatch(ProfileAct.Profile(pk));
        },

        Unsubscribe : (pk) => {
            dispatch(ProfileAct.Unsubscribe(pk));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
