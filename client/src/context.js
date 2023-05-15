import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };
  const removeUser = () => {
    setUser(null);
  };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/showMe`);
      saveUser(data.user);
    } catch (e) {
      removeUser();
    }
    setIsLoading(false);
  };
  const logoutUser = async () => {
    try {
      await axios.delete('/api/auth/logout');
      removeUser();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
