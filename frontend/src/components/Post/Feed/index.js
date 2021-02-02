import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../../redux/modules/Post";
import { actionCreators as accountAct } from "../../../redux/modules/account";

const mapStateToProps = (state, ownPorps) => {
    const { account: { info, PK } }= state;

	return { info, PK };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createPost: (title, text, img) => {
            dispatch(PostAct.createPost(title, text, img));
        },

        getInfo: (pk) => {
			dispatch(accountAct.getInfo(pk));
		}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
