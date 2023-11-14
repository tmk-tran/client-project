import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {Box, Button, Card, CardMedia, Modal, Typography, FormControl, OutlinedInput, InputLabel, TextField, Select, MenuItem} from "@mui/material";


export default function GroupDetailsCard({ group }) {
   const history = useHistory()
   const couponBooks = useSelector((store) => store.couponBooks)
   const [couponBookYear, setCouponBookYear] = useState("")
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [booksRequested, setBooksRequested] = useState("")
   const [booksCheckedOut, setBooksCheckedOut] = useState("")
   const [booksOutValue, setBooksOutValue] = useState(0)
   const [booksCheckedIn, setBooksCheckedIn] = useState(0)
   const [booksSold, setBooksSold] = useState(0)
   const [moneyReceived, setMoneyRecieved] = useState(0)
   const [startDtate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [couponBookId, setCouponBookId] = useState("")
   const [outstandingBalance, setOutstandingBalance] = useState(0)

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


return(
   <Card>
      <CardMedia style={{ objectFit: "cover" }}
            className="cardMedia"
            component="img"
            image={group.group_photo} />
      <Typography variant="h5">{group.department} {group.sub_department}</Typography>
      <Typography>{group.group_description}</Typography>
      <Button onClick={() => history.goBack()}>Back</Button> <Button onClick={handleOpen}>Add Fundraiser</Button> 
      <Modal open={open} onClose={handleClose}  aria-labelledby="title"
        aria-describedby="form">
         <Box sx={style}>
         <Typography>Add A Fundraiser</Typography>
            <form>
               <FormControl>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput label="Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <OutlinedInput label="Description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_requested">Books Requested</InputLabel>
                  <OutlinedInput label="Books Requested" type="text" placeholder="Books Requested" value={booksRequested} onChange={(e) => setBooksRequested(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_checked_out">Books Checked Out</InputLabel>
                  <OutlinedInput label="Books Checked Out" type="number" placeholder="Books Checked Out" value={booksCheckedOut} onChange={(e) => setBooksCheckedOut(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_out_value">Books Out Value</InputLabel>
                  <OutlinedInput label="Books Out Value" type="number" placeholder="Books Out Value" value={booksOutValue} onChange={(e) => setBooksOutValue(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_checked_in">Books Checked In</InputLabel>
                  <OutlinedInput label="Books Checked In" type="number" placeholder="Books Checked In" value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_sole">Books Sold</InputLabel>
                  <OutlinedInput label="Books Sold" type="number" placeholder="Books Sold" value={booksSold} onChange={(e) => setBooksSold(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="money_received">Money Received</InputLabel>
                  <OutlinedInput label="Money Received" type="number" placeholder="Money Received" value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="start_date"></InputLabel>
                  <TextField  type="date" value={startDtate} onChange={(e) => setStartDate(e.target.value)}></TextField>
               </FormControl>
               <FormControl>
                  <InputLabel></InputLabel>
                  <TextField type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}></TextField>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="coupon-book">Select A Coupon Book Year</InputLabel>
                  <Select style={{width: "250px"}} label="Select A Coupon Book Year" value={couponBookId} onChange={(e) => setCouponBookId(e.target.value)}>
                     <MenuItem value="" disabled>Please Select A Coupon Book Year</MenuItem>
                     {couponBooks.map(couponBook => {
                        return (<MenuItem value={couponBook.id} key={couponBook.id}>{couponBook.year}</MenuItem>)
                     })}
                  </Select>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="outstanding_balance">Outstanding Balance</InputLabel>
                  <OutlinedInput lable="Outstanding Balance" type="number" placeholder="Outstanding Balance" value={outstandingBalance} onChange={(e) => setOutstandingBalance(e.target.value)}></OutlinedInput>
               </FormControl>
               <Button>Submit</Button>
            </form>
         </Box>
      </Modal>
   </Card>
)
}