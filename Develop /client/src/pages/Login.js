import { useState } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { useNavigate } from 'react-router-dom'; // For redirection
const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Hook for redirection
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            Auth.login(data.token);
            navigate('/kanban-board'); // Redirect on successful login
        }
        catch (err) {
            console.error('Failed to login', err);
            setError('Login failed. Please check your username and password.');
        }
    };
    return (<div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' name='username' value={loginData.username} onChange={handleChange}/>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' name='password' value={loginData.password} onChange={handleChange}/>
        <button type='submit'>Submit</button>
        {error && <p className='error-message'>{error}</p>} {/* Display error message */}
      </form>
    </div>);
};
export default Login;
