import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/post";

const mapStateToProps = (state, ownProps) => {
	const { post: { post_list } } = state;

	return { post_list };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        postList: (offset, limit, order_by) => {
            dispatch(PostAct.postList(offset, limit, order_by));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
