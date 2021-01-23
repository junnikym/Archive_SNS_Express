import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as LikeAct } from "../../redux/modules/Like";

const mapDispatchToProps = (dispatch, props) => {
    return {
        Like_onClick: () => {
            dispatch(LikeAct.Like_onClick());
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);