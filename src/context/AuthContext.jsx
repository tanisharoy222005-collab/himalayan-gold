import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (email, password) => {
    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      localStorage.setItem(
        "user",
        JSON.stringify(storedUser)
      );
      return true;
    }

    return false;
  };

  const register = (name, email, password) => {
    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);