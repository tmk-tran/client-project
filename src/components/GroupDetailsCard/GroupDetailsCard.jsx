import React from "react";
import {Card, CardMedia, Typography} from "@mui/material";


export default function GroupDetailsCard({ group }) {
return(
   <Card>
      <CardMedia style={{ objectFit: "cover" }}
            className="cardMedia"
            component="img"
            image={group.group_photo} />
      <Typography variant="h5">{group.department} {group.sub_department}</Typography>
      <Typography>{group.group_description}</Typography>
   </Card>
)
}