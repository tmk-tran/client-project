import { Typography } from "@mui/material";
import { border } from "../Utils/colors";

export default function RefIdDisplay({ seller }) {
    console.log(seller);
    return (
        <Typography variant="h6">Referral ID: {seller.refId}</Typography>
    );
}