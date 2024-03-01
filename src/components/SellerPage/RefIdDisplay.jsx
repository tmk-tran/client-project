import { Typography } from "@mui/material";

export default function RefIdDisplay({ seller }) {
    console.log(seller);
    return (
        <Typography>Referral ID: {seller.refId}</Typography>
    );
}