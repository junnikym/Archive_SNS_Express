import React, { useState } from "react";
import PropTypes from "prop-types";
import Setting from "./presenter";

const Container = (props, context) => {

	const __logout_handler__ = event => {
		event.preventDefault();
		props.logout();
	};

	return (
		<Setting
			logout_handler = {__logout_handler__}
		/>
	);

}

Container.propTypes = {
	logout : PropTypes.func.isRequired,
}

export default Container;
