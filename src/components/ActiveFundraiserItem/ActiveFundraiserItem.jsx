import React from "react";
import { TableCell, TableRow } from "@mui/material";

export default function ActiveFundraiserItem({ fundraiser }) {
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
                    <TableCell>{fundraiser.start_date}</TableCell>
                    <TableCell>{fundraiser.end_date}</TableCell>
                    <TableCell>{fundraiser.year}</TableCell>
                    <TableCell>{fundraiser.outstanding_balance}</TableCell>
                </TableRow>
            }
        </>

    )
}