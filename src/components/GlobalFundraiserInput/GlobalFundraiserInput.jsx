import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { InputLabel } from "@mui/material";
import { MenuItem, Box, Paper } from "@mui/material";
import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

export default function GlobalFundraiserInput() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const fundraiserList = useSelector((store) => store);
  const organizations = useSelector((store) => store.organizations);

  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    dispatch({
      type: "FETCH_INVOICE_DETAILS",
    });
  }, []);

  return (
    <div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{
            width: "55%",
            marginTop: "30px",
            minWidth: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <center>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "45ch" },
                }}
              >
                <br />
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Select an Organization:
                </InputLabel>
                <TextField
                  select
                  label="Select an Organization"
                  id="serviceSelect"
                  fullWidth
                >
                  {organizations?.map((organization, index) => (
                    <MenuItem key={organization.id} value={organization.id}>
                      {organization.organization_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "45ch" },
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Select a Group:
                </InputLabel>
                <TextField
                  select
                  label="Select a Group"
                  id="serviceSelect"
                  fullWidth
                >
                  {organizations?.map((organization, index) => (
                    <MenuItem key={organization.id} value={organization.id}>
                      {organization.organization_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4 },
                }}
              >
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Fundraiser Information:
                </InputLabel>
                <TextField
                  type="text"
                  id="service_price"
                  label="Fundraiser Name"
                  fullWidth
                  sx={{ width: "60ch" }}
                />
                <TextField
                  type="text"
                  id="service_price"
                  label="Photo URL (optional)"
                  fullWidth
                  sx={{ width: "60ch" }} // Adjusted width for Photo URL
                />
                <TextField
                  multiline
                  rows={2}
                  type="text"
                  id="service_price"
                  label="Description"
                  fullWidth
                  sx={{ width: "60ch" }} // Adjusted width for Description
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    type="number"
                    id="service_price"
                    label="Books Requested"
                    fullWidth
                    
                  />
                  <TextField
                    type="number"
                    id="service_price"
                    label="Books Sold"
                    fullWidth
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    type="number"
                    id="service_price"
                    label="Books Returned"
                    fullWidth
                    
                  />
                  <TextField
                    type="number"
                    id="service_price"
                    label="Money Received"
                    fullWidth
                  />
                </Box>
                <InputLabel
                  sx={{
                    fontWeight: "normal",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Start and End Date:
                </InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField type="date" id="service_price" fullWidth />
                  <span style={{ margin: "0 5px" }}>to</span>
                  <TextField type="date" id="service_price" fullWidth />
                </Box>
              </Box>
              <br />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#DAA226",
                  color: "white",
                  fontSize: "16px",
                  marginTop: "0px",
                }}
                sx={{ padding: "10px 28px" }}
              >
                Add Fundraiser
              </Button>
            </center>
          </div>
          <br />
        </Paper>
      </div>
    </div>
  );
}
