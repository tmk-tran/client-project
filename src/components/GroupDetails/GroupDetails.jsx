import React, {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Typography, Container, CardContent, Paper  } from "@mui/material";
import GroupDetailsCard from "../GroupDetailsCard/GroupDetailsCard";
import ActiveFundraiserItem from "../ActiveFundraiserItem/ActiveFundraiserItem";
import ClosedFundraiserItem from "../ClosedFundraiserItem/ClosedFundraiserItem";




export default function GroupDetails () {
    const id = Number(useParams().id);
    const dispatch = useDispatch();
    const groupDetails = useSelector((store) => store.group)
    const fundraisers = useSelector((store) => store.fundraisers)
  

    useEffect(() => {
        dispatch({ type: "FETCH_GROUP_DETAILS", payload: id})
    }, [])
   
    useEffect(() => {
        dispatch({ type: "FETCH_FUNDRAISERS", payload: id})
    }, [groupDetails])

    console.log(groupDetails)
    console.log(fundraisers)

    return(
        <>
        <Container>
            <br />
            {groupDetails.map(group => {
                return(
                    <GroupDetailsCard key={id} group={group} />
                )
            })}
            </Container>
            <br />
            <br />
            <Paper>
             <TableContainer  style={{width: "95%", margin: "auto"}} >
                <Typography>Active Campaigns</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow style={{border: "2px solid black"}}>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Title</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Description</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}}>Photo</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Books Requested</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px" }} variant="body2">Books Checked Out</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Books Out Value</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Books Checked In</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Books Sold</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Money Received</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Start Date</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">End Date</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Year</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Outstanding Balance</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px", width: "100px"}}><Typography style={{fontSize: "15px", width: "100px"}}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {fundraisers.map(fundraiser => {
                        return(
                            <ActiveFundraiserItem key={fundraiser.id} fundraiser={fundraiser}/>
                         )
                        })}
                        </TableBody> 
                </Table>
            </TableContainer>
            <br />
            <br />
            <TableContainer style={{width: "95%", margin: "auto"}}>
                <Typography>Closed Campaigns</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow style={{border: "2px solid black"}}>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Title</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Description</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Photo</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Books Sold</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Money Received</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Start Date</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">End Date</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Year</Typography></TableCell>
                            <TableCell style={{border: "2px solid black", height: "100px", width: "100px", padding: "10px"}}><Typography style={{fontSize: "15px", width: "100px"}} variant="body2">Outstanding Balance</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {fundraisers.map(fundraiser => {
                        return(
                            <ClosedFundraiserItem key={fundraiser.id} fundraiser={fundraiser}/>
                         )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </>
    )
        
    
}
