import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as PostAct } from "../../redux/modules/Post";

const mapDispatchToProps = (dispatch, props) => {
    return {
        createPost: (text, img) => {
            dispatch(PostAct.createPost(text, img));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
