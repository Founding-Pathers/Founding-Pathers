import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const namePort = process.env.REACT_APP_NAMEPORT;
const protocol = process.env.REACT_APP_PROTOCOL;

const PrivateRoute = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${protocol}://${namePort}/authenticate`, {
                    method: 'POST',
                    credentials: 'include'
                });
                const data = await response.json();
                if (!data.status) {
                    navigate("/");
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    return isLoading ? null : <Outlet />;
};

export default PrivateRoute;