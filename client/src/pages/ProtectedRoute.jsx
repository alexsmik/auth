import React from 'react';
import {Route, useNavigate} from 'react-router-dom';
// import { useUserContext } from '../context/user_context'
import { useGlobalContext } from '../context';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={() => {
                return user ? children : navigate('/');
            }}
        ></Route>
    );
};
export default PrivateRoute;