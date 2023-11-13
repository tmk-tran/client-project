import React, {useState} from "react";
import {Button, Card, CardMedia, Typography, FormControl, InputLabel, OutlinedInput} from "@mui/material";


export default function GroupDetailsCard({ group }) {

// let [editMode, setEditMode] = useState(false)

// const editDetails = () => {
//    console.log(group.id)
//    setEditMode(true);
//    console.log(editMode)
// }


return(
   <Card>
      <CardMedia style={{ objectFit: "cover" }}
            className="cardMedia"
            component="img"
            image={group.group_photo} />
      <Typography variant="h5">{group.department} {group.sub_department}</Typography>
      <Typography>{group.group_description}</Typography>
      {/* <Button onClick={editDetails}>Edit Details</Button>  */}
   </Card>
)
}