import { useState } from 'react';
import DB from '../../utils/db';
import { useToast } from '../Toast';

export default function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const showToast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const settings = await DB.get('settings');
        if (username === settings.username && password === settings.password) {
            sessionStorage.setItem('bg_admin_auth', 'true');
            onLogin();
            showToast('Welcome back!', 'success');
        } else {
            showToast('Invalid credentials!', 'error');
        }
    };

    return (
        <div className="admin-login" id="adminLogin">
            <div className="login-card glass-card">
                <div className="login-header">
                    <h2>BIKKI <span className="gradient-text">GURUNG</span></h2>
                    <p>Admin Panel</p>
                </div>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="loginUsername"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="loginPassword"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <i className="fas fa-lock"></i>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full">
                        <span>Login</span>
                        <i className="fas fa-sign-in-alt"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}
