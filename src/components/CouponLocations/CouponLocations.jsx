import React from "react";
// ~~~~~~~~~~ Components ~~~~~~~~~ //
import Typography from "../Typography/Typography";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import {
  capitalizeStateAbbr,
  capitalizeWords,
  formatPhoneNumber,
} from "../Utils/helpers";

const textStyle = {
  display: "inline",
};

const bold = {
  fontWeight: "bold",
};

const CouponLocations = ({ locations }) => {
  return (
    <div>
      <h2>Accepted Locations:</h2>
      {locations.length > 0 ? (
        <ol>
          {locations.map((location, index) => (
            <li key={index}>
              <Typography
                label="Location Name: "
                variant="body2"
                sx={{ ...textStyle, ...bold }}
              />
              <Typography
                label={capitalizeWords(location.location_name)}
                variant="body2"
                sx={textStyle}
              />
              <br />
              <Typography
                label="Phone: "
                variant="body2"
                sx={{ ...textStyle, ...bold }}
              />
              <Typography
                label={formatPhoneNumber(location.phone_number)}
                variant="body2"
                sx={textStyle}
              />
              <br />
              <Typography
                label="Address: "
                variant="body2"
                sx={{ ...textStyle, ...bold }}
              />
              <Typography
                label={`${capitalizeWords(location.address)} ${capitalizeWords(
                  location.city
                )}, ${capitalizeStateAbbr(location.state)} ${location.zip}`}
                variant="body2"
                sx={textStyle}
              />
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
