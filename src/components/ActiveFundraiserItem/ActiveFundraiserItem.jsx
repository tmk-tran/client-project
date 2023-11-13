import React from "react";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

export default function ActiveFundraiserItem({ fundraiser }) {
    const formatDate = (dateString) => {
        if (!dateString) {
          return " ";
        }
        const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      };   
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
                    <TableCell> <Button>Edit Details</Button> <Button>Update</Button> <Button>Close</Button> </TableCell>
                </TableRow>
            }
        </>

    )
}