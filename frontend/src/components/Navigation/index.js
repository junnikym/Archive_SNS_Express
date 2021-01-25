import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as accountAct } from "../../redux/modules/account";

const mapStateToProps = (state, ownProps) => {
	const { account: { info, PK, isLoggedIn } } = state;

	return { info, PK, isLoggedIn };
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		logout: () => {
			dispatch(accountAct.logout());
		},

		getInfo: (pk) => {
			dispatch(accountAct.getInfo(pk));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);