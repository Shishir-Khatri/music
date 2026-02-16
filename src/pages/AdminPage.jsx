import { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = sessionStorage.getItem('bg_admin_auth') === 'true';
        setAuthenticated(isAuth);
    }, []);

    const handleLogin = () => setAuthenticated(true);
    const handleLogout = () => setAuthenticated(false);

    if (!authenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return <AdminDashboard onLogout={handleLogout} />;
}
