import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-1 col-md-2 ml-5">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
              <div className="col-8 col-md-8 mt-4">
                <h3 className="text-center text-info">{firstName}</h3>
                <h5 className="text-center text-info">
                  Current Location: {profile.location}
                </h5>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="col-lead text-center">
                  {isEmpty(profile.bio) ? (
                    <span>{firstName} does not have a bio</span>
                  ) : (
                    <span>{profile.bio}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;