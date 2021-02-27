import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as groupAct } from "../../redux/modules/group";

const mapStateToProps = (state, props) => {
    const{ group: { group_list } } = state;

    return { group_list };
};

const mapDispatchToProps = (dispatch, props) =>{
    return {
        groupList: () => {
            dispatch(groupAct.groupList());
        },
        
        groupInvite: (group_pk, member_pk_list) => {
            dispatch(groupAct.groupInvite(group_pk, member_pk_list));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
