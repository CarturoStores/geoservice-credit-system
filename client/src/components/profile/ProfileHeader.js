import React, { Component } from "react";
// import avatarGif from "../../img/avatar-name-50.png";
import isEmpty from "../../validation/is-empty";
import Map from "../map/CreditMap";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div
            className="card card-body bg-info text-white mb-3"
            style={{ height: 340 + "px" }}
          >
            <div className="map-profile" id="map">
              {" "}
              <Map />
            </div>
            <div className="text-left">
              <h1 className="display-4 text-left">{profile.user.name}</h1>

              <p>
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;