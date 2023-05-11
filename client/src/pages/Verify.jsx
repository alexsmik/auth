import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isLoading } = useGlobalContext();
    const query = useQuery();
    console.log('Location -> token ---> ', query);

    const verifyToken = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                '/api/auth/verify-email',
                {
                verificationToken: query.get('token'),
                email: query.get('email'),
                });
        } catch (error) {
            console.log('verify response error ---> ', error.response);
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isLoading) {
            verifyToken();
        }
    }, []);

    if (loading) {
        return (
            <>
                <h2>Loading...</h2>
            </>
        );
    }

    if (error) {
        return (
            <>
                <h4>There was an error, please double check your verification link </h4>
            </>
        );
    }

    return (
        <>
            <h2>Account Confirmed</h2>
            <Link to='/login' className='btn'>
                Please login
            </Link>
        </>
    );
};

export default VerifyPage;