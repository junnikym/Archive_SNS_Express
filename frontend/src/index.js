import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/configureStore';

import { connect } from "react-redux";

import './components/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ws, {initSocketIO} from "./shared/socket_io";

import { actionCreators as NotifyAct } from "./redux/modules/notify";

initSocketIO();

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

(() => {
  const { socket } = ws;
  const pk = store.getState().account.PK;

  // socket.on('chat_notify', res => {
  //   console.log("socket io request : \n", res);
  //   NotifyAct.AddChatNotify(res);
  // });

  socket.on('login_report_success', res => {
    console.log("login reported successfully : (pk) ", res);
  })
  
})();