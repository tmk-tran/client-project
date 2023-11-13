import React from "react";
import { Dispatch } from "react";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function ActiveFundraiserItem({ fundraiser }) {
    const dispatch = useDispatch();
    const formatDate = (dateString) => {
        if (!dateString) {
          return " ";
        }
        const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      };   

    const editDetails = () => {
        console.log(fundraiser.id)
    }

    const updateAmount = () => {
        console.log(fundraiser.id)
    }

    return (
        <>
            {fundraiser.closed != true &&
                <TableRow>
                    <TableCell>{fundraiser.title}</TableCell>
                    <TableCell>{fundraiser.description}</TableCell>
                    <TableCell>{fundraiser.requested_book_quantity}</TableCell>
                    <TableCell>{fundraiser.book_quantity_checked_out}</TableCell>
                    <TableCell>{fundraiser.book_checked_out_total_value}</TableCell>
                    <TableCell>{fundraiser.book_quantity_checked_in}</TableCell>
                    <TableCell>{fundraiser.books_sold}</TableCell>
                    <TableCell>{fundraiser.money_received}</TableCell>
                    <TableCell>{formatDate(fundraiser.start_date)}</TableCell>
                    <TableCell>{formatDate(fundraiser.end_date)}</TableCell>
                    <TableCell>{fundraiser.year}</TableCell>
                    <TableCell>{fundraiser.outstanding_balance}</TableCell>
                    <TableCell> <Button onClick={editDetails}>Edit Details</Button> <Button onClick={updateAmount}>Update</Button> <Button onClick={() => dispatch({ type:"CLOSE_FUNDRAISER", payload: { id: Number(fundraiser.id), group_id: Number(fundraiser.group_id)} })}>Close</Button> </TableCell>
                </TableRow>
            }
        </>

    )
}