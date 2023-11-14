import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { MenuItem, Box, Paper, Typography } from "@mui/material";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

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
  const [photoUrl, setPhotoUrl] = useState("");
  const [booksRequested, setBooksRequested] = useState('');
  const [booksCheckedOut, setBooksCheckedOut] = useState('');
  const [booksOutValue, setBooksOutValue] = useState(null);
  const [booksCheckedIn, setBooksCheckedIn] = useState(null);
  const [booksSold, setBooksSold] = useState(null);
  const [moneyReceived, setMoneyRecieved] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [couponBookId, setCouponBookId] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState(0);


  const submitFundraiser = (selectedGroup) => {
    if (!title || !description || !booksRequested || !startDate || !endDate || !couponBookId ){
        Swal.fire({
            title: "Error",
            text: "Please fill out all required fields.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return
    } else{
    const newFundraiser = {
      group_id: selectedGroup,
      title: title,
      description: description,
      photo: photoUrl,
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
    setPhotoUrl("");
    setBooksRequested("");
    setBooksCheckedOut("");
    setStartDate("");
    setEndDate("");
    setCouponBookId("");
    setSelectedOrganizationId("");
    setSelectedGroup("")
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{
            width: "55%",
            marginTop: "20px",
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
            <br />
            <h1 className="fundraiser-form-header">New Fundraiser Form</h1>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "45ch" },
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                  "& .MuiTextField-root": { m: 0.4, width: "45ch" },
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
                      {group.department} -{" "}
                      {group.sub_department || "No Sub Group"}
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
                  {couponBooks.map((couponBook) => {
                    return (
                      <MenuItem value={couponBook.id} key={couponBook.id}>
                        {couponBook.year}
                      </MenuItem>
                    );
                  })}
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
                    fontSize: "22px",
                    color: "black",
                    fontWeight: "bold",
                    fontFamily: "Telugu Sangam MN"
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
                  sx={{ width: "60ch" }}
                />
                <TextField
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  label="Photo URL (optional)"
                  fullWidth
                  sx={{ width: "60ch" }} 
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
                  sx={{ width: "60ch" }} 
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
                    value={booksRequested}
                    onChange={(e) => setBooksRequested(Number(e.target.value))}
                    label="Books Requested"
                    fullWidth
                  />
                    <TextField
                    type="number"
                    value={booksCheckedOut}
                    onChange={(e) => setBooksCheckedOut(Number(e.target.value))}
                    label="Books Checked Out"
                    fullWidth
                  />
                  {/* <TextField
                    type="number"
                    value={booksSold}
                    onChange={(e) => setBooksSold(e.target.value)}
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
                    label="Books Returned"
                    value={booksCheckedIn}
                    onChange={(e) => setBooksCheckedIn(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    value={moneyReceived}
                    onChange={(e) => setMoneyRecieved(e.target.value)}
                    label="Money Received"
                    fullWidth
                  /> */}
                </Box>
                <InputLabel
                  sx={{
                    fontSize: "22px",
                    color: "black",
                    fontWeight: "bold",
                    fontFamily: "Telugu Sangam MN"
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
                  <TextField
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                  />
                  <span style={{ margin: "0 5px" }}>to</span>
                  <TextField
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                  />
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
                onClick={() => submitFundraiser(selectedGroup)}
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
