import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            alert('User registered');
        } else {
            alert('Error registering user');
        }
    };


    const login = async (username, password) => {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });
        console.log(response)
        const data = await response.json();
        if (response.ok) {
            setToken(data.token);
            alert(data.message || 'Logged in!');
        } else {
            alert(data.data);
        }
    };

    const generateLink = async (username) => {
        const response = await fetch('http://localhost:8000/api/generate-link', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username}),
        });
        const data = await response.json();
        alert(data.link);
    };

    const getTime = async () => {
        const response = await fetch('http://localhost:8000/api/time', {
            method: 'GET',
            headers: {'Authorization': token},
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.time);
        } else {
            alert(data.message);
        }
    };
    const kickout = async (username) => {
        const response = await fetch('http://localhost:8000/api/kickout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username}),
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    };

    return (
        <Router>
            <div>
                <h1>User Authentication</h1>
                <div>
                    <input type="text" placeholder="Username" id="username"/>
                    <input type="password" placeholder="Password" id="password"/>
                    <button
                        onClick={() => login(document.getElementById('username').value, document.getElementById('password').value)}>Login
                    </button>
                </div>
                <div>
                    <button onClick={() => generateLink(document.getElementById('username').value)}>Generate Link
                    </button>
                </div>
                <div>
                    <button onClick={getTime}>Get Time</button>
                </div>
                <div>
                    <button onClick={() => kickout(document.getElementById('username').value)}>Kickout</button>
                </div>
                <form onSubmit={handleRegister}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </Router>
    );
}

export default App;