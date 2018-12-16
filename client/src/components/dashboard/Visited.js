import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteVisited } from "../../actions/profileActions";
import credit_card from "../../img/credit-card-16.png";
import calander from "../../img/calendar-50.png";
import map from "../../img/map-marker-filled-24.png";

class Visited extends Component {
  onDeleteClick(id) {
    this.props.deleteVisited(id);
  }

  render() {
    const visited = this.props.visited.map(vis => (
      <tr key={vis._id}>
        <td>{vis.location}</td>
        <td>
          <Moment format="MM/DD/YYYY">{vis.from}</Moment> -
          <Moment format="MM/DD/YYYY">{vis.to}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, vis._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="text-center mb-4">
          <img
            src={credit_card}
            style={{ width: "35px", margin: "auto", display: "round" }}
            alt=''
          />My Trips
        </h4>
        <table className="text-center table">
          <thead>
            <tr>
              <th>
                <img
                  src={map}
                  style={{ width: "35px", margin: "auto", display: "round" }}
                  alt=''
                />
                Location
              </th>
              <th>
                <img
                  src={calander}
                  style={{ width: "35px", margin: "auto", display: "round" }}
                  alt=''
                />
                Dates Appointment
              </th>
              <th />
            </tr>
            {visited}
          </thead>
        </table>
      </div>
    );
  }
}

Visited.propTypes = {
  deleteVisited: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteVisited }
)(Visited);