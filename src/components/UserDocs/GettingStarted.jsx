import { Typography } from "@mui/material";

// Sets margin bottom to 2
const CustomTypography = (props) => {
  return <Typography {...props} sx={{ mb: 2 }} />;
};

export default function GettingStarted() {
  return (
    <>
      <CustomTypography variant="h4">
        Welcome to The Preferred Savings Guide!
      </CustomTypography>
      <CustomTypography variant="body1">
        This application is designed to enhance an existing platform developed
        in the Koss cohort at Emerging Digital Academy in Fargo, ND. Our goal is to provide a
        comprehensive solution for coupon development, management, and sales.
      </CustomTypography>
      <CustomTypography variant="body1">Key Objectives:</CustomTypography>
      <ul>
        <li>
          <Typography variant="body2">
            <strong>Coupon Development:</strong> Create, manage, and publish
            coupons from initial design to consumer availability.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            <strong>Task Tracking System:</strong> Manage tasks, communicate
            with admin, and track progress.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            <strong>Seller Organization:</strong> Organize sellers, track
            metrics, and manage sales data.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            <strong>Unique Seller URLs:</strong> Generate unique web links for
            sellers to sell their coupon books.
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            <strong>PayPal Integration:</strong> Integrate PayPal for secure
            transactions within the application.
          </Typography>
        </li>
      </ul>
      <CustomTypography variant="body1">
        This application aims to streamline coupon management, improve seller
        organization, and enhance the user experience for administrators and
        sellers alike.
      </CustomTypography>
    </>
  );
}
