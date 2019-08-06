import React, { Component } from "react";
import { compose, Mutation } from "react-apollo";
import { Field, reduxForm } from "redux-form";
import { client } from "../../../apollo";
import { PaneState } from "../../../redux/interfaces";
import { setRightPaneState } from "../../../redux/reducers/functions";
import { SIGNUP_MUTATION } from "./mutations";

class SignupForm extends Component<any> {
  submit = async (values: any, mutation: any) => {
    const result = await mutation({
      variables: values
    });
    if (result.data.signup.token) {
      this.props.reset();
      localStorage.setItem("token", result.data.signup.token);
      client.resetStore();
      setRightPaneState(PaneState.PROFILE);
    }
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION}>
        {(mutation: any) => {
          return (
            <form
              onSubmit={this.props.handleSubmit((values: any) =>
                this.submit(values, mutation)
              )}
            >
              <h2>Signup</h2>
              <label>Navn</label>
              <Field name="name" component="input" type="text" />
              <label>Email</label>
              <Field name="email" component="input" type="text" />
              <label>password</label>
              <Field name="password" component="input" type="text" />
              <button>Opret</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default compose(reduxForm({ form: "signUpForm" }))(SignupForm);
