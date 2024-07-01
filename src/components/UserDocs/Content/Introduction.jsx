import { Typography } from "@mui/material";

// Sets margin bottom to 2
export const HelpPageTypography = (props) => {
  return <Typography {...props} sx={{ mb: 2, color: "ghostwhite" }} />;
};

export default function GettingStarted() {
  return (
    <>
      <HelpPageTypography variant="h4">
        Welcome to The Preferred Savings Guide!
      </HelpPageTypography>
      <HelpPageTypography variant="body1">
        This application is designed to provide a
        comprehensive solution for coupon development, management, and sales.
      </HelpPageTypography>
      <HelpPageTypography variant="body1">Key Objectives:</HelpPageTypography>
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
      <HelpPageTypography variant="body1">
        These modules aim to streamline coupon management, improve seller
        organization, and enhance the user experience for administrators and
        sellers alike.
      </HelpPageTypography>
    </>
  );
}
