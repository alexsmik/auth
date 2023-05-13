import React, { useState } from 'react';
import useLocalState from '../utils/localState';
import axios from 'axios';
import { Form, Link, useNavigate } from 'react-router-dom';
import FormRow from '../components/FormRow';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, password } = values;
    const registerNewUser = { name, email, password };
    try {
      const { data } = await axios.post(`/api/auth/register`, registerNewUser);
      setSuccess(true);
      setValues({ name: '', email: '', password: '' });
      showAlert({ text: data.msg, type: 'success' });
      navigate('/login');
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg || 'there was an error' });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="info">
        <h2>Registration Page</h2>
      </div>
      {alert.show && (
        <>
          {' '}
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
          <div>
            <Link to="/login" className="btn">
              Please login
            </Link>
          </div>
        </>
      )}
      {!success && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={onSubmit}
        >
          <FormRow
            type="name"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
          <p>
            Have an account?
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default Register;
