import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { visited } = this.props;

    const visItems = visited.map(vis => (
      <li key={vis._id} className="list-group-item">
        <h4>{vis.location}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{vis.from}</Moment> -
          <Moment format="MM/DD/YYYY">{vis.to}</Moment>
        </p>
        <p>
          {vis.description === "" ? null : (
            <span>
              <strong>Description: </strong> {vis.synopsis}
            </span>
          )}
        </p>
        <p> {vis.synopsis}</p>
      </li>
    ));
    // const bukItems = appoitnmentlist.map(buk => (
    //   <li key={buk._id} className="list-group-item">
    //     <h4>{buk.location}</h4>
    //     <p>
    //       <Moment format="MM/DD/YYYY">{buk.from}</Moment> -
    //       {buk.to === null ? (
    //         " Now"
    //       ) : (
    //         <Moment format="MM/DD/YYYY">{buk.to}</Moment>
    //       )}
    //     </p>
    //     <p>
    //       {buk.description === "" ? null : (
    //         <span>
    //           <strong>TripyDo: </strong> {buk.synopsis}
    //         </span>
    //       )}
    //     </p>
    //   </li>
    // ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info"> Visited</h3>
          {visItems.length > 0 ? (
            <ul className="list-group"> {visItems}</ul>
          ) : (
            <p className="text-center">No Visited Places Listed.</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info"> Bucketlist</h3>
          {/* {bukItems.length > 0 ? (
            <ul className="list-group"> {bukItems}</ul>
          ) : (
            <p className="text-center">No Bucketlisit Listed.</p>
          )} */}
        </div>
      </div>
    );
  }
}
export default ProfileCreds;