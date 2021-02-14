import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as commentAct } from "../../redux/modules/comment";

const mapStateToProps = (state, ownProps) => {
	const {  comment: { comment_list, new_comment_count } } = state;

	return { comment_list, new_comment_count };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createComment: (post_pk, comment) => {
            dispatch(commentAct.createComment(post_pk, comment));
        },

        commentList: (post_pk, offset, limit, order_by) => {
            dispatch(commentAct.commentList(post_pk, offset, limit, order_by));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
