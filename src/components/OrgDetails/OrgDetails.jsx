import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import "./OrgDetails.css";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import OrgContactDetails from "../ContactDetails/OrgContactDetails";
import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";
import OrgNotesDisplay from "../OrgNotesDisplay/OrgNotesDisplay";
import OrgDetailsGoalView from "../OrgDetailsGoalView/OrgDetailsGoalView";
import DetailsTaskView from "../DetailsTaskView/DetailsTaskView";
import CouponReviewCard from "../CouponReviewCard/CouponReviewCard";
import MerchantContactDetails from "../ContactDetails/MerchantContactDetails";
import BackButton from "../BackButton/BackButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import {
  oDetails,
  oGroups,
  oNotes,
  mDetails,
  mNotes,
} from "../../hooks/reduxStore";

// ~~~~~~~~~~ May Use Later ~~~~~~~~~~
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
// ~~~~~~~~~~ Toast ~~~~~~~~~~
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function OrgDetails({ isMerchantTaskPage }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const location = useLocation(); // Use location to get the current route

  // Check if the user is on the task page
  const isTaskPage = location.pathname.includes("/orgtaskdetails");
  // const isMerchantTaskPage = location.pathname.includes("/merchantTaskDetails");
  console.log(isMerchantTaskPage);

  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const dispatch = dispatchHook();
  const detailsOrg = oDetails();
  // console.log(detailsOrg);
  const groups = oGroups();
  console.log(groups);
  // const notes = oNotes();
  const notes = !isMerchantTaskPage ? oNotes() : mNotes();
  console.log(notes);
  const merchantDetails = mDetails();
  console.log(merchantDetails);

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });

    dispatch({
      type: isMerchantTaskPage
        ? "FETCH_MERCHANT_DETAILS"
        : "FETCH_ORG_FUNDRAISERS",
      payload: paramsObject.id,
    });

    dispatch({
      type: "FETCH_ORGANIZATIONS",
      payload: paramsObject.id,
    });
  }, [paramsObject.id, isMerchantTaskPage]);

  // Create a map to store organization details and associated groups
  const orgMap = new Map();

  // Populate the map with unique organizations and associated groups
  detailsOrg.forEach((info) => {
    const orgId = info.organization_id;

    if (!orgMap.has(orgId)) {
      orgMap.set(orgId, { orgDetails: info, groups: [] });
    }

    // Add group details to the associated organization
    orgMap.get(orgId).groups.push({
      group_id: info.group_id,
      department: info.department,
      sub_department: info.sub_department,
      group_nickname: info.group_nickname,
      group_photo: info.group_photo,
      group_description: info.group_description,
      goal: info.sum,
    });
  });

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <BackButton />
        </div>
      </div>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <div className="detailsView-container">
            {[...orgMap.values()].map(({ orgDetails, groups }) => (
              <React.Fragment key={orgDetails.organization_id}>
                {!isTaskPage && !isMerchantTaskPage && (
                  <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
                )}

                {isTaskPage && (
                  <OrgNotesDisplay
                    notes={notes}
                    orgDetails={orgDetails}
                    caseType={1}
                  />
                )}
                {/* Check if it's a merchant task page */}
                {isMerchantTaskPage &&
                  // Map over merchantDetails and pass each object to OrgNotesDisplay
                  merchantDetails.map((merchantInfo) => (
                    <OrgNotesDisplay
                      key={merchantInfo.id}
                      notes={notes}
                      orgDetails={merchantInfo}
                      isMerchantTaskPage={isMerchantTaskPage}
                    />
                  ))}

                <center>
                  {isMerchantTaskPage ? (
                    merchantDetails.map((info) => (
                      <OrgContactDetails
                        key={info.id}
                        info={info}
                        isMerchantTaskPage={isMerchantTaskPage}
                      />
                    ))
                  ) : (
                    // <OrgContactDetails info={orgDetails} isMerchantTaskPage={isMerchantTaskPage} />
                    <OrgContactDetails info={orgDetails} />
                  )}
                  <br />
                </center>

                {/* ~~~~~~~~~~ May use later, disabled for now ~~~~~~~~~~ */}
                {/* <div>
                  <OrgNotesModal info={orgDetails} />
                  <AddGroupPopover info={orgDetails} />
                </div> */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                {!isTaskPage && !isMerchantTaskPage && (
                  // Default content when not on the task page
                  <>
                    <OrgDetailsGoalView info={orgDetails} groups={groups} />

                    <div className="OrgDetailsCard-container">
                      {groups &&
                      groups.some((group) => group.group_id !== null) ? (
                        groups.map((groupInfo, i) => (
                          <OrgGroupInfo
                            key={groupInfo.group_id}
                            groupInfo={groupInfo}
                            groupNumber={i + 1}
                          />
                        ))
                      ) : (
                        <div style={{ height: "200px" }}>
                          <Typography variant="h6">
                            No Groups Assigned
                          </Typography>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {isTaskPage && (
                  // Show task-related content on the task page
                  <>
                    <DetailsTaskView />
                    <div style={{ height: "40vh" }}></div>
                  </>
                )}

                {isMerchantTaskPage && (
                  <>
                    <DetailsTaskView caseType={"merchantView"} />

                    {/* REMOVE AFTER COUPON CARD IS INSERTED */}
                    <div className="MerchantDetailsCard-container">
                      <CouponReviewCard />
                      <CouponReviewCard />
                      <CouponReviewCard />
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
