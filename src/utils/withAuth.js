// components/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { isAuthenticated, loading } = useAuth(); // Replace with your authentication context or logic
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                window.location.pathname = "/urbanregister"; // Redirect to login if not authenticated
            }
        }, [loading, isAuthenticated, router]);

        if (loading) {
            return <div>Loading...</div>; // Or a loader component
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
