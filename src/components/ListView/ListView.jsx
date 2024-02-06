import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./ListView.css";
import Swal from "sweetalert2";
import EditOrganizationModal from "../EditOrgModal/EditOrganizationModal";
import { border } from "../Utils/colors";

function ListView({ data, isMerchantList }) {
  console.log(data);
  console.log(isMerchantList);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const renderLogoOrInitials = () => {
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
  };

  const handleArchive = (dataId) => {
    Swal.fire({
      title: `Are you sure you want to Archive this ${
        isMerchantList ? "Merchant" : "Organization"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Archive It`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: `DELETE_${isMerchantList ? "MERCHANT" : "ORGANIZATION"}`,
          payload: dataId,
        });
        dispatch({
          type: `FETCH_${isMerchantList ? "MERCHANTS" : "ORGANIZATIONS"}`,
        });
        Swal.fire(
          `${
            isMerchantList ? "Merchant" : "Organization"
          } Successfully Archived!`
        );
      }
    });
  };

  function goToDetails() {
    history.push(`/${isMerchantList ? "merchant" : "orgDetails"}/${data.id}`);
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
              {renderLogoOrInitials()}

              <div className="mainListDetails">
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~ NAME HEADER ~~~~~~~~~~ */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {!isMerchantList
                    ? data.organization_name
                    : data.merchant_name}
                </Typography>

                <div style={{ display: "flex" }}>
                  <div className="column">
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~~ EARNINGS ~~~~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        Organization Fee: ${data.organization_earnings}
                      </Typography>
                    )}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~ BOOKS SOLD ~~~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        Total Books Sold: {data.total_books_sold}
                      </Typography>
                    )}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~~ EARNINGS ~~~~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        Organization Earnings: ${formattedEarnings}
                      </Typography>
                    )}
                  </div>

                  <div className="column">
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~~~ GROUPS ~~~~~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        Total Groups: {data.total_groups}
                      </Typography>
                    )}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~ TOTAL BOOKS ~~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        Total Outstanding Books: {totalStandingBooks}
                      </Typography>
                    )}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~ PSG EARNINGS ~~~~~~~~~ */}
                    {!isMerchantList && (
                      <Typography variant="body2">
                        PSG Earnings: $
                        {(
                          data.total_books_sold * 25 -
                          (data.total_org_earnings !== undefined
                            ? parseFloat(data.total_org_earnings)
                            : 0)
                        ).toLocaleString()}
                      </Typography>
                    )}
                  </div>
                </div>
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
          </div>
        </CardContent>

        {/* <EditOrganizationModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          data={data}
          isOrganization={!isMerchant}
        /> */}
      </Card>
      <br />
    </>
  );
}

export default ListView;
