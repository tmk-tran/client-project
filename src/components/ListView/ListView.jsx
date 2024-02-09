import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./ListView.css";
import Swal from "sweetalert2";
import EditAccountModal from "../EditAccountModal/EditAccountModal";
import {
  backgroundColor,
  border,
  primaryColor,
  successColor,
} from "../Utils/colors";

function ListView({ data, isMerchantList, onChange, editComplete }) {
  console.log(data);
  console.log(isMerchantList);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  console.log(editComplete);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    onChange();
  };

  // const renderLogoOrInitials = () => {

  //   if (data.organization_logo) {
  //     return (
  //       <img
  //         className="logoImage"
  //         src={data.organization_logo}
  //         alt="Organization Logo"
  //       />
  //     );
  //   } else {
  //     const initials =
  //       data.organization_name !== undefined
  //         ? data.organization_name
  //             .split(" ")
  //             .map((word) => word[0])
  //             .join("")
  //             .toUpperCase()
  //         : null;

  //     return <div className="initialsContainer">{initials}</div>;
  //   }
  // };

  const renderLogoOrInitials = () => {
    if (!isMerchantList) {
      if (data.organization_logo) {
        return (
          <img
            className="logoImage"
            src={data.organization_logo}
            alt="Organization Logo"
          />
        );
      } else {
        const initials =
          data.organization_name !== undefined
            ? data.organization_name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
            : null;

        return <div className="initialsContainer">{initials}</div>;
      }
    } else {
      // Add logic here for merchant logos
      return <div className="initialsContainer">Merchant Logo</div>; // Placeholder, replace with logic for merchant logos
    }
  };

  const handleArchive = (dataId) => {
    Swal.fire({
      title: `Are you sure you want to Archive this ${
        isMerchantList ? "Merchant" : "Organization"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: backgroundColor.color,
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Archive`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Please enter a reason for archiving",
          input: "text",
          showCancelButton: true,
          confirmButtonColor: backgroundColor.color,
          cancelButtonColor: "#d33",
          confirmButtonText: "Archive",
          inputValidator: (value) => {
            if (!value) {
              return "Please enter a reason!";
            }
          },
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            const archiveReason = reasonResult.value;
            console.log(archiveReason);

            dispatch({
              type: `DELETE_${isMerchantList ? "MERCHANT" : "ORGANIZATION"}`,
              payload: isMerchantList ? { dataId, archiveReason } : { dataId },
            });

            dispatch({
              type: `FETCH_${isMerchantList ? "MERCHANTS" : "ORGANIZATIONS"}`,
            });
            Swal.fire({
              icon: "success",
              title: `${
                isMerchantList ? "Merchant" : "Organization"
              } Successfully Archived!`,
            });
          }
        });
      }
    });
  };

  function goToDetails() {
    history.push(
      `/${isMerchantList ? "merchantTaskDetails" : "orgDetails"}/${data.id}`
    );
  }

  const totalOrgEarnings =
    data.total_org_earnings !== undefined
      ? parseFloat(data.total_org_earnings)
      : 0;
  const formattedEarnings = totalOrgEarnings.toLocaleString();

  const totalCheckedOutBooks = data.total_checked_out_books;
  const totalCheckedInBooks = data.total_checked_in_books;
  const totalBooksSold = data.total_books_sold;
  const totalStandingBooks =
    totalCheckedOutBooks - totalCheckedInBooks - totalBooksSold;

  return (
    <>
      <Card className="mainListContainer">
        <CardContent>
          <div className="contentClickable" onClick={goToDetails}>
            <div className="mainListHeader">
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~ ORG LOGO  ~~~~~~~~~~~ */}
              {renderLogoOrInitials()}

              <div className="mainListDetails">
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~ NAME HEADER ~~~~~~~~~~ */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {!isMerchantList
                    ? data.organization_name
                    : data.merchant_name}
                </Typography>

                {!isMerchantList ? (
                  <div style={{ display: "flex" }}>
                    <div className="column">
                      {/* ///////////////////////////////////////// */}
                      {/* ///////////// ORG INFORMATION /////////// */}
                      {/* ///////////////////////////////////////// */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~~ EARNINGS ~~~~~~~~~~~~ */}
                      <Typography variant="body2">
                        Organization Fee: ${data.organization_earnings}
                      </Typography>

                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~ BOOKS SOLD ~~~~~~~~~~~ */}
                      <Typography variant="body2">
                        Total Books Sold: {data.total_books_sold}
                      </Typography>

                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~~ EARNINGS ~~~~~~~~~~~~ */}
                      <Typography variant="body2">
                        Organization Earnings: ${formattedEarnings}
                      </Typography>
                    </div>

                    <div className="column" style={border}>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~~~ GROUPS ~~~~~~~~~~~~~ */}
                      <Typography variant="body2">
                        Total Groups: {data.total_groups}
                      </Typography>

                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~ TOTAL BOOKS ~~~~~~~~~~ */}
                      <Typography variant="body2">
                        Total Outstanding Books: {totalStandingBooks}
                      </Typography>

                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~~ PSG EARNINGS ~~~~~~~~~ */}
                      <Typography variant="body2">
                        PSG Earnings: $
                        {(
                          data.total_books_sold * 25 -
                          (data.total_org_earnings !== undefined
                            ? parseFloat(data.total_org_earnings)
                            : 0)
                        ).toLocaleString()}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      ...border,
                      flexDirection: "column",
                    }}
                  >
                    <div style={border}>
                      <Typography>Coupon Count (Active): # here</Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ) : (
            <div>{isMerchantList ? "Merchant List" : "Merchant List"}</div>
          )} */}

          <div
            className="mainListActions"
            style={{
              marginTop:
                data.total_active_fundraisers <= 0 ? "-115px" : "-85px",
            }}
          >
            <Button
              style={{ marginRight: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(data.id);
              }}
            >
              Edit
            </Button>

            {data.total_active_fundraisers <= 0 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleArchive(data.id);
                }}
              >
                Archive
              </Button>
            )}

            {isMerchantList && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleArchive(data.id);
                }}
              >
                Archive
              </Button>
            )}
          </div>
        </CardContent>

        <EditAccountModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          data={data}
          isMerchantList={isMerchantList}
        />
      </Card>
    </>
  );
}

export default ListView;
