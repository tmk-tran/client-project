import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

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
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.title}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.description}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><img style={{height: "88px", width: "88px"}} src={fundraiser.photo}></img></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.books_sold}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.money_received}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.year}</Typography></TableCell>
                    <TableCell style={{border: "2px solid black", width: "100px", height: "100px", padding: "5px"}}><Typography style={{fontSize: "15px", width: "88px"}}>{fundraiser.outstanding_balance}</Typography></TableCell>
                </TableRow>
            }
        </>

    )
}