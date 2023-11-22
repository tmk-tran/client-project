import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Box, Paper, Typography } from "@mui/material";
import { Button, TextField, CardContent } from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";

export default function GlobalFundraiserInput() {
  const dispatch = useDispatch();

  const organizations = useSelector((store) => store.organizations);
  const groupList = useSelector((store) => store.allGroups);
  const couponBooks = useSelector((store) => store.couponBooks);

  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    dispatch({
      type: "FETCH_ALL_GROUPS",
    });
  }, []);

  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleOrganizationChange = (event) => {
    setSelectedOrganizationId(event.target.value);
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };
  const filteredGroups = groupList.filter(
    (group) => group.organization_id === selectedOrganizationId
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [booksRequested, setBooksRequested] = useState("");
  const [booksCheckedOut, setBooksCheckedOut] = useState("");
  const [booksOutValue, setBooksOutValue] = useState(null);
  const [booksCheckedIn, setBooksCheckedIn] = useState(null);
  const [booksSold, setBooksSold] = useState(null);
  const [moneyReceived, setMoneyReceived] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [couponBookId, setCouponBookId] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  const submitFundraiser = (selectedGroup) => {
    if (
      !title ||
      !description ||
      !booksRequested ||
      !startDate ||
      !endDate ||
      !couponBookId
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      const newFundraiser = {
        group_id: selectedGroup,
        title: title,
        description: description,
        goal: goal,
        requested_book_quantity: booksRequested,
        book_quantity_checked_out: booksCheckedOut,
        book_checked_out_total_value: booksOutValue,
        book_quantity_checked_in: booksCheckedIn,
        books_sold: booksSold,
        money_received: moneyReceived,
        start_date: startDate,
        end_date: endDate,
        coupon_book_id: couponBookId,
        outstanding_balance: outstandingBalance,
      };
      dispatch({ type: "ADD_FUNDRAISER", payload: newFundraiser });
      Swal.fire({
        title: "Fundraiser Added!",
        text: "Your fundraiser has been successfully added.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTitle("");
      setDescription("");
      setGoal("");
      setBooksRequested("");
      setBooksCheckedOut("");
      setStartDate("");
      setEndDate("");
      setCouponBookId("");
      setSelectedOrganizationId("");
      setSelectedGroup("");
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{
            width: "55%",
            marginTop: "20px",
            minWidth: "390px",
          }}
        >
          <center>
            <br />
            <CardContent>
              <Typography
                variant="h5"
                className="organization-header"
                style={{ fontWeight: "bold" }}
              >
                New Fundraiser Form
              </Typography>
              <Typography
                sx={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "black",
                  marginBottom: "0px",
                  marginTop: "-25px",
                  fontFamily: "Telugu Sangam MN",
                }}
              >
                <br /> Step 1: Select Organization, Group, and Book Year <br />{" "}
                Step 2: Fill out Fundraiser Details and Submit <br />{" "}
                <strong>
                  ** Only Organizations with existing groups will be displayed
                  **
                </strong>
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5px",
                "& .MuiTextField-root": { m: 0.4, width: "60%" },
              }}
            >
              <TextField
                select
                label="Select an Organization"
                id="serviceSelect"
                value={selectedOrganizationId}
                onChange={handleOrganizationChange}
                fullWidth
              >
                {organizations
                  .filter((organization) => organization.total_groups > 0)
                  .map((organization, index) => (
                    <MenuItem key={organization.id} value={organization.id}>
                      {organization.organization_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            {selectedOrganizationId ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "60%" },
                }}
              >
                <TextField
                  select
                  label="Select a Group"
                  id="serviceSelect"
                  fullWidth
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  {filteredGroups?.map((group, index) => (
                    <MenuItem key={group.id} value={group.id}>
                      {capitalizeFirstLetter(group.department)} -{" "}
                      {capitalizeFirstLetter(group.sub_department) ||
                        "No Sub Group"}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  sx={{ width: "45ch" }}
                  label="Coupon Book Year"
                  value={couponBookId}
                  onChange={(e) => setCouponBookId(e.target.value)}
                >
                  {couponBooks
                    .sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10))
                    .map((couponBook) => (
                      <MenuItem value={couponBook.id} key={couponBook.id}>
                        {couponBook.year}
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                }}
              ></Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5px",
                "& .MuiTextField-root": { m: 0.4, width: "80%" },
              }}
            >
              <InputLabel
                sx={{
                  fontSize: "22px",
                  color: "black",
                  fontWeight: "bold",
                  fontFamily: "Telugu Sangam MN",
                }}
              >
                Fundraiser Details:
              </InputLabel>
              <TextField
                type="text"
                label="Fundraiser Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="$ Fundraiser Financial Goal"
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                fullWidth
              />
              <TextField
                multiline
                rows={2}
                label="Description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "& .MuiTextField-root": { m: 0.4 },
              }}
            >
              <TextField
                type="number"
                value={booksRequested}
                onChange={(e) => setBooksRequested(Number(e.target.value))}
                label="Books Requested"
                fullWidth
                style={{ marginLeft: "10.5%" }}
              />
              <TextField
                type="number"
                value={booksCheckedOut}
                onChange={(e) => setBooksCheckedOut(Number(e.target.value))}
                label="Books Checked Out"
                fullWidth
                style={{ marginRight: "10.5%" }}
              />
            </Box>
            <InputLabel
              sx={{
                fontSize: "22px",
                color: "black",
                fontWeight: "bold",
                fontFamily: "Telugu Sangam MN",
                marginTop: "10px",
              }}
            >
              Start and End Date:
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "5px",
                "& .MuiTextField-root": { m: 0.4 },
              }}
            >
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                style={{ marginLeft: "10%" }}
              />
              <span style={{ margin: "0 5px" }}>to</span>
              <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                style={{ marginRight: "10%" }}
              />
            </Box>
            <br />
            <br />
            <Button
              variant="contained"
              style={{
                color: "white",
                fontSize: "16px",
                marginTop: "0px",
              }}
              sx={{ padding: "10px 28px" }}
              onClick={() => submitFundraiser(selectedGroup)}
            >
              Submit
            </Button>
          </center>
          <br />
        </Paper>
      </div>
    </div>
  );
}
