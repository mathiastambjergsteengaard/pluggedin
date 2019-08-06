import React, { Component } from "react";
import { compose, graphql, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { CURRENT_USER_QUERY } from "../../../queries";
import { PaneState } from "../../../redux/interfaces";
import { setRightPaneState } from "../../../redux/reducers/functions";
import { UPDATE_USER_MUTATION } from "./mutations";

class EditProfile extends Component<any> {
  submit = async (values: any, mutation: any) => {
    mutation({
      variables: values
    });
    setRightPaneState(PaneState.PROFILE);
    this.props.reset();
  };
  render() {
    if (this.props.data.loading) return null;
    return (
      <div>
        <button onClick={() => setRightPaneState(PaneState.PROFILE)}>
          Fortryd
        </button>
        <Field name="name" component="input" type="text" />
        <p>{this.props.data.current_user.email}</p>
        <Mutation mutation={UPDATE_USER_MUTATION}>
          {(mutation: any) => {
            return (
              <button
                onClick={this.props.handleSubmit((values: any) =>
                  this.submit(
                    {
                      ...values,
                      _id: this.props.data.current_user._id
                    },
                    mutation
                  )
                )}
              >
                Opdater
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY),

  connect((state: any, props: any) => {
    if (props.data.loading) return {};
    return {
      initialValues: {
        name: props.data.current_user.name
      }
    };
  }),
  reduxForm({ form: "EditProfileForm", enableReinitialize: true })
)(EditProfile);
