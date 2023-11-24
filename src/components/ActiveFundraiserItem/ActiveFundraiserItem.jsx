//Imports used in the component
import React, { useState } from "react";
import { Button, OutlinedInput, TableCell, TableRow, Typography, InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./ActiveFundraiserItem.css"
//Function for the component
export default function ActiveFundraiserItem({ fundraiser }) {
    //Instanciates dispatch for use in component
    const dispatch = useDispatch();
    //State used to update fundraiser information
    let [booksSold, setBooksSold] = useState(fundraiser.books_sold)
    let [booksCheckedOut, setBooksCheckedOut] = useState(fundraiser.book_quantity_checked_out)
    let [booksCheckedIn, setBooksCheckedIn] = useState(fundraiser.book_quantity_checked_in)
    let [moneyReceived, setMoneyRecieved] = useState(fundraiser.money_received)
    let [goal, setGoal] = useState(fundraiser.goal)
    let [editMode, setEditMode] = useState(false)
    let [editTitle, setEditTitle] = useState(fundraiser.title)
    //Function that formates the date and removes the timestamp
    const formatDate = (dateString) => {
        // if (!dateString) {
        //     return " ";
        // }
        // const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        // const options = { year: "numeric", month: "long", day: "numeric" };
        // return date.toLocaleDateString(undefined, options);
        if (!dateString) {
            return " ";
        }
        const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
        return date.toLocaleDateString(undefined, options);
    };
    //Funstion rins on click of the submit button when title and description are updated. Builds a new object with that data and sends it to the back end.
    const handleSubmit = () => {
        const updatedInfo = { id: fundraiser.id, title: editTitle, group_id: fundraiser.group_id }
        Swal.fire(
            'Updated!',
            'The fundraiser has been updated.',
            'success'
        )
        dispatch({ type: "UPDATE_FUNDRAISER", payload: updatedInfo })
        setEditMode(false);
    }
    //Function that runs when the update button is clicked. Builds a new object with the updated data and sends it to the back end to be updated in the database
    const updateAmount = () => {

        const updatedAmount = { id: Number(fundraiser.id), newBooksSold: Number(booksSold), newBooksCheckedOut: Number(booksCheckedOut), newBooksCheckedIn: Number(booksCheckedIn), newMoneyReceived: Number(moneyReceived), newGoal: Number(goal), group_id: Number(fundraiser.group_id) }
        Swal.fire(
            'Updated!',
            'The fundraiser amounts have been updated.',
            'success'
        )
        dispatch({ type: "UPDATE_FUNDRAISER_AMOUNTS", payload: updatedAmount });
    }

    const handleCloseFundraiser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This fundraiser will be closed.",
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Closed!',
                    'The fundraiser has been closed.',
                    'success'
                )
                dispatch({
                    type: "CLOSE_FUNDRAISER",
                    payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id) }
                })
            }
        })

    }

    //Elements used in this component. Conditionally renders the table based on edit mode state and if the fundraiser is currently closed or active
    return (
        <>
            {editMode === false ? (
                <>
                    {fundraiser.closed != true &&
                        <TableRow className="active_row" style={{ border: "2px solid black" }}>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>{fundraiser.title}</Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}><OutlinedInput style={{ fontSize: "15px", width: "60px", height: "30px" }} value={booksCheckedOut} onChange={(e) => setBooksCheckedOut(e.target.value)}>{fundraiser.book_quantity_checked_out}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>${fundraiser.book_checked_out_total_value}</Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}><OutlinedInput style={{ fontSize: "15px", width: "60px", height: "30px" }} value={booksCheckedIn} onChange={(e) => setBooksCheckedIn(e.target.value)}>{fundraiser.book_quantity_checked_in}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}><OutlinedInput style={{ fontSize: "15px", width: "60px", height: "30px" }} value={booksSold} onChange={(e) => setBooksSold(e.target.value)}>{fundraiser.books_sold}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}><OutlinedInput style={{ fontSize: "15px", width: "83px", height: "30px" }} startAdornment={<InputAdornment position="start">$</InputAdornment>} value={moneyReceived} onChange={(e) => setMoneyRecieved(e.target.value)}>{fundraiser.money_received}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>{formatDate(fundraiser.start_date)} to {formatDate(fundraiser.end_date)}</Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>{fundraiser.year}</Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}><OutlinedInput style={{ fontSize: "15px", width: "83px", height: "30px" }} startAdornment={<InputAdornment position="start">$</InputAdornment>} value={goal} onChange={(e) => setGoal(e.target.value)}>{fundraiser.goal}</OutlinedInput></Typography></TableCell>
                            <TableCell style={{ width: "50px", border: "2px solid black"}} ><Typography style={{ fontSize: "15px", textAlign: "center", padding: "0" }}>${fundraiser.outstanding_balance}</Typography></TableCell>
                            <TableCell style={{ width: "120px", border: "2px solid black", textAlign: "center" }}>
                                {/* <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={() => setEditMode(true)}><Typography style={{ fontSize: "12px" }}>Edit</Typography></Button> */}
                                <Button style={{ margin: "0px", backgroundColor: "red", fontSize: "11px"  }} variant="contained" size="small" onClick={handleCloseFundraiser}>Close</Button> 
                                <Button style={{ marginLeft: "3px", fontSize: "11px" }} variant="contained" size="small" onClick={updateAmount}>Update</Button></TableCell>
                        </TableRow>

                    }
                </>) : (
                <>
                    {fundraiser.closed != true &&
                        <TableRow className="active_row" style={{ border: "2px solid black" }}>
                            <TableCell className="active_table_cell"   ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}><OutlinedInput style={{ fontSize: "15px", width: "100px", height: "40px" }} value={editTitle} onChange={(e) => setEditTitle(e.target.value)}>{fundraiser.title}</OutlinedInput></Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{fundraiser.book_quantity_checked_out}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>${fundraiser.book_checked_out_total_value}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{fundraiser.book_quantity_checked_in}</Typography></TableCell>
                            <TableCell className="active_table_cell"  > <Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{fundraiser.books_sold}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>${fundraiser.money_received}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>{fundraiser.year}</Typography></TableCell>
                            <TableCell className="active_table_cell" ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>${fundraiser.goal}</Typography></TableCell>
                            <TableCell className="active_table_cell"  ><Typography style={{ fontSize: "15px", width: "88px", textAlign: "center" }}>${fundraiser.outstanding_balance}</Typography></TableCell>
                            <TableCell className="active_table_cell"  > <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={handleSubmit}><Typography style={{ fontSize: "12px" }}>Submit</Typography></Button> <Button style={{ margin: "2px" }} variant="contained" size="small" onClick={updateAmount}><Typography style={{ fontSize: "12px" }}>Update</Typography></Button> <Button style={{ margin: "2px", backgroundColor: "red" }} variant="contained" size="small" onClick={handleCloseFundraiser}><Typography style={{ fontSize: "12px" }}>Close</Typography></Button> </TableCell>
                        </TableRow>
                    }
                </>)
            }
        </>

    )
}