import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/Post";

const mapStateToProps = (state, ownProps) => {
	const { post: { post_list } } = state;

	return { post_list };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createPost: (title, text_content, img) => {
            dispatch(PostAct.createPost(title, text_content, img));
            
        },

        postList: (offset, limit, order_by) => {
            dispatch(PostAct.postList(offset, limit, order_by));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
