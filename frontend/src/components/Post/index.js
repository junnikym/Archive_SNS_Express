import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as feedAct } from "../../redux/modules/Feed";

const mapDispatchToProps = (dispatch, props) => {
    return {
        // createFeed: (text, file) => {
        //     dispatch(feedAct.createFeed(text, file));
        // }
    };
};

export default connect(null, mapDispatchToProps)(Container);
