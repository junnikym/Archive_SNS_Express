import React from "react";
import PropTypes from "prop-types";
import formStyles from "../../shared/formStyles.scss";

const Setting = (props, context) => (
	<div>
		<span onClick={props.logout_handler}>Log out</span>
	</div>
);

Setting.propTypes = {
	logout_handler : PropTypes.func.isRequired,
};

// Setting.contextTypes = {
//   t: PropTypes.func.isRequired
// };

export default Setting;
