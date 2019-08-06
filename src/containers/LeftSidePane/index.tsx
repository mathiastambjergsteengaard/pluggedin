import React, { Component } from "react";
import { connect } from "react-redux";
import {
  closeLeftSidePane,
  openLeftSidePane
} from "../../redux/reducers/functions";
import "./styles.css";

class LeftSidePane extends Component<{ open: boolean }> {
  render() {
    if (this.props.open) {
      return (
        <div id="left-side-pane-container-open">
          <button onClick={closeLeftSidePane}>Close</button>
        </div>
      );
    } else {
      return (
        <div id="left-side-pane-container-closed">
          <button onClick={openLeftSidePane}>Open</button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    open: state.boolean.openLeftSidePane
  };
};
export default connect(mapStateToProps)(LeftSidePane);
