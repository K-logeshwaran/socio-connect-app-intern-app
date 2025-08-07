import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';


const CheckLoggedin = ({ children }) => {
    const { user } = useAuth(); // assuming user is null when not logged in

    if (!user) {
        return <Navigate to="/login" replace />
    } else {
        return children;
    }
}

const ReDirectHome = ({ children }) => {
    const { user } = useAuth(); // assuming user is null when not logged in

    if (user) {
        return <Navigate to="/" replace />
    } else {
        return children;
    }
}



export { CheckLoggedin, ReDirectHome };