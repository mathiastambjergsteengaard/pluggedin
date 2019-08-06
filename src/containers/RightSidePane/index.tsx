import React, { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { CURRENT_USER_QUERY } from "../../queries";
import { PaneState } from "../../redux/interfaces";
import {
  closeRightSidePane,
  openRightSidePane
} from "../../redux/reducers/functions";
import EditProfile from "./EditProfile";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import SignupForm from "./SignupForm";
import "./styles.css";

interface Props {
  open?: boolean;
  paneState?: PaneState;
  chosenUserId: number;
}
class RightSidePane extends Component<Props> {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {(query: any) => {
          if (query.loading) return null;
          console.log(this.props.paneState);
          let mainContent = query.data.current_user ? (
            <Profile />
          ) : (
            <SignupForm />
          );
          switch (this.props.paneState) {
            case PaneState.PROFILE:
              mainContent = <Profile userId={this.props.chosenUserId} />;
              break;
            case PaneState.LOGIN:
              mainContent = <LoginForm />;
              break;
            case PaneState.SIGNUP:
              mainContent = <SignupForm />;
              break;
            case PaneState.EDIT_PROFILE:
              mainContent = <EditProfile />;
              break;
            default:
              break;
          }
          if (this.props.open) {
            return (
              <div id="right-side-pane-container-open">
                <button onClick={closeRightSidePane}>Close</button>
                {mainContent}
              </div>
            );
          } else {
            return (
              <div id="right-side-pane-container-closed">
                <button onClick={openRightSidePane}>Open</button>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    open: state.boolean.openRightSidePane,
    paneState: state.rightPaneState.paneState,
    chosenUserId: state.rightPaneState.chosenUserId
  };
};
export default connect(mapStateToProps)(RightSidePane);
