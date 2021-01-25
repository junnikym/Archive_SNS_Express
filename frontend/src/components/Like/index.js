import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as LikeAct } from "../../redux/modules/Like";

const mapDispatchToProps = (dispatch, props) => {
    return {
        feed_Like: () => {
            dispatch(LikeAct.feed_Like());
            
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);