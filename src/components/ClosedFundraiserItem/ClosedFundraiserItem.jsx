import React from "react";
import { TableCell, TableRow } from "@mui/material";

export default function ClosedFundraiserItem({ fundraiser }) {
    return (
        <>
            {fundraiser.closed != false &&
                <TableRow>
                    <TableCell>{fundraiser.title}</TableCell>
                    <TableCell>{fundraiser.description}</TableCell>
                    <TableCell>{fundraiser.books_sold}</TableCell>
                    <TableCell>{fundraiser.money_received}</TableCell>
                    <TableCell>{fundraiser.start_date}</TableCell>
                    <TableCell>{fundraiser.end_date}</TableCell>
                    <TableCell>{fundraiser.year}</TableCell>
                    <TableCell>{fundraiser.outstanding_balance}</TableCell>

                </TableRow>
            }
        </>

    )
}