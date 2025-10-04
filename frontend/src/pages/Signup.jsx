import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const bio = useField("text");
  const role = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      bio: bio.value,
      role: role.value,

    });
    if (success) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Bio:</label>
        <input {...bio} />
        <label>Role:</label>
        <input {...role} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
