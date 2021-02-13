import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as ChatAct } from "../../redux/modules/Chat";

const mapStateToProps = (state, props) => {
	// const { chat: { current_chat_contents } } = state;

	// return { current_chat_contents };
    return {}
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        sandChatMessage: (group_pk, content) => {
            dispatch(ChatAct.sandChatMessage(group_pk, content));
            
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
