import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as commentAct } from "../../redux/modules/comment";

const mapDispatchToProps = (dispatch, props) => {
    return {
        createComment: (comment) => {
            dispatch(commentAct.createComment(comment));
        },
    };
};

export default connect(null, mapDispatchToProps)(Container);
