import {useGlobalContext} from "../context";
import React from "react";

const Dashboard = () => {
    const {user} = useGlobalContext();

    return (
        <div className='info'>
            <h2>Dashboard</h2>
            <p>Hello {user.name}</p>
        </div>
    );
};

export default Dashboard;
