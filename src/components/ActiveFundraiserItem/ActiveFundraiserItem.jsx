import React, {useState} from "react";
import { Button, OutlinedInput, TableCell, TableRow, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function ActiveFundraiserItem({ fundraiser }) {
    const dispatch = useDispatch();
    let [booksSold, setBooksSold] = useState(fundraiser.books_sold)
    let [booksCheckedOut, setBooksCheckedOut] = useState(fundraiser.book_quantity_checked_out)
    let [booksCheckedIn, setBooksCheckedIn] = useState(fundraiser.book_quantity_checked_in)
    let [moneyReceived, setMoneyRecieved] = useState(fundraiser.money_received)
    let [editMode, setEditMode] = useState(false)
    let [editTitle, setEditTitle] = useState(fundraiser.title)
    let [editDescription, setEditDescription] = useState(fundraiser.description)

    const formatDate = (dateString) => {
        if (!dateString) {
          return " ";
        }
        const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      };   

    const handleSubmit = () => {
        const updatedInfo = { id: fundraiser.id, title: editTitle, description: editDescription, group_id: fundraiser.group_id}
        dispatch({ type: "UPDATE_FUNDRAISER", payload: updatedInfo})
        setEditMode(false);
    }

    const updateAmount = () => {
        const updatedAmount = { id: Number(fundraiser.id), newBooksSold: Number(booksSold), newBooksCheckedOut: Number(booksCheckedOut), newBooksCheckedIn: Number(booksCheckedIn), newMoneyReceived: Number(moneyReceived), group_id: Number(fundraiser.group_id)}
        dispatch({ type: "UPDATE_FUNDRAISER_AMOUNTS", payload: updatedAmount });
    }

    return (
        <>
            {editMode === false ? ( 
                <>
            {fundraiser.closed != true &&
                <TableRow style={{border: "2px solid black"}}>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.title}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.description}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><img src={fundraiser.photo}></img></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}><OutlinedInput value={booksCheckedOut} onChange={(e) => setBooksCheckedOut(e.target.value)}>{fundraiser.book_quantity_checked_out}</OutlinedInput></Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.book_checked_out_total_value}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}><OutlinedInput value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}>{fundraiser.book_quantity_checked_in}</OutlinedInput></Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}> <Typography style={{fontSize: "15px", width: "100px"}}><OutlinedInput value={booksSold} onChange={(e) => setBooksSold(e.target.value)}>{fundraiser.books_sold}</OutlinedInput></Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}><OutlinedInput  style={{fontSize: "15px", width: "65px"}} value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}>{fundraiser.money_received}</OutlinedInput></Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.year}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Typography style={{fontSize: "15px", width: "100px"}}>{fundraiser.outstanding_balance}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black"}}><Button onClick={() => setEditMode(true)}>Edit Details</Button> <Button onClick={updateAmount}>Update</Button><Typography style={{fontSize: "15px", width: "100px"}}><Button onClick={() => dispatch({ type:"CLOSE_FUNDRAISER", payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id)} })}>Close</Button></Typography> </TableCell>
                </TableRow>
                
            } 
            </>) : ( 
                <>
                {fundraiser.closed != true &&
                <TableRow style={{border: "2px solid black"}}>
                    <TableCell style={{border: "2px solid black"}}><OutlinedInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)}>{fundraiser.title}</OutlinedInput></TableCell>
                    <TableCell style={{border: "2px solid black"}}><OutlinedInput value={editDescription} onChange={(e) => setEditDescription(e.target.value)}>{fundraiser.description}</OutlinedInput></TableCell>
                    <TableCell style={{border: "2px solid black"}}><img src={fundraiser.photo}></img></TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.requested_book_quantity}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.book_quantity_checked_out}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.book_checked_out_total_value}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.book_quantity_checked_in}</TableCell>
                    <TableCell style={{border: "2px solid black"}}> {fundraiser.books_sold}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.money_received}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{formatDate(fundraiser.start_date)}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{formatDate(fundraiser.end_date)}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.year}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.outstanding_balance}</TableCell>
                    <TableCell style={{border: "2px solid black"}}> <Button onClick={handleSubmit}>Submit</Button> <Button onClick={updateAmount}>Update</Button> <Button onClick={() => dispatch({ type:"CLOSE_FUNDRAISER", payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id)} })}>Close</Button> </TableCell>
                </TableRow>
            }
            </>)
            }
        </>

    )
}