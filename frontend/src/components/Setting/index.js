import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapDispatchToProps = (dispatch, props) => {
	return {
		logout: () => {
			dispatch(accountAct.logout());
		}
	};
};

export default connect(null, mapDispatchToProps)(Container);