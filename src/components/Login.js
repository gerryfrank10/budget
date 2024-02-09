import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API_HOST;

    const handleLogin = async () => {
        try{
            const response = await fetch(`${base_url}/login`, {
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text"
                                       className="form-control"
                                       id="username"
                                       placeholder="Enter username"
                                       value={username}
                                       onChange={(e)=> setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       placeholder="Enter password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block mt-4" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;