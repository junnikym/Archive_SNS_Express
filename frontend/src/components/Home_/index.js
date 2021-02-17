import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as NotifyAct } from "../../redux/modules/notify";

const mapDispatchToProps = (dispatch, props) => {
    return {
        AddChatNotify: (msg) => {
            dispatch(NotifyAct.AddChatNotify(msg));
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
