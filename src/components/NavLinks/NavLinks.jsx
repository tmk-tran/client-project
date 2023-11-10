import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

export default function NavLinks() {
    // const user = useSelector((store) => store.user);

    return (
        <div>
            <Link to="/home">Home</Link>
        </div>
    );
}