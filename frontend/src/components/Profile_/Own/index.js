import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as ProfileAct } from "../../../redux/modules/Profile";
import { actionCreators as accountAct } from "../../../redux/modules/account";


const mapStateToProps = (state, ownPorps) => {
    const { account: { info, PK } }= state;

	return { info, PK };
};

const mapDispatchToProps = (dispatch, props) => {
    return {

        viewOwn_Profile: (user_Info, user_Email) => {
            dispatch(ProfileAct.viewOwn_Profile(user_Info,user_Email));
        },

        getInfo: (pk) => {
			dispatch(accountAct.getInfo(pk));
		}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
