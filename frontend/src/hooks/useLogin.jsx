import { useState } from "react";

const useLogin = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return false;
      }
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      return true;
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  };

  return { login, error, isLoading };
};

export default useLogin;