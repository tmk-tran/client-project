//Imports used for function
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import "./ClosedFundraiserItem.css"
//Function to render the component, takes in the fundraiser prop
export default function ClosedFundraiserItem({ fundraiser }) {
    //Function to format the data without the timestamp
    const formatDate = (dateString) => {
        if (!dateString) {
            return " ";
        }
        const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };
    //Elements used in component, conditionally renders data if the fundraiser is set to closed
    return (
        <>
            {fundraiser.closed != false &&
                <TableRow className="closed_row" style={{ border: "2px solid black" }}>
                    <TableCell className="closed_item_cell" ><Typography style={{ fontSize: "15px", width: "100px" }}>{fundraiser.title}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px", wordWrap: "wrap" }}>{fundraiser.requested_book_quantity}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{fundraiser.books_sold}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{fundraiser.money_received}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{fundraiser.year}</Typography></TableCell>
                    <TableCell className="closed_item_cell"><Typography style={{ fontSize: "15px", width: "100px" }}>{fundraiser.outstanding_balance}</Typography></TableCell>
                </TableRow>
            }
        </>

    )
}