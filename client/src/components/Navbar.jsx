import React, { } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useGlobalContext} from "../context";

const Navbar = () => {
    const {user, logoutUser} = useGlobalContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

    return (
        <div className='nav'>
            <div className='nav-center'>
                <Link to='/' className='home-link'>
                    Home
                </Link>
                {user && (
                     <div className='nav-links'>
                         <p>User Name: {user.name}</p>
                         <button
                             className='btn btn-small'
                             onClick={() => handleLogout()}
                             >Logout</button>
                     </div>
                 )}
            </div>
        </div>
    )
}

export default Navbar;