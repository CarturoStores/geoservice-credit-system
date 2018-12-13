import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import checklist from "../../img/checklist-50.png";
import Moment from "react-moment";
import { deleteAppointmentlist } from "../../actions/profileActions";
import calander from "../../img/calendar-50.png";
import map from "../../img/map-marker-filled-24.png";

class Appointment extends Component {
  onDeleteClick(id) {
    this.props.deleteAppointmentlist(id);
  }

  render() {
    const appointmentlist = this.props.appointmentlist.map(buk => (
      <tr key={buk._id}>
        <td>{buk.location}</td>
        <td>
          <Moment format="MM/DD/YYYY">{buk.from}</Moment> -
          <Moment format="MM/DD/YYYY">{buk.to}</Moment>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, buk._id)}
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
            src={checklist}
            style={{ width: "35px", margin: "auto", display: "round" }}
            alt="Loading..."
          />
          Bucketlist
        </h4>
        <table className="text-center table">
          <thead>
            <tr>
              <th>
                <img
                  src={map}
                  style={{ width: "35px", margin: "auto", display: "round" }}
                />
                Location
              </th>
              <th>
                <img
                  src={calander}
                  style={{ width: "35px", margin: "auto", display: "round" }}
                />
                Expected Start/Finish
              </th>
              <th />
            </tr>
            {appointmentlist}
          </thead>
        </table>
      </div>
    );
  }
}

Appointment.propTypes = {
  deleteAppointmentlist: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteAppointmentlist }
)(Appointment);