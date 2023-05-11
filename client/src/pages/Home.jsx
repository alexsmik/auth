import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useGlobalContext} from "../context";

const Home = () => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    return (
        <>
            {user && navigate('/dashboard')}

            <div className='info'>
                <h2>
                    <span>Auth</span>
                    System
                </h2>
                <p>
                    Test authentication system
                </p>


                <Link to='/login' className='btn'>
                    Login
                </Link>
                or
                <Link to='/register' className='btn'>
                    Register
                </Link>
            </div>
        </>
    )
}
export default Home;