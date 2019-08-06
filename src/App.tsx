import React from "react";
import { Query } from "react-apollo";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { client } from "./apollo";
import "./App.css";
import LeftSidePane from "./containers/LeftSidePane/";
import Map from "./containers/Map";
import RightSidePane from "./containers/RightSidePane";
import { CURRENT_USER_QUERY } from "./queries";
import { PaneState } from "./redux/interfaces";
import {
  hideSignupForm,
  openRightSidePane,
  setRightPaneState,
  showLoginForm
} from "./redux/reducers/functions";

interface Users {
  users: { _id: number; name: string }[];
}
const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="navbar">
          <Query query={CURRENT_USER_QUERY}>
            {(query: any) => {
              if (query.loading) return null;
              if (!query.data.current_user) {
                return (
                  <div>
                    <button
                      onClick={() => {
                        setRightPaneState(PaneState.SIGNUP);
                        openRightSidePane();
                      }}
                    >
                      Signup
                    </button>
                    <button
                      onClick={() => {
                        showLoginForm();
                        hideSignupForm();
                        openRightSidePane();
                      }}
                    >
                      Log ind
                    </button>
                  </div>
                );
              } else {
                return (
                  <button
                    onClick={() => {
                      localStorage.setItem("token", "");
                      client.resetStore();
                    }}
                  >
                    Logout
                  </button>
                );
              }
            }}
          </Query>
        </div>
        <LeftSidePane />
        <RightSidePane />
        <Map
          loadingElement={<div style={{ height: `701px`, width: "100%" }} />}
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyClsVzET_1gcl2XYbbX_E8HLRiSP-tyWj0"
          }
          containerElement={
            <div
              style={{
                height: `701px`,
                width: "100%"
              }}
            />
          }
          mapElement={
            <div
              style={{
                height: `701px`,
                width: `100%`
              }}
            />
          }
        />
        <Link to={"/"}>Home</Link>
        <Link to={"/some"}>Something else</Link>
        <Route path="/" exact component={() => <p>Home</p>} />
        <Route path="/some" component={() => <p>Some</p>} />
      </div>
    </BrowserRouter>
  );
};

export default App;
