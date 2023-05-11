import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import FormRow from '../components/FormRow';
import useLocalState from '../utils/localState';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const {
        alert, showAlert, loading, setLoading, success, setSuccess
    } = useLocalState();

    const query = useQuery();

    const handleChange = async (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!password) {
            showAlert({ text: 'please enter password' });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post('/api/auth/reset-password', {
                password,
                token: query.get('token'),
                email: query.get('email'),
            });
            setLoading(false);
            setSuccess(true);
            showAlert({
                text: `Success, redirecting to login page shortly`,
                type: 'success',
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            showAlert({ text: error.response.data.msg });
            setLoading(false);
        }
    };
    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type}`}>{alert.text}</div>
            )}
            {!success && (
                <form
                    className={loading ? 'form form-loading' : 'form'}
                    onSubmit={handleSubmit}
                >
                    <h4>reset password</h4>
                    {/* single form row */}
                    <FormRow
                        type='password'
                        name='password'
                        value={password}
                        handleChange={handleChange}
                    />
                    {/* end of single form row */}
                    <button type='submit' className='btn btn-block' disabled={loading}>
                        {loading ? 'Please Wait...' : 'New Password'}
                    </button>
                </form>
            )}
        </>
    );
};

export default ResetPasswordForm;
