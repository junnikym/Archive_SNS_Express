import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/Post";

const mapDispatchToProps = (dispatch, props) => {
    return {
        createPost: (title, text, img) => {
            dispatch(PostAct.createPost(title, text, img));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
