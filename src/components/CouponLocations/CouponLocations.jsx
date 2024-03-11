import React from "react";
import { capitalizeWords } from "../Utils/helpers";

const CouponLocations = ({ locations }) => {
  return (
    <div>
      <h2>Accepted Locations:</h2>
      {locations.length > 0 ? (
        <ol>
          {locations.map((location, index) => (
            <li key={index}>
              <strong>Location Name:</strong>{" "}
              {capitalizeWords(location.location_name)}
              <br />
              <strong>Phone:</strong> {location.phone_number}
              <br />
              <strong>Address:</strong> {location.address} {location.city}{" "}
              {location.state}, {location.zip}
              <br />
              <br />
            </li>
          ))}
        </ol>
      ) : (
        <p>No locations set</p>
      )}
    </div>
  );
};

export default CouponLocations;
