import { Typography } from "@mui/material";

export default function RefIdDisplay({ seller }) {
    console.log(seller);
    return (
        <Typography variant="h6" sx={{ p: 2 }}>Referral ID: {seller.refId}</Typography>
    );
}