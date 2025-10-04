import { useState } from "react";

function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      const user = await response.json();

      if (!response.ok) {
        console.log(user.error);
        setError(user.error);
        setIsLoading(false);
        return false;
      }

      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  }; // Move closing brace here

  return { signup, isLoading, error };
} // Close the function here

export default useSignup;