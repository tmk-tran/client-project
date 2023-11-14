import React from "react";
import { TableCell, TableRow } from "@mui/material";

export default function ClosedFundraiserItem({ fundraiser }) {
    
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
            {fundraiser.closed != false &&
                <TableRow>
                    <TableCell>{fundraiser.title}</TableCell>
                    <TableCell>{fundraiser.description}</TableCell>
                    <TableCell>{fundraiser.books_sold}</TableCell>
                    <TableCell>{fundraiser.money_received}</TableCell>
                    <TableCell>{formatDate(fundraiser.start_date)}</TableCell>
                    <TableCell>{formatDate(fundraiser.end_date)}</TableCell>
                    <TableCell>{fundraiser.year}</TableCell>
                    <TableCell>{fundraiser.outstanding_balance}</TableCell>

                </TableRow>
            }
        </>

    )
}