import { CustomTypography } from "./Introduction";
import { List, ListItem, styled, Typography } from "@mui/material";
import { typographyListColor } from "./contentStyles";

// Custom styled ListItem to change bullet color
const WhiteBulletListItem = styled(ListItem)(({ theme }) => ({
  "&::before": {
    content: '"\\2022"', // Bullet character
    color: theme.palette.common.white, // White color for the bullet
    marginRight: theme.spacing(1), // Adjust bullet position as needed
  },
}));

export default function RolesHelpContent() {
  return (
    <>
      <CustomTypography variant="h4">Roles</CustomTypography>
      <CustomTypography variant="h6">Types of Roles</CustomTypography>
      <CustomTypography variant="body2">
        This application supports the following user roles:
      </CustomTypography>
      <List>
        {["Admin", "Graphic Designer", "Organization Admin", "Seller"].map(
          (role, index) => (
            <WhiteBulletListItem key={index}>
              <Typography variant="body2" sx={typographyListColor}>
                {role}
              </Typography>
            </WhiteBulletListItem>
          )
        )}
      </List>
      <CustomTypography variant="h6">
        Each role has specific permissions and responsibilities:
      </CustomTypography>
      <CustomTypography variant="body2">
        <strong>Admin:</strong> The highest level of access with full control
        over the application.
      </CustomTypography>
      <CustomTypography variant="body2">
        <strong>Graphic Designer:</strong> Responsible for designing coupon graphics
        and managing tasks within the application.
      </CustomTypography>
      <CustomTypography variant="body2">
        <strong>Organization Admin:</strong> Manages organization profile and
        sellers within.
      </CustomTypography>
      <CustomTypography variant="body2">
        <strong>Seller:</strong> Manage the sale of coupon books.
      </CustomTypography>
      <CustomTypography variant="body1">Additional info here</CustomTypography>
    </>
  );
}
