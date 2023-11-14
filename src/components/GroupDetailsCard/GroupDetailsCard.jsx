import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Box, Button, Card, CardMedia, Modal, Typography, FormControl, OutlinedInput, InputLabel, TextField, Select} from "@mui/material";


export default function GroupDetailsCard({ group }) {
   const history = useHistory()
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

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
                  <OutlinedInput label="Title" type="text" placeholder="Title"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <OutlinedInput label="Description" type="text" placeholder="Description"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_requested">Books Requested</InputLabel>
                  <OutlinedInput label="Books Requested" type="text" placeholder="Books Requested"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_checked_out">Books Checked Out</InputLabel>
                  <OutlinedInput label="Books Checked Out" type="number" placeholder="Books Checked Out"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_out_value">Books Out Value</InputLabel>
                  <OutlinedInput label="Books Out Value" type="number" placeholder="Books Out Value"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_checked_in">Books Checked In</InputLabel>
                  <OutlinedInput label="Books Checked In" type="number" placeholder="Books Checked In"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="books_sole">Books Sold</InputLabel>
                  <OutlinedInput label="Books Sold" type="number" placeholder="Books Sold"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="money_received">Money Received</InputLabel>
                  <OutlinedInput label="Money Received" type="number" placeholder="Money Received"></OutlinedInput>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="start_date"></InputLabel>
                  <TextField  type="date" ></TextField>
               </FormControl>
               <FormControl>
                  <InputLabel></InputLabel>
                  <TextField type="date"></TextField>
               </FormControl>
               <FormControl>
                  <InputLabel></InputLabel>
                  <Select>
                     
                  </Select>
               </FormControl>
               <FormControl>
                  <InputLabel htmlFor="outstanding_balance">Outstanding Balance</InputLabel>
                  <OutlinedInput lable="Outstanding Balance" type="number" placeholder="Outstanding Balance"></OutlinedInput>
               </FormControl>
            </form>
         </Box>
      </Modal>
   </Card>
)
}