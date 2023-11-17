import React, { useState } from "react";
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
        const updatedInfo = { id: fundraiser.id, title: editTitle, description: editDescription, group_id: fundraiser.group_id }
        dispatch({ type: "UPDATE_FUNDRAISER", payload: updatedInfo })
        setEditMode(false);
    }

    const updateAmount = () => {
        const updatedAmount = { id: Number(fundraiser.id), newBooksSold: Number(booksSold), newBooksCheckedOut: Number(booksCheckedOut), newBooksCheckedIn: Number(booksCheckedIn), newMoneyReceived: Number(moneyReceived), group_id: Number(fundraiser.group_id) }
        dispatch({ type: "UPDATE_FUNDRAISER_AMOUNTS", payload: updatedAmount });
    }

    return (
        <>
            {editMode === false ? (
                <>
                    {fundraiser.closed != true &&
                        <TableRow style={{ border: "2px solid black" }}>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.title}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.description}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><img style={{ height: "88px", width: "88px" }} src={fundraiser.photo}></img></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={booksCheckedOut} onChange={(e) => setBooksCheckedOut(e.target.value)}>{fundraiser.book_quantity_checked_out}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.book_checked_out_total_value}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}>{fundraiser.book_quantity_checked_in}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}> <Typography style={{ fontSize: "15px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={booksSold} onChange={(e) => setBooksSold(e.target.value)}>{fundraiser.books_sold}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}>{fundraiser.money_received}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.year}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.outstanding_balance}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black" }}>
                                <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={() => setEditMode(true)}><Typography style={{ fontSize: "15px" }}>Edit</Typography></Button>
                                <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={updateAmount}><Typography style={{ fontSize: "15px" }}>Update</Typography></Button>
                                <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={() => dispatch({ type: "CLOSE_FUNDRAISER", payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id) } })}><Typography style={{ fontSize: "15px" }}>Close</Typography></Button> </TableCell>
                        </TableRow>

                    }
                </>) : (
                <>
                    {fundraiser.closed != true &&
                        <TableRow style={{ border: "2px solid black" }}>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={editTitle} onChange={(e) => setEditTitle(e.target.value)}>{fundraiser.title}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={editDescription} onChange={(e) => setEditDescription(e.target.value)}>{fundraiser.description}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><img style={{ height: "88px", width: "88px" }} src={fundraiser.photo}></img></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.book_quantity_checked_out}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.book_checked_out_total_value}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.book_quantity_checked_in}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}> <Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.books_sold}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.money_received}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.year}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.outstanding_balance}</Typography></TableCell>
                            <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}> <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={handleSubmit}><Typography style={{ fontSize: "15px" }}>Submit</Typography></Button> <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={updateAmount}><Typography style={{ fontSize: "15px" }}>Update</Typography></Button> <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={() => dispatch({ type: "CLOSE_FUNDRAISER", payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id) } })}><Typography style={{ fontSize: "15px" }}>Close</Typography></Button> </TableCell>
                        </TableRow>
                    }
                </>)
            }
        </>

    )
}