import React, { Component } from "react";
import { compose, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { client } from "../../../apollo";
import { hideLoginForm } from "../../../redux/reducers/functions";
import { LOGIN_MUTATION } from "./mutations";

class SignupForm extends Component<any> {
  submit = async (values: any, mutation: any) => {
    const result = await mutation({
      variables: values
    });
    if (result.data.login.token) {
      this.props.reset();
      localStorage.setItem("token", result.data.login.token);
      hideLoginForm();
      client.resetStore();
    }
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(mutation: any) => {
          return (
            <form
              onSubmit={this.props.handleSubmit((values: any) =>
                this.submit(values, mutation)
              )}
            >
              <h2>Login</h2>
              <label>Email</label>
              <Field name="email" component="input" type="text" />
              <label>password</label>
              <Field name="password" component="input" type="text" />
              <button>Log ind</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    show: state.boolean.showLoginForm
  };
};
export default compose(
  connect(mapStateToProps),
  reduxForm({ form: "loginForm" })
)(SignupForm);
