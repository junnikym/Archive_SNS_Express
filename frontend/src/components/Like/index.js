import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/Post";
import { actionCreators as LikeAct } from "../../redux/modules/Like";

const mapStateToProps = (state, ownProps) => {
	const { post: { post_list } } = state;
    const { account: { info } } = state;

	return { post_list, info };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        isLike: (post_pk) => {
            dispatch(LikeAct.isLike( post_pk ));
            console.log("isLike run", post_pk);
            
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);