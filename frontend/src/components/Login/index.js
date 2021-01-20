import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapDispatchToProps = (dispatch, props) => {
	return {
		defaultLogin: (email, password) => {
			dispatch(accountAct.defaultLogin(email, password));
		}
	};
};

export default connect(null, mapDispatchToProps)(Container);

//mapDis = 서버로 보내는 값