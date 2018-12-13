import React from "react";
import { Link } from "react-router-dom";
import user from "../../img/user-50.png";
import checklist from "../../img/checklist-50.png";
import credit_card from "../../img/credit-card-16.png";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <img
          src={user}
          style={{ width: "35px", margin: "auto", display: "round" }}
          alt="Loading..."
        />{" "}
        Edit Profile
      </Link>
      <Link to="/add-visited" className="btn btn-light">
        <img
          src={credit_card}
          style={{ width: "35px", margin: "auto", display: "round" }}
          alt="Loading..."
        />
        Add to My Trips
      </Link>
      <Link to="/add-appointment" className="btn btn-light">
        <img
          src={checklist}
          style={{ width: "35px", margin: "auto", display: "round" }}
          alt="Loading..."
        />
        Add to Appointment
      </Link>
    </div>
  );
};

export default ProfileActions;