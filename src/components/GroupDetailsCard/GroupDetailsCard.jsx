import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, CardMedia, Modal, Typography, InputLabel, TextField, Select, MenuItem, Grid } from "@mui/material";
import  {modalBtnStyle} from "../Utils/helpers"


//Function for the component, takes in the group prop for use
export default function GroupDetailsCard({ group }) {
   //Instanciates history and dispatch for use in the component
   const history = useHistory()
   const dispatch = useDispatch()
   //Selector for the coupon books. Used to grab the year of the coupon book in the dropdown menu
   const couponBooks = useSelector((store) => store.couponBooks)
   //State used for the modal add fundraiser form
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   //State used for the inputs in the modal add fundraiser form, set by on change eventes
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [photoUrl, setPhotoUrl] = useState("")
   const [booksRequested, setBooksRequested] = useState("")
   const [booksCheckedOut, setBooksCheckedOut] = useState("")
   const [booksCheckedIn, setBooksCheckedIn] = useState("")
   const [booksSold, setBooksSold] = useState("")
   const [moneyReceived, setMoneyRecieved] = useState("")
   const [startDtate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [couponBookId, setCouponBookId] = useState("")
   //Function that runs on click of the submit button in add fundraiser form. This creates a new objcet that is sent to the back end to be added to the database and resets the state of the inputs in the form and closes the modal.
   const submitFundraiser = (e) => {
      e.preventDefault;
      const newFundraiser = { group_id: group.id, title: title, description: description, photo: photoUrl, requested_book_quantity: booksRequested, book_quantity_checked_out: booksCheckedOut, book_quantity_checked_in: booksCheckedIn, books_sold: booksSold, money_received: moneyReceived, start_date: startDtate, end_date: endDate, coupon_book_id: couponBookId }
      console.log(newFundraiser);
      dispatch({ type: "ADD_FUNDRAISER", payload: newFundraiser });
      setTitle("");
      setDescription("");
      setPhotoUrl("")
      setBooksRequested("");
      setBooksCheckedOut("");
      setBooksCheckedIn("");
      setBooksSold("");
      setMoneyRecieved("");
      setStartDate("");
      setEndDate("");
      setCouponBookId("");
      setOpen(false)
   }

   //Style used for the modal
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

   //Elements and data used in the component. Displays the group card and the add fundraiser modal 
   return (
      <>
         <Card elevation={6} style={{ display: "flex", flexDirection: "column", padding: "10px", paddingTop:"30px", paddingBottom: "30px", width: "500px", margin: "auto" }}>
            <CardMedia style={{ objectFit: "cover", margin: "auto" }}
               className="cardMedia"
               component="img"
               image={group.group_photo} />
            <div style={{ margin: "auto" }}>
               <Typography variant="h5">{group.department} {group.sub_department}</Typography>
               <Typography>{group.group_description}</Typography>
            </div>
            <div style={modalBtnStyle} >
               <Button   variant="outlined" onClick={() => history.goBack()}><Typography style={{ fontSize: "15px" }}>Back</Typography></Button> <Button variant="outlined" onClick={handleOpen}><Typography style={{ fontSize: "15px" }}>Add Fundraiser</Typography></Button>
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
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Checked In" type="number" placeholder="Books Checked In" value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}></TextField>
                        </Grid>
                     </Grid>
                  </div>
                  <div>
                     <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                           <TextField fullWidth style={{ margin: "5px" }} label="Books Sold" type="number" placeholder="Books Sold" value={booksSold} onChange={(e) => setBooksSold(e.target.value)}></TextField>
                           </Grid>
                          
                        </Grid>
                  </div>
                  <div>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                           <InputLabel >Coupon Book Year</InputLabel>
                           <Select fullWidth style={{ margin: "5px" }}  value={couponBookId} onChange={(e) => setCouponBookId(e.target.value)}>
                              <MenuItem value="" disabled>Please Select A Coupon Book Year</MenuItem>
                              {couponBooks.map(couponBook => {
                                 return (<MenuItem value={couponBook.id} key={couponBook.id}>{couponBook.year}</MenuItem>)
                              })}
                           </Select>
                        </Grid>
                  <Grid item xs={6}>
                           <InputLabel>Money Received</InputLabel>
                           <TextField fullWidth style={{ margin: "5px", marginRight: "0" }} type="number" placeholder="Money Received" value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}></TextField>
                        </Grid>
                        </Grid>
                  </div>
                  <div>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                       
                        <Grid item xs={6}>
                           <InputLabel>Start Date</InputLabel>
                           <TextField fullWidth style={{ margin: "5px", marginLeft: "0" }} type="date" value={startDtate} onChange={(e) => setStartDate(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                           <InputLabel>End Date</InputLabel>
                           <TextField fullWidth style={{ margin: "5px" }} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}></TextField>
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