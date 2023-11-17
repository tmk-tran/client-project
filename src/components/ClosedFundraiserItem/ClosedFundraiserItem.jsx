//Imports used for function
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
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
                <TableRow style={{ border: "2px solid black" }}>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.title}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.description}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.books_sold}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.money_received}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.start_date)}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{formatDate(fundraiser.end_date)}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.year}</Typography></TableCell>
                    <TableCell style={{ border: "2px solid black", width: "100px", height: "100px", padding: "5px" }}><Typography style={{ fontSize: "15px", width: "88px" }}>{fundraiser.outstanding_balance}</Typography></TableCell>
                </TableRow>
            }
        </>

    )
}