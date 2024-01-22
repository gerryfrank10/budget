import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });
            if(response.ok) {
                const data = await response.json();
                console.log('Successfully Login');
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.log("Error during login", error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
export default Login;