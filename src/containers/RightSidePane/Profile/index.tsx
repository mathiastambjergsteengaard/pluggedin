import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../../../queries";
import { PaneState } from "../../../redux/interfaces";
import { setRightPaneState } from "../../../redux/reducers/functions";
import { USER_QUERY } from "./queries";

class Profile extends Component<{ userId?: number }> {
  // submit = async (values: any, mutation: any) => {
  //   const result = await mutation({
  //     variables: values
  //   });
  //   if (result.data.login.token) {
  //     this.props.reset();
  //     localStorage.setItem("token", result.data.login.token);
  //     hideLoginForm();
  //     client.resetStore();
  //   }
  // };
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {(currentUserQuery: any) => {
          if (currentUserQuery.loading) return null;
          console.log(currentUserQuery);
          if (!this.props.userId) {
            return (
              <div>
                <button
                  onClick={() => setRightPaneState(PaneState.EDIT_PROFILE)}
                >
                  Edit
                </button>
                <p>{currentUserQuery.data.current_user.name}</p>
                <p>{currentUserQuery.data.current_user.email}</p>
              </div>
            );
          }
          return (
            <Query
              query={USER_QUERY}
              variables={{
                _id: this.props.userId
              }}
            >
              {(userQuery: any) => {
                if (userQuery.loading) return null;
                return (
                  <div>
                    <p>{userQuery.data.user.name}</p>
                    <p>{userQuery.data.user.email}</p>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

// const mapStateToProps = (state: any) => {
//   console.log(state);
//   return {
//     paneState: state.rightSidePane.paneState
//   };
// };
export default Profile;
