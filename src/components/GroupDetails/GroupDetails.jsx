import React, {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Typography, Container, CardContent  } from "@mui/material";
import GroupDetailsCard from "../GroupDetailsCard/GroupDetailsCard";




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
        <Container>
            {groupDetails.map(group => {
                return(
                    <GroupDetailsCard key={id} group={group} />
                )
            })}
            <br />
            <br />
             <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            
                            <TableCell>Books Requested</TableCell>
                            <TableCell>Books Checked Out</TableCell>
                            <TableCell>Books Out Value</TableCell>
                            <TableCell>Books Checked In</TableCell>
                            <TableCell>Books Sold</TableCell>
                            <TableCell>Money Received</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Outstanding Balance</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <br />
            <br />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Books Sold</TableCell>
                            <TableCell>Money Received</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Outstanding Balance</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Container>
       
    )
        
    
}
