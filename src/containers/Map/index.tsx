import React, { Component } from "react";
import { Query } from "react-apollo";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { USERS_QUERY } from "./queries";
class Map extends Component {
  state = {
    lat: -34.397,
    lng: 150.644
  };

  handleMapClick = (e: any) => {
    console.log(e.latLng.lat());
    this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  render() {
    return (
      <Query query={USERS_QUERY}>
        {(query: any) => {
          if (query.loading)
            return (
              <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
                onClick={this.handleMapClick}
              />
            );
          const users = query.data.users.map((user: any) => {
            if (!user.x_coordinate || !user.y_coordinate) return null;
            return (
              <Marker
                position={{ lat: user.x_coordinate, lng: user.y_coordinate }}
              />
            );
          });
          console.log(query);
          return (
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
              onClick={this.handleMapClick}
            >
              {users}
            </GoogleMap>
          );
        }}
      </Query>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
