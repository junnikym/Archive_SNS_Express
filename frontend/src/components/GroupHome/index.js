import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as groupAct } from "../../redux/modules/group";

const mapStateToProps = (state, props) => {
    const{ group: { group_list } } = state;

    return { group_list };
};

const mapDispatchToProps = (dispatch, props) =>{
    return {
        groupCreate: (GroupInfo) => {
            dispatch(groupAct.groupCreate(GroupInfo));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
