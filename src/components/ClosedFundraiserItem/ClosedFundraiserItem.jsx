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
                <TableRow style={{border: "2px solid black"}}>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.title}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.description}</TableCell>
                    <TableCell style={{border: "2px solid black"}}><img src={fundraiser.photo}></img></TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.books_sold}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.money_received}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{formatDate(fundraiser.start_date)}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{formatDate(fundraiser.end_date)}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.year}</TableCell>
                    <TableCell style={{border: "2px solid black"}}>{fundraiser.outstanding_balance}</TableCell>
                </TableRow>
            }
        </>

    )
}