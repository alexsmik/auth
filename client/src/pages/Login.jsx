import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import useLocalState from '../utils/localState';
import FormRow from '../components/FormRow';
import axios from 'axios';

const Login = () => {
  const { saveUser } = useGlobalContext();
  // const history = useHistory();
  //           function handleClick() {
  //             history.push("/home");
  //           }
  const navigate = useNavigate();
  // function handleClick() {
  //     navigate("/home");
  // }
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { email, password } = values;
    const loginUser = { email, password };
    try {
      const { data } = await axios.post(
        `/api/auth/login`,
        loginUser
      );
      setValues({ name: '', email: '', password: '' });
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: 'success',
      });
      setLoading(false);
      saveUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };
  return (
    <>
      <div className="info">
        <h3>Login Page</h3>
      </div>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      <form
        className={loading ? 'form form-loading' : 'form'}
        onSubmit={onSubmit}
      >
        {/* single form row */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* end of single form row */}
        {/* single form row */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* end of single form row */}
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p>
          Don't have an account?
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
        {/*<p>*/}
        {/*    Forgot your password?{' '}*/}
        {/*    <Link to='/forgot-password' className='reset-link'>*/}
        {/*        Reset Password*/}
        {/*    </Link>*/}
        {/*</p>*/}
      </form>
    </>
  );
};

export default Login;
