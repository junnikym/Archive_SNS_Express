import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as LikeAct } from "../../redux/modules/Like";

const mapDispatchToProps = (dispatch, props) => {
    return {
        __cilckLike__: () => {
            dispatch(LikeAct.__cilckLike__());
            
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);