import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as ChatAct } from "../../redux/modules/Chat";

const mapStateToProps = (state, props) => {
	const { 
        account : { PK },
        chat: { current_chat_contents } 
    } = state;

	return { my_pk: PK, current_chat_contents };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        sandChatMessage: (group_pk, content) => {
            dispatch(ChatAct.sandChatMessage(group_pk, content));
        },
        getChatContents: (group_pk) => {
            dispatch(ChatAct.getChatContents(group_pk));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
