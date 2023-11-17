import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, CardMedia, Modal, Typography, FormControl, OutlinedInput, InputLabel, TextField, Select, MenuItem, Grid } from "@mui/material";
import { style } from "../Utils/helpers";


export default function GroupDetailsCard({ group }) {
   const history = useHistory()
   const dispatch = useDispatch()
   const couponBooks = useSelector((store) => store.couponBooks)

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [photoUrl, setPhotoUrl] = useState("")
   const [booksRequested, setBooksRequested] = useState("")
   const [booksCheckedOut, setBooksCheckedOut] = useState("")
   const [booksOutValue, setBooksOutValue] = useState("")
   const [booksCheckedIn, setBooksCheckedIn] = useState("")
   const [booksSold, setBooksSold] = useState("")
   const [moneyReceived, setMoneyRecieved] = useState("")
   const [startDtate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [couponBookId, setCouponBookId] = useState("")
   const [outstandingBalance, setOutstandingBalance] = useState("")

   const submitFundraiser = (e) => {
      e.preventDefault;
      const newFundraiser = { group_id: group.id, title: title, description: description, photo: photoUrl, requested_book_quantity: booksRequested, book_quantity_checked_out: booksCheckedOut, book_checked_out_total_value: booksOutValue, book_quantity_checked_in: booksCheckedIn, books_sold: booksSold, money_received: moneyReceived, start_date: startDtate, end_date: endDate, coupon_book_id: couponBookId, outstanding_balance: outstandingBalance }
      console.log(newFundraiser);
      dispatch({ type: "ADD_FUNDRAISER", payload: newFundraiser });
      setTitle("");
      setDescription("");
      setPhotoUrl("")
      setBooksRequested("");
      setBooksCheckedOut("");
      setBooksOutValue(0);
      setBooksCheckedIn(0);
      setBooksSold(0);
      setMoneyRecieved(0);
      setStartDate("");
      setEndDate("");
      setCouponBookId("");
      setOutstandingBalance(0);
      setOpen(false)
   }


   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };


   return (
      <>
         <Card elevation={6} style={{ display: "flex", flexDirection: "column", padding: "10px", width: "600px", margin: "auto" }}>
            <CardMedia style={{ objectFit: "cover", width: "300px", height: "300px", margin: "auto" }}
               className="cardMedia"
               component="img"
               image={group.group_photo} />
            <div style={{ margin: "auto" }}>
               <Typography variant="h5">{group.department} {group.sub_department}</Typography>
               <Typography>{group.group_description}</Typography>
            </div>
            <div style={{
               margin: "auto "
            }}>
               <Button variant="outlined" onClick={() => history.goBack()}>Back</Button> <Button variant="outlined" onClick={handleOpen}>Add Fundraiser</Button>
            </div>
         </Card>
         <Modal open={open} onClose={handleClose} aria-labelledby="title"
            aria-describedby="form">
            <Box sx={style} >
               <Typography style={{ textAlign: "center" }} variant="h5">Add A Fundraiser</Typography>

               <form onSubmit={submitFundraiser}>

                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <TextField style={{ margin: "5px" }} fullWidth label="Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                           <TextField style={{ margin: "5px" }} fullWidth label="Description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}>
                           </TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Photo URL" type="text" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Requested" type="text" placeholder="Books Requested" value={booksRequested} onChange={(e) => setBooksRequested(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Checked Out" type="number" placeholder="Books Checked Out" value={booksCheckedOut} onChange={(e) => setBooksCheckedOut(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Out Value" type="number" placeholder="Books Out Value" value={booksOutValue} onChange={(e) => setBooksOutValue(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Checked In" type="number" placeholder="Books Checked In" value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Sold" type="number" placeholder="Books Sold" value={booksSold} onChange={(e) => setBooksSold(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4}>
                           <InputLabel>Money Received</InputLabel>
                           <TextField style={{ margin: "5px", marginRight: "0" }} type="number" placeholder="Money Received" value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={4}>
                           <InputLabel>Start Date</InputLabel>
                           <TextField style={{ margin: "5px", marginLeft: "0" }} type="date" value={startDtate} onChange={(e) => setStartDate(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={4}>
                           <InputLabel>End Date</InputLabel>
                           <TextField style={{ margin: "5px" }} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <InputLabel htmlFor="coupon-book">Coupon Book Year</InputLabel>
                           <Select fullWidth style={{ margin: "5px" }} label="Select A Coupon Book Year" value={couponBookId} onChange={(e) => setCouponBookId(e.target.value)}>
                              <MenuItem value="" disabled>Please Select A Coupon Book Year</MenuItem>
                              {couponBooks.map(couponBook => {
                                 return (<MenuItem value={couponBook.id} key={couponBook.id}>{couponBook.year}</MenuItem>)
                              })}
                           </Select>
                        </Grid>
                        <Grid item xs={6}>
                           <InputLabel>Outstanding Balance</InputLabel>
                           <TextField fullWidth style={{ margin: "5px" }} type="number" placeholder="Outstanding Balance" value={outstandingBalance} onChange={(e) => setOutstandingBalance(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <Button type="submit" variant="contained" style={{ margin: "5px" }}>Submit</Button>
               </form>
            </Box>
         </Modal>
      </>
   )
}